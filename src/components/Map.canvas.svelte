<script>
	import { getContext } from 'svelte';
	import { scaleCanvas } from 'layercake';
	import { geoPath } from 'd3-geo';

	const { data, width, height, zGet } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	/* --------------------------------------------
	 * Require a D3 projection function
	 */
	export let projection;

	/* --------------------------------------------
	 * Allow for custom styling
	 */
	export let fill = '#fff';
	export let stroke = '#ccc';
	export let strokeWidth = 1;

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

			features.features.forEach(feature => {
				$ctx.beginPath();
				// Set the context here since setting it in `$: geoPath` is a circular reference
				geoPathFn.context($ctx);
				geoPathFn(feature);

				$ctx.fillStyle = fill;
				// $ctx.fillStyle = $zGet(feature.properties); // Use this if making a choropleth
				$ctx.fill();

				$ctx.lineWidth = strokeWidth;
				$ctx.strokeStyle = stroke;
				$ctx.stroke();
			});
		}
	}
</script>
