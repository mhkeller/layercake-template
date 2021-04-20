<script>
	import { getContext } from 'svelte';
	import * as geo from 'd3-geo';

	const { data, width, height } = getContext('LayerCake');

	export let projectionName = 'geoAlbersUsa';
	export let pointsData = [];
	export let r = 5;

	$: projection = geo[projectionName]()
		.fitSize([$width, $height], $data);
</script>

<g class="points">
{#each pointsData as d}
	<circle
		cx={projection(d)[0]}
		cy={projection(d)[1]}
		r="{r}"
	>
	</circle>
{/each}
</g>

<style>
	circle {
		fill: #000;
		stroke: #fff;
		stroke-width: 1;
	}
</style>
