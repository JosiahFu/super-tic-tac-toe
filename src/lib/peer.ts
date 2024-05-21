import Peer, { type DataConnection } from 'peerjs'
import { onDestroy } from 'svelte'
import { writable, type Writable } from 'svelte/store'

function prefixId(baseId: string) {
    return `super-ttt-${baseId}`
}

function peerHost<T>(initialState: T, identifier: string): Writable<T> & {id: string} {
    const host = new Peer(prefixId(identifier))
    console.log(host);
    const store = writable(initialState)
    
    let lastSource: DataConnection | undefined = undefined
    
    host.on('connection', connection => {
        console.log('New connection')
        connection.on('open', () => {
            const unsubscribe = store.subscribe(state => {
                if (lastSource === connection) return
                // else
                connection.send(state)
            })
            
            connection.on('close', unsubscribe)
            
            connection.on('data', data => {
                lastSource = connection
                store.set(data as T)
            })
        })
    })
    
    function set(state: T) {
        lastSource = undefined
        store.set(state)
    }
    
    onDestroy(() => {console.log('close'); host.destroy()})
    
    return {...store, set, id: identifier}
}

function peerClient<T>(defaultState: T, hostIdentifier: string): Writable<T> & {id: string} {
    const store = writable(defaultState)
    const client = new Peer()
    const connection = client.connect(prefixId(hostIdentifier))
    console.log(connection);
    
    connection.on('open', () => {
        const unsubscribe = store.subscribe(state => {
            connection.send(state)
        })
        
        connection.on('close', unsubscribe)
    })
    
    connection.on('data', data => {
        console.log(data);
        store.set(data as T)
    });
    
    onDestroy(() => {console.log('close'); client.destroy()})

    return {...store, id: hostIdentifier};

}

export { peerHost, peerClient }
