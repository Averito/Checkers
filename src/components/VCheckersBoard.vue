<template>
	<div>
		<div class="counter">
			<p>Белых: {{ board.whiteCount }}</p>
			<button class="reset" @click="boardReset">Рестарт</button>
			<p>Чёрных: {{ board.blackCount }}</p>
		</div>
		<div class="board">
			<VCheckersCell
				v-for="cell in board.cells"
				:cell="cell"
				:cell-reverse="!!(cell.y % 2)"
				:queue="board.queue"
				:allowed-cells="allowedCells"
				:selected-cell="selectedCell"
				:key="cell.id"
				@select="onSelectCell"
				@select-checker="onSelectChecker"
			/>
		</div>
		<div class="queue">
			<p>Ходят: {{ queue }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import VCheckersCell from './VCheckersCell.vue'
import { BoardModel } from '@/models/Board'
import { CellModel } from '@/models/Cell'

const board = ref(new BoardModel())
const allowedCells = ref<CellModel[]>([])
const selectedCell = ref<CellModel>({} as CellModel)

const boardReset = () => {
	const newBoard = new BoardModel()
	board.value = newBoard
}

const onSelectChecker = (newSelectedCell: CellModel) => {
	selectedCell.value = newSelectedCell
}

const onSelectCell = (newAllowedCells: CellModel[]) => {
	allowedCells.value = newAllowedCells
}

const queue = computed(() =>
	board.value.queue === 'white' ? 'Белые' : 'Чёрные'
)
</script>

<style lang="scss" scoped>
.board {
	display: grid;
	grid-template-columns: repeat(8, 64px);
	grid-template-rows: repeat(8, 64px);
	border: 1px solid gray;

	@media all and (max-width: 768px) {
		grid-template-columns: repeat(8, 32px);
		grid-template-rows: repeat(8, 32px);
	}
}

.counter {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;

	> p {
		font-size: 20px;
		font-weight: 500;

		@media all and (max-width: 768px) {
			font-size: 14px;
		}
	}
}

.reset {
	cursor: pointer;
	background-color: rgb(102, 0, 255);
	font-size: 20px;
	padding: 6px 20px;
	border-radius: 10px;
	border: none;
	color: white;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: rgb(78, 7, 184);
	}

	@media all and (max-width: 768px) {
		font-size: 14px;
	}
}

.queue {
	display: flex;
	justify-content: center;

	> p {
		font-size: 20px;
		font-weight: 500;

		@media all and (max-width: 768px) {
			font-size: 14px;
		}
	}
}
</style>
