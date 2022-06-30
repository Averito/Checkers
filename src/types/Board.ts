import { Cell } from '@/types/Cell'
import { Team } from '@/types/Checker'

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
