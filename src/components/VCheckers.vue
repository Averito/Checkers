<template>
	<div class="container">
		<VCheckersBoard />
	</div>
</template>

<script lang="ts" setup>
import VCheckersBoard from './VCheckersBoard.vue'
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
}
</style>
