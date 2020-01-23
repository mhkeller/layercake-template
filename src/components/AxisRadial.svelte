<script>
	import { getContext } from 'svelte';

	const { width, height, rScale, extents, originalSettings } = getContext('LayerCake');

	export let linePaddingFactor = 1.1;
	export let labelPaddingFactor = 1.25;

	$: max = $rScale(Math.max(...$extents.r));

	$: angleSlice = (Math.PI * 2) / $originalSettings.r.length;

	function anchor (total, i) {
		if (i === 0 || i === total / 2) {
			return 'middle';
		} else if (i < total / 2) {
			return 'start';
		}
		return 'end';
	}
</script>

<g
	transform="translate({ $width / 2 }, { $height / 2 })"
>
	<circle
		cx="0"
		cy="0"
		r="{max}"
		stroke="#ccc"
		stroke-width="1"
		fill="#CDCDCD"
		fill-opacity="0.1"
	></circle>
	<circle
		cx="0"
		cy="0"
		r="{max / 2}"
		stroke="#ccc"
		stroke-width="1"
		fill="none"
	></circle>

	{#each $originalSettings.r as label, i}
		<line
			x1="0"
			y1="0"
			x2="{(max * linePaddingFactor) * Math.cos(angleSlice * i - Math.PI / 2)}"
			y2="{(max * linePaddingFactor) * Math.sin(angleSlice * i - Math.PI / 2)}"
			stroke="#ccc"
			stroke-width="1"
			fill="none"
		>
		</line>
		<text
			text-anchor="{anchor($originalSettings.r.length, i)}"
			dy="0.35em"
			font-size="12px"
			text-outline="#fff"
			transform="translate({(max * labelPaddingFactor) * Math.cos(angleSlice * i - Math.PI / 2)}, {(max * labelPaddingFactor) * Math.sin(angleSlice * i - Math.PI / 2)})">{label}</text>
	{/each}
</g>
