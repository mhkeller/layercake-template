<script>
	import { getContext } from 'svelte';
	import { scaleOrdinal } from 'd3-scale';

	const { data, xGet, yGet, zGet, yScale, custom } = getContext('LayerCake');

	$: columnWidth = d => {
		const xVals = $xGet(d);
		return xVals[1] - xVals[0];
	};
</script>

<g class="bar-group">
	{#each $data as series}
		{#each series as d, i}
			<rect
				class='group-rect'
				data-id="{i}"
				x="{$xGet(d)[0]}"
				y="{$yGet(d)}"
				height={$yScale.bandwidth()}
				width="{columnWidth(d)}"
				fill={$zGet(series)}
			></rect>
		{/each}
	{/each}
</g>
