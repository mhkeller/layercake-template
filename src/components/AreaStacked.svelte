<script>
	import { area } from 'd3-shape';
	import { scaleOrdinal } from 'd3-scale';

	import { getContext } from 'svelte';

	const { data, xGet, yScale, zGet } = getContext('LayerCake');

	$: areaGen = area()
		.x(d => $xGet(d))
		.y0(d => $yScale(d[0]))
		.y1(d => $yScale(d[1]));
</script>

<g class="area-group">
	{#each $data as d}
		<path
			class='path-area'
			d='{areaGen(d)}'
			fill='{$zGet(d)}'
		></path>
	{/each}
</g>
