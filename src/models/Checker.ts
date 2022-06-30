import { Checker, Team, Hierarchy } from '@/types/Checker'
import { CellModel } from '@/models/Cell'

export type CheckerOptions = Omit<Checker, 'canMove' | 'select' | 'selected'>

export class CheckerModel implements Checker {
	public readonly id: number
	public readonly team: Team
	public rank: Hierarchy
	public x: number
	public y: number
	public selected = false

	constructor(options: CheckerOptions) {
		const { id, team, x, y, rank } = options

		this.id = id
		this.team = team
		this.rank = rank
		this.x = x
		this.y = y
	}

	public canMove(target: CellModel): boolean {
		if (this.team === 'white') {
			const xAbs = Math.abs(target.x - this.x)
			let y = target.y - this.y

			if (y < 0) return false

			y = Math.abs(y)

			if (xAbs !== 1 || y !== 1) return false
			if (xAbs === y) return true
		} else {
			const xAbs = Math.abs(target.x - this.x)
			let y = target.y - this.y

			if (y > 0) return false

			y = Math.abs(y)

			if (xAbs !== 1 || y !== 1) return false
			if (xAbs === y) return true
		}

		return false
	}
}
