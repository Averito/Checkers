import { Checker, Team } from '@/types/Checker'

export interface Cell {
	readonly id: number
	readonly x: number
	readonly y: number
	checker?: Checker

	findPlaces(): Cell[]
	moveTo(allowedCell: Cell): void
	select(): Cell | undefined
}
