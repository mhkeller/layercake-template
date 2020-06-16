<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale } = getContext('LayerCake');

	export let r = 5;
	export let fill = '#000';
	export let stroke = '#0cf';
	export let strokeWidth = 0;
	// export let dx = 0;
	// export let dy = 0;
</script>

<div class="scatter-group">
	{#each $data as d}
		<div
			class="circle"
			style="
				left: {$xGet(d)+ ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0)}%;
				top: {$yGet(d) + ($yScale.bandwidth ? $yScale.bandwidth() / 2 : 0)}%;
				width: {r * 2}px;
				height: {r * 2}px;
				background-color: {fill};
				border: {strokeWidth}px solid {stroke};
			"
		/>
	{/each}
</div>

<style>
	.circle {
		position: absolute;
		transform: translate(-50%, -50%);
		border-radius: 50%;
	}
</style>
