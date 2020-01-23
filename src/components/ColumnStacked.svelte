<script>
	import { getContext } from 'svelte';
	import { scaleOrdinal } from 'd3-scale';

	export let seriesColors;

	const { data, xGet, yGet, xScale, custom } = getContext('LayerCake');

	$: columnHeight = d => {
		const yVals = $yGet(d);
		return yVals[0] - yVals[1];
	};

	const colorScale = scaleOrdinal()
		.domain($custom.seriesNames)
		.range(seriesColors);
</script>

<g class="column-group">
	{#each $data as series, i}
		{#each series as d}
			<rect
				class='group-rect'
				data-id="{i}"
				x="{$xGet(d)}"
				y="{$yGet(d)[1]}"
				width={$xScale.bandwidth()}
				height="{columnHeight(d)}"
				fill={colorScale(series.key)}
			></rect>
		{/each}
	{/each}
</g>
