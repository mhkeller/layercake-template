<script>
	import { getContext } from 'svelte';
	import { scaleCanvas } from 'layercake';
	import { geoPath } from 'd3-geo';

	const { data, width, height, percentRange } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	export let projection;

	/* --------------------------------------------
	 * Add this optional export in case you want to plot only a subset of the features
	 * while keeping the zoom on the whole geojson feature set
	 */
	export let features = $data;

	$: projectionFn = projection()
		.fitSize([$width, $height], $data);

	$: geoPathFn = geoPath(projectionFn);

	$: {
		if ($ctx && geoPath) {
			scaleCanvas($ctx, $width, $height);
			$ctx.clearRect(0, 0, $width, $height);

			$ctx.beginPath();
			// Set the context here since setting it in `$: geoPath` is a circular reference
			geoPathFn.context($ctx);
			geoPathFn(features);
			$ctx.fillStyle = '#fff';
			$ctx.fill();
			$ctx.lineWidth = 1;
			$ctx.strokeStyle = '#ccc';
			$ctx.stroke();
		}
	}
</script>
