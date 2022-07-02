<template>
	<div class="cell" @click="onSelectCell">
		<span class="allowed" v-show="allowedCell"></span>
		<VCheckersChecker
			v-show="checkerContains"
			:cell="cell"
			@click="onSelectChecker"
		/>
	</div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, PropType } from 'vue'
import VCheckersChecker from './VCheckersChecker.vue'
import { CellModel } from '@/models/Cell'
import { Team } from '@/types/Checker'

const props = defineProps({
	cell: {
		required: true,
		type: Object as PropType<CellModel>
	},
	cellReverse: {
		required: true,
		type: Boolean as PropType<boolean>
	},
	queue: {
		required: true,
		type: String as PropType<Team>
	},
	allowedCells: {
		required: true,
		type: Array as PropType<CellModel[]>
	},
	selectedCell: {
		required: true,
		type: Object as PropType<CellModel>
	}
})

const emit = defineEmits<{
	(emitType: 'select', newAllowedCells: CellModel[]): void
	(emitType: 'select-checker', newSelectedCell: CellModel): void
}>()

const onSelectChecker = (cell: CellModel) => {
	const allowedCells = cell.findPlaces()
	const newSelectedCell = cell.select()
	console.log('allowedCells', allowedCells)

	emit('select-checker', newSelectedCell ?? ({} as CellModel))
	emit('select', allowedCells)
}

const onSelectCell = () => {
	if (!allowedCell.value) return

	const newAllowedCellsAndSelectedCell = props.selectedCell?.moveTo(
		props.allowedCells,
		props.cell
	)
	const newAllowedCells = newAllowedCellsAndSelectedCell?.newAllowedCells
	const selectedCell = newAllowedCellsAndSelectedCell?.selectedCell

	emit('select', newAllowedCells ?? [])
	emit('select-checker', selectedCell ?? ({} as CellModel))
}

const allowedCell = computed<boolean>(
	() =>
		props.allowedCells.some(cell => cell.id === props.cell.id) &&
		!props.cell.checker
)
const cursorPointer = computed<string>(() =>
	props.selectedCell?.id && props.cell?.checker?.id === undefined
		? 'pointer'
		: 'unset'
)
const checkerContains = computed<boolean>(
	() => props.cell?.checker !== undefined
)
const evenCellReverse = computed<string>(() =>
	props.cellReverse ? 'white' : 'black'
)
const oddCellReverse = computed<string>(() =>
	props.cellReverse ? 'black' : 'white'
)
</script>

<style lang="scss" scoped>
.cell {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	cursor: v-bind(cursorPointer);

	&:nth-of-type(even) {
		background-color: v-bind(evenCellReverse);
	}

	&:nth-of-type(odd) {
		background-color: v-bind(oddCellReverse);
	}
}

.allowed {
	width: 20px;
	height: 20px;
	background-color: #00c80080;
	border-radius: 50%;

	@media all and (max-width: 768px) {
		width: 10px;
		height: 10px;
	}
}
</style>
