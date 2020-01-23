<script>
	import { area } from 'd3-shape';
	import { scaleOrdinal } from 'd3-scale';

	import { getContext } from 'svelte';

	const { data, xScale, yScale } = getContext('LayerCake');

	export let seriesColors;
	export let seriesNames;

	$: colorScale = scaleOrdinal()
		.domain(seriesNames)
		.range(seriesColors);

	$: areaGen = area()
		.x(d => $xScale(d.data.month))
		.y0(d => $yScale(d[0]))
		.y1(d => $yScale(d[1]));
</script>

<g class="area-group">
	{#each $data as d}
		<path
			class='path-area'
			d='{areaGen(d)}'
			fill="{colorScale(d.key)}"
		></path>
	{/each}
</g>
