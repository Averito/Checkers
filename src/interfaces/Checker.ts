import {Cell} from './Cell'

export type Team = 'black' | 'white'
export type Hierarchy = 'queen' | 'soldier'
export type Action = 'kill' | 'move'

export interface Checker {
    readonly id: number
    readonly team: Team
    x: number
    y: number
    rank: Hierarchy
    selected: boolean

    can(target: Cell, action: Action): boolean
}
