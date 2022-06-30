import { Cell } from '@/types/Cell'
import { CheckerModel } from '@/models/Checker'
import { BoardModel } from '@/models/Board'

export class CellModel implements Cell {
	public readonly id: number
	public readonly x: number
	public readonly y: number
	public checker?: CheckerModel
	private board: BoardModel

	constructor(
		id: number,
		x: number,
		y: number,
		board: BoardModel,
		checker?: CheckerModel
	) {
		this.id = id
		this.x = x
		this.y = y
		this.checker = checker
		this.board = board
	}

	public findPlaces(): CellModel[] {
		if (this.checker?.team !== this.board.queue) return []

		let cells: CellModel[] = []

		for (const idx in this.board.cells) {
			const target = this.board.cells[idx]

			if (this.checker?.canMove(target)) {
				cells = [...cells, target]
			}
		}

		return cells
	}

	public moveTo(allowedCell: CellModel): void {
		if (this.checker?.team !== this.board.queue) return
		if (!this.checker?.canMove(allowedCell)) return

		// todo: Проверка на убийство
		this.board.switchQueue()

		this.checker.x = allowedCell.x
		this.checker.y = allowedCell.y
		allowedCell.checker = this.checker

		this.checker = undefined
	}

	public select(): CellModel | undefined {
		if (!this.checker) return
		if (this.checker.team !== this.board.queue) return

		this.board.cells.forEach(cell => {
			if (cell.checker) cell.checker.selected = false
		})
		this.checker.selected = true

		return this
	}
}
