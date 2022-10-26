import { Board } from '@interfaces/Board'
import { Team } from '@interfaces/Checker'
import { CheckerModel, CheckerOptions } from './Checker'
import { CellModel } from './Cell'

export interface GenReturn {
	cells: CellModel[]
	whiteCount: number
	blackCount: number
}

export class BoardModel implements Board {
	public readonly cells: CellModel[]
	public readonly boardSquare = 64
	public readonly boardLength = 8
	public whiteCount: number
	public blackCount: number
	public queue: Team = 'white'
	public rageMode = false

	constructor() {
		const { cells, whiteCount, blackCount } = this.gen()
		this.cells = cells
		this.whiteCount = whiteCount
		this.blackCount = blackCount
	}

	private gen(): GenReturn {
		const cells: CellModel[] = []
		let whiteCount = 0
		let blackCount = 0

		for (let x = 0; x < this.boardSquare; x++) {
			const xCord = x % this.boardLength
			const yCord = Math.floor(x / this.boardLength)
			let checker: CheckerModel | undefined

			const whiteTeam = yCord >= 0 && yCord <= 2
			const blackTeam = yCord >= 5 && yCord <= 7
			const checkerSpawn = whiteTeam || blackTeam

			if (checkerSpawn) {
				const checkerOptions: CheckerOptions = {
					id: x,
					x: xCord,
					y: yCord,
					team: whiteTeam ? 'white' : 'black',
					rank: 'soldier'
				}

				if (yCord % 2 === 0) {
					if (xCord % 2 !== 0) {
						checker = new CheckerModel(checkerOptions)
						whiteCount++
					}
				} else {
					if (xCord % 2 === 0) {
						checker = new CheckerModel(checkerOptions)
						blackCount++
					}
				}
			}

			cells.push(new CellModel(x, xCord, yCord, this, checker))
		}

		return { cells, whiteCount, blackCount }
	}

	public whiteDecrement() {
		this.whiteCount--
	}

	public blackDecrement() {
		this.blackCount--
	}

	public switchQueue() {
		if (this.rageMode) return

		if (this.queue === 'white') {
			this.queue = 'black'
		} else {
			this.queue = 'white'
		}
	}
}
