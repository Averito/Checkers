import { Checker } from './Checker'
import { CellModel } from '@models/Cell'

export interface Cell {
	readonly id: number
	readonly x: number
	readonly y: number
	checker?: Checker

	findPlaces(): Cell[]
	moveTo(
		allowedCells: Cell[],
		targetAllowedCell: Cell
	): { newAllowedCells: Cell[]; selectedCell: Cell } | undefined
	select(): Cell | undefined
}

export type CellMoveToReturn =
	| { newAllowedCells: CellModel[]; selectedCell: CellModel }
	| undefined
