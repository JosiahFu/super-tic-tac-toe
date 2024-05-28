import Peer, { type DataConnection } from 'peerjs'
import { onDestroy } from 'svelte'
import { writable, type Writable } from 'svelte/store'

interface HostStore<T> extends Writable<T> {
    connected: Writable<number>
}

function peerHost<T>(initialState: T, identifier: string): HostStore<T> {
    const host = new Peer(identifier)
    const store = writable(initialState)
    const connected = writable(0)
    
    let lastSource: DataConnection | undefined = undefined
    
    host.on('connection', connection => {
        connection.on('open', () => {
            connected.update(a => a + 1)

            const unsubscribe = store.subscribe(state => {
                if (lastSource === connection) return
                // else
                connection.send(state)
            })
            
            connection.on('close', () => {
                connected.update(a => a - 1)
                unsubscribe()
            })
        })

        connection.on('data', data => {
            lastSource = connection
            store.set(data as T)
        })
    })
    
    const set = (state: T) => {
        lastSource = undefined
        store.set(state)
    }
    
    onDestroy(() => host.destroy())
    
    return {...store, set, connected }
}

interface ClientStore<T> extends Writable<T> {
    connected: Writable<boolean>
}

function peerClient<T>(defaultState: T, hostIdentifier: string): ClientStore<T> {
    const store = writable(defaultState)
    const client = new Peer()
    const connected = writable(false)
    
    let lastChangeRemote = true;

    client.on('open', () => {
        const connection = client.connect(hostIdentifier)
        
        connection.on('open', () => {
            connected.set(true)
            lastChangeRemote = true;

            const unsubscribe = store.subscribe(state => {
                if (lastChangeRemote) return;
                connection.send(state)
            })
            
            connection.on('close', () => {
                unsubscribe()
                connected.set(false)
            })
        })
        
        connection.on('data', data => {
            lastChangeRemote = true;
            store.set(data as T)
        })
    })
        
    const set = (state: T) => {
        lastChangeRemote = false
        store.set(state)
    }
    
    onDestroy(() => client.destroy())


    return {...store, set, connected}

}

export { peerHost, peerClient }
