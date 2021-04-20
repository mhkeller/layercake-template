<script>
	import { getContext } from 'svelte';
	import * as geo from 'd3-geo';

	const { data, width, height } = getContext('LayerCake');

	/* --------------------------------------------
	 * Require a D3 projection function
	 */
	export let projection;
	export let pointsData = [];
	export let r = 5;

	$: projectionFn = projection()
		.fitSize([$width, $height], $data);
</script>

<g class="points">
{#each pointsData as d}
	<circle
		cx={projectionFn(d)[0]}
		cy={projectionFn(d)[1]}
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
