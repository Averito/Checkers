import { CellModel } from '@/models/Cell'
import { Board } from '@/types/Board'
import { CheckerModel, CheckerOptions } from '@/models/Checker'
import { Team } from '@/types/Checker'

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
			const xCoord = x % this.boardLength
			const yCoord = Math.floor(x / this.boardLength)
			let checker: CheckerModel | undefined

			const whiteTeam = yCoord >= 0 && yCoord <= 2
			const blackTeam = yCoord >= 5 && yCoord <= 7
			const checkerSpawn = whiteTeam || blackTeam

			if (checkerSpawn) {
				const checkerOptions: CheckerOptions = {
					id: x,
					x: xCoord,
					y: yCoord,
					team: whiteTeam ? 'white' : 'black',
					rank: 'soldier'
				}

				if (yCoord % 2 === 0) {
					if (xCoord % 2 !== 0) {
						checker = new CheckerModel(checkerOptions)
						whiteCount++
					}
				} else {
					if (xCoord % 2 === 0) {
						checker = new CheckerModel(checkerOptions)
						blackCount++
					}
				}
			}

			cells.push(new CellModel(x, xCoord, yCoord, this, checker))
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
