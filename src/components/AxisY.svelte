<script>
	import { getContext } from 'svelte';

	const { padding, yScale } = getContext('LayerCake');

	export let ticks = undefined;
	export let tickNumber = undefined;
	export let gridlines = true;
	export let formatTick = d => d;

	$: tickVals = ticks || $yScale.ticks(tickNumber);
</script>

<g class='axis y-axis' transform='translate(-{$padding.left}, 0)'>
	{#each $tickVals as tick, i}
		<g class='tick tick-{tick}' transform='translate(0, {$yScale(tick)})'>
			{#if gridlines !== false}
				<line x2='100%'></line>
			{/if}
			<text y='-4'>{formatTick(tick)}</text>
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
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}
</style>
