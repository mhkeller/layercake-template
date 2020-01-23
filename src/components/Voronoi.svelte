<script>
	import { Delaunay } from 'd3-delaunay';
	import { getContext } from 'svelte';
	import { uniques } from 'layercake';

	const { data, xGet, yGet, width, height } = getContext('LayerCake');

	function log (point) {
		console.log(point, point.data);
	}

	$: points = $data.map(d => {
		const point = [$xGet(d), $yGet(d)];
		point.data = d;
		return point;
	});

	$: uniquePoints = uniques(points, d => d.join(), false);

	$: voronoi = Delaunay.from(points).voronoi([0, 0, $width, $height]);

</script>

<style>
	.voronoi-cell {
		fill: none;
		stroke: none;
		pointer-events: all;
	}

	.voronoi-cell:hover {
		stroke: #000;
	}
</style>

{#each uniquePoints as point, i}
	<path class="voronoi-cell" d={voronoi.renderCell(i)} on:mouseover="{log(point)}"></path>
{/each}
