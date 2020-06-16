<script>
	import { getContext } from 'svelte';
	import { scaleOrdinal } from 'd3-scale';

	const { data, xGet, yGet, zGet, xScale, custom } = getContext('LayerCake');

	$: columnHeight = d => {
		const yVals = $yGet(d);
		return yVals[0] - yVals[1];
	};
</script>

<g class="column-group">
	{#each $data as series, i}
		{#each series as d}
			<rect
				class='group-rect'
				data-id="{i}"
				x="{$xGet(d)}"
				y="{$yGet(d)[1]}"
				width={$xScale.bandwidth()}
				height="{columnHeight(d)}"
				fill={$zGet(series)}
			></rect>
		{/each}
	{/each}
</g>
