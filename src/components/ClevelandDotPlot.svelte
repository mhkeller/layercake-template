<script>
	import { getContext } from 'svelte';
	import { scaleOrdinal } from 'd3-scale';

	const { data, xGet, yGet, yScale, originalSettings } = getContext('LayerCake');

	export let seriesColors;

	$: midHeight = $yScale.bandwidth() / 2;

	$: colorScale = scaleOrdinal()
		.domain($originalSettings.x)
		.range(seriesColors);

</script>

<g class="dot-group">
	{#each $data as row}
		<g>
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
					r="5"
					fill="{colorScale($originalSettings.x[i])}"
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
