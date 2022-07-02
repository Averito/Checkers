import { Cell, CellMoveToReturn } from '@/types/Cell'
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

			if (this.checker?.can(target, 'move')) {
				cells = [...cells, target]
			} else if (this.checker?.can(target, 'kill')) {
				console.log('target', target)
				const nextCell = this.board.cells.find(cell =>
					this.findCellAfterKill(cell, target)
				)
				if (nextCell) cells = [...cells, target, nextCell]
			}
		}

		return cells
	}

	public moveTo(
		allowedCells: CellModel[],
		targetAllowedCell: CellModel
	): CellMoveToReturn {
		if (this.checker?.team !== this.board.queue) return
		if (!this.isHorizontal(targetAllowedCell)) return

		let newAllowedCells: CellModel[] = []
		const killedChecker = this.killed(allowedCells, targetAllowedCell)

		this.checker.x = targetAllowedCell.x
		this.checker.y = targetAllowedCell.y

		if (killedChecker) {
			if (killedChecker.checker?.team === 'white') {
				this.board.whiteDecrement()
			} else {
				this.board.blackDecrement()
			}
			killedChecker.checker = undefined

			for (const currentIdx in this.board.cells) {
				const currentCell = this.board.cells[currentIdx]

				if (this.checker.can(currentCell, 'kill')) {
					const nextCell = this.board.cells.find(cell =>
						this.findCellAfterKill(cell, currentCell)
					)

					if (nextCell && currentCell.isHorizontal(nextCell)) {
						newAllowedCells = [...newAllowedCells, currentCell, nextCell]
						this.board.rageMode = true
					}
				}
			}
		}
		const newAllowedCellsMapped = newAllowedCells.map(
			newAllowCell => newAllowCell.checker
		)
		if (newAllowedCellsMapped.length <= 0) this.board.rageMode = false

		this.board.switchQueue()
		targetAllowedCell.checker = this.checker
		this.checker = undefined

		return {
			newAllowedCells,
			selectedCell: targetAllowedCell
		}
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

	private findCellAfterKill(nestedNextCell: CellModel, currentCell: CellModel) {
		if (!this.checker) return

		const xAbs = Math.abs(nestedNextCell.x - this.checker.x)
		const y = nestedNextCell.y - this.checker.y

		if (this.checker?.team === 'white') {
			if (y < 0) return false
		} else {
			if (y > 0) return false
		}

		const yAbs = Math.abs(y)

		const nestedNextCellHorizontal = currentCell.isHorizontal(nestedNextCell)
		if (
			yAbs === 2 &&
			xAbs === 2 &&
			!nestedNextCell.checker &&
			nestedNextCellHorizontal
		)
			return true

		return false
	}

	private isHorizontal(target: CellModel) {
		if (!this.checker) return

		const xAbs = Math.abs(target.x - this.checker.x)
		const y = target.y - this.checker.y

		const yAbs = Math.abs(y)

		if (yAbs > 2 || xAbs > 2) return false
		if (yAbs === xAbs) return true

		return false
	}

	private killed(
		allowedCells: CellModel[],
		targetAllowedCell: CellModel
	): CellModel | undefined {
		let killedChecker: CellModel | undefined

		allowedCells.forEach(allowedCell => {
			if (allowedCell.checker && allowedCell.isHorizontal(targetAllowedCell)) {
				killedChecker = allowedCell
			}
		})

		return killedChecker
	}
}
