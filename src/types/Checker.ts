import { Cell } from '@/types/Cell'

export type Team = 'black' | 'white'
export type Hierarchy = 'queen' | 'soldier'

export interface Checker {
	readonly id: number
	readonly team: Team
	x: number
	y: number
	rank: Hierarchy
	selected: boolean

	canMove(target: Cell): boolean
}
