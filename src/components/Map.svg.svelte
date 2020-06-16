<script>
	import { getContext, createEventDispatcher } from 'svelte';
	import { geoPath } from 'd3-geo';
	import { raise } from 'layercake';

	const { data, width, height } = getContext('LayerCake');

	/* --------------------------------------------
	 * Require a D3 projection function
	 */
	export let projection;

	/* --------------------------------------------
	 * Optional aspect ratio
	 */
	export let fixedAspectRatio = undefined;

	/* --------------------------------------------
	 * Add this optional export in case you want to plot only a subset of the features
	 * while keeping the zoom on the whole geojson feature set
	 */
	export let features = $data.features;

	/* --------------------------------------------
	 * Here's how you would do cross-component hovers
	 */
	const dispatch = createEventDispatcher();

	$: fitSizeRange = fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [$width, $height];

	$: projectionFn = projection()
		.fitSize(fitSizeRange, $data);

	$: geoPathFn = geoPath(projectionFn);

	function fillRandom(random) {
		const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];
		const index = Math.round(random * (colors.length - 1));
		return colors[index];
	}

	function handleMousemove(feature) {
		return function handleMousemoveFn(e) {
			raise(this);
			// When the element gets raised, it flashes 0,0 for a second so skip that
			if (e.layerX !== 0 && e.layerY !== 0) {
				dispatch('mousemove', { e, props: feature.properties });
			}
		}
	}
</script>

<g
	class="map-group"
	on:mouseout={(e) => dispatch('mouseout')}
>
	{#each features as feature}
		<path
			class="feature-path"
			fill="{fillRandom(Math.random())}"
			d="{geoPathFn(feature)}"
			on:mouseover={(e) => dispatch('mousemove', { e, props: feature.properties })}
			on:mousemove={handleMousemove(feature)}
		></path>
	{/each}
</g>

<style>
	.feature-path {
		stroke: #333;
		stroke-width: 0.5px;
	}
	.feature-path:hover {
		stroke: #000;
		stroke-width: 2px;
	}
</style>
