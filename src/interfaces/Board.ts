import {Cell} from './Cell'
import {Team} from './Checker'

export interface Board {
    readonly cells: Cell[]
    readonly boardSquare: number
    readonly boardLength: number
    whiteCount: number
    blackCount: number
    queue: Team
    rageMode: boolean

    whiteDecrement(): void

    blackDecrement(): void

    switchQueue(): void
}
