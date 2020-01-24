<script>
	import { getContext } from 'svelte';

	const { width, height, xScale, yScale } = getContext('LayerCake');

	export let gridlines = true;
	export let formatTick = d => d;
	export let baseline = false;
	export let snapTicks = false;
	export let ticks = undefined;
	export let tickNumber = undefined;

	$: tickVals = ticks || $xScale.ticks(tickNumber);

	function textAnchor(i) {
		if (snapTicks === true) {
			if (i === 0) {
				return 'end';
			}
			if (i === tickVals.length - 1) {
				return 'start';
			}
		}
		return 'middle';
	}
</script>

<g class='axis x-axis'>
	{#each tickVals as tick, i}
		<g class='tick tick-{ tick }' transform='translate({$xScale(tick)},{$yScale.range()[0]})'>
			{#if gridlines !== false}
				<line y1='{$height * -1}' y2='0' x1='0' x2='0'></line>
			{/if}
			<text y='16' text-anchor='{textAnchor(i)}'>{formatTick(tick)}</text>
		</g>
	{/each}
	{#if baseline === true}
		<line class="baseline" y1='{$height + 0.5}' y2='{$height + 0.5}' x1='0' x2='{$width}'></line>
	{/if}
</g>

<style>
	.tick {
		font-size: .725em;
		font-weight: 200;
	}

	line,
	.tick line {
		stroke: #aaa;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #666;
	}

	.baseline {
		stroke-dasharray: 0;
	}
</style>
