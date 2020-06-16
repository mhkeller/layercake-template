<script>
	import { getContext, onMount } from 'svelte';

	import { swoopyArrow, getElPosition, parseCssValue } from '../modules/arrowUtils.js';

	export let annotations = [];

	// If you're loading this component via sapper or another multi-page app
	// you will likely need to set an explicit path to the svg marker definition
	// for Safari compatibility. See https://github.com/sveltejs/svelte/issues/3450
	// Otherwise, you can remove this variable from here and from the template below
	$: basePath = typeof window !== 'undefined' ? window.location.href : '';

	const { width, height } = getContext('LayerCake');

	/* --------------------------------------------
	 * Some lookups to convert between x, y / width, height terminology
	 * and CSS names
	 */
	const lookups = [
		{ dimension: 'width', css: 'left', position: 'x' },
		{ dimension: 'height', css: 'top', position: 'y' }
	];

	let d = () => '';
	let annotationEls;

	onMount(() => {
		annotationEls = getContext('annotation-els');
	});

	function setPath (w, h) {
		return (anno, i, arrow) => {
			const el = annotationEls[i];
			/* --------------------------------------------
			 * Parse our attachment directives to know where to start the arrowhead
			 * measuring a bounding box based on our annotation el
			 */
			const arrowSource = getElPosition(el);
			const sourceCoords = arrow.source.anchor.split('-').map((q, j) => {
				const point = q === 'middle' ? arrowSource[lookups[j].css] + (arrowSource[lookups[j].dimension] / 2) : arrowSource[q];
				return point + (parseCssValue(arrow.source[`d${lookups[j].position}`], i, arrowSource.width, arrowSource.height));
			});

			/* --------------------------------------------
			 * Default to clockwise
			 */
			const clockwise = typeof arrow.clockwise === 'undefined' ? true : arrow.clockwise;

			/* --------------------------------------------
			 * Parse where we're drawing to
			 */
			const targetCoords = [arrow.target.x, arrow.target.y].map((q, j) => {
				return parseCssValue(q, j, w, h);
			});

			/* --------------------------------------------
			 * Create arrow path
			 */
			return swoopyArrow()
				.angle(Math.PI / 2)
				.clockwise(clockwise)
				.x(q => q[0])
				.y(q => q[1])([sourceCoords, targetCoords]);
		};
	}

	$: if (annotationEls) d = setPath($width, $height);
</script>


{#if annotations.length}
	<g class="swoops">
		{#each annotations as anno, i}
			{#if anno.arrows}
				{#each anno.arrows as arrow}
					<path
						marker-end='url({ basePath }#arrowhead)'
						d='{d(anno, i, arrow)}'></path>
				{/each}
			{/if}
		{/each}
	</g>
{/if}

<style>
	.swoops {
		position: absolute;
		max-width: 200px;
		line-height: 14px;
	}
	.swoops path {
		fill: none;
		stroke: #000;
		stroke-width: 1;
	}
</style>
