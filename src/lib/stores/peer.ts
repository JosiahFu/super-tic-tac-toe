import Peer, { type DataConnection } from 'peerjs'
import { onDestroy } from 'svelte'
import { writable, type Writable } from 'svelte/store'

function peerHost<T>(initialState: T, identifier: string): Writable<T> {
    const host = new Peer(identifier)
    const store = writable(initialState)
    
    let lastSource: DataConnection | undefined = undefined
    
    host.on('connection', connection => {
        connection.on('open', () => {
            const unsubscribe = store.subscribe(state => {
                if (lastSource === connection) return
                // else
                connection.send(state)
            })
            
            connection.on('close', unsubscribe)
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
    
    return {...store, set}
}

function peerClient<T>(defaultState: T, hostIdentifier: string): Writable<T> {
    const store = writable(defaultState)
    const client = new Peer()
    
    let lastChangeRemote = true;

    client.on('open', () => {
        const connection = client.connect(hostIdentifier)
        
        connection.on('open', () => {
            lastChangeRemote = true;

            const unsubscribe = store.subscribe(state => {
                if (lastChangeRemote) return;
                connection.send(state)
            })
            
            connection.on('close', unsubscribe)
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


    return {...store, set}

}

export { peerHost, peerClient }
