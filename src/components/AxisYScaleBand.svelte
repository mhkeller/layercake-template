<script>
	import { getContext } from 'svelte';

	const { xScale, yScale } = getContext('LayerCake');

	export let gridlines = true;
	export let formatTick = d => d;

	$: halfBandwidth = $yScale.bandwidth() / 2;
</script>

<g class='axis y-axis'>
	{#each $yScale.domain() as tick}
		<g class='tick tick-{tick}' transform='translate({$xScale.range()[0]}, {$yScale(tick)})'>
			{#if gridlines !== false}
				<line x2='100%' y1={halfBandwidth} y2={halfBandwidth}></line>
			{/if}
			<text y='{4 + halfBandwidth}' x="-5">{formatTick(tick)}</text>
		</g>
	{/each}
</g>

<style>
	.tick {
		font-size: .725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #aaa;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #666;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.y-axis .tick text {
		text-anchor: end;
	}
</style>
