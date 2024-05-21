export type Mark = 'X' | 'O'

export type Nine<T> = [T, T, T, T, T, T, T, T, T]

export type SubGrid = Nine<Mark | undefined>

export type SuperGrid = Nine<SubGrid>

function nineOf<T>(create: () => T): Nine<T> {
    return [...new Array(9).keys()].map(create) as Nine<T>
}

export const defaultState: SuperGrid = nineOf(() => nineOf(() => undefined))
