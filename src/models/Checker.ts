import { Checker, Team, Hierarchy, Action } from '@interfaces/Checker'
import { CellModel } from './Cell'

export type CheckerOptions = Omit<Checker, 'can' | 'select' | 'selected'>

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

	public can(target: CellModel, action: Action): boolean {
		const xAbs = Math.abs(target.x - this.x)
		const y = target.y - this.y
		const yAbs = Math.abs(y)

		if (action === 'kill') {
			const differenceTeam = this.team !== target.checker?.team
			if (xAbs === 1 && yAbs === 1 && target.checker && differenceTeam)
				return true
		}

		if (this.team === 'white') {
			if (y < 0) return false
		} else {
			if (y > 0) return false
		}

		if (action === 'move') {
			if (xAbs === 1 && yAbs === 1 && !target.checker) return true
		}

		return false
	}
}
