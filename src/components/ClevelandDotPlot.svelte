<script>
	import { getContext } from 'svelte';
	import { scaleOrdinal } from 'd3-scale';

	const { data, xGet, yGet, yScale, zScale, config } = getContext('LayerCake');

	export let r = 5;

	$: midHeight = $yScale.bandwidth() / 2;
</script>

<g class="dot-plot">
	{#each $data as row}
		<g class="dot-row">
			<line
				x1="{Math.min(...$xGet(row))}"
				y1="{$yGet(row) + midHeight}"
				x2="{Math.max(...$xGet(row))}"
				y2="{$yGet(row) + midHeight}"
			></line>

			{#each $xGet(row) as circleX, i}
				<circle
					cx="{circleX}"
					cy="{$yGet(row) + midHeight}"
					r="{r}"
					fill="{$zScale($config.x[i])}"
				></circle>
			{/each}
		</g>
	{/each}
</g>

<style>
	line {
		stroke-width: 1px;
		stroke: #000;
	}
	circle {
		stroke: #000;
		stroke-width: 1px;
	}
</style>
