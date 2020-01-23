<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, height, xScale } = getContext('LayerCake');

	$: columnHeight = d => {
		return $height - $yGet(d);
	};

	/* --------------------------------------------
	 * Default styles
	 */
	export let fill = '#00e047';
	export let stroke = '';
	export let strokeWidth = 0;

</script>

<g class="column-group">
	{#each $data as d, i}
		<rect
			class='group-rect'
			data-id="{i}"
			x="{$xGet(d)}"
			y="{$yGet(d)}"
			width={$xScale.bandwidth()}
			height="{columnHeight(d)}"
			{fill}
			stroke="{stroke}"
			stroke-width="{strokeWidth}"
		></rect>
	{/each}
</g>
