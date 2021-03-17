<script>
	import { getContext } from 'svelte';

	const { xScale, padding } = getContext('LayerCake');

	export let gridlines = true;
	export let tickMarks = false;
	export let formatTick = d => d;
	export let baseline = false;
	export let snapTicks = false;
	export let ticks = undefined;
	export let yTick = 7;
	export let dyTick = 0;

	$: isBandwidth = typeof $xScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks) ? ticks :
		isBandwidth ?
			$xScale.domain() :
			typeof ticks === 'function' ?
				ticks($xScale.ticks()) :
					$xScale.ticks(ticks);
</script>

<div class='axis x-axis' class:snapTicks>
	{#each tickVals as tick, i}
		{#if gridlines !== false}
			<div class="gridline" style='left:{$xScale(tick)}%;top: -{$padding.top}px;bottom: 0;'></div>
		{/if}
		{#if tickMarks === true}
			<div class="tick-mark" style='left:{$xScale(tick) + (isBandwidth ? $xScale.bandwidth() / 2 : 0)}%;height:6px;bottom: -6px;'></div>
		{/if}
		<div
			class='tick tick-{ i }'
			style='left:{$xScale(tick) + (isBandwidth ? $xScale.bandwidth() / 2 : 0)}%;top:100%;'>
			<div
				class="text"
				style='top:{(yTick + dyTick)}px;'>{formatTick(tick)}</div>
		</div>
	{/each}
	{#if baseline === true}
		<div class="baseline" style='top: 100%;width: 100%;'></div>
	{/if}
</div>

<style>
	.axis,
	.tick,
	.tick-mark,
	.gridline,
	.baseline {
		position: absolute;
	}
	.axis {
		width: 100%;
		height: 100%;
	}
	.tick {
		font-size: .725em;
		font-weight: 200;
	}

	.gridline {
		border-left: 1px dashed #aaa;
	}

	.tick-mark {
		border-left: 1px solid #aaa;
	}
	.baseline {
		border-top: 1px solid #aaa;
	}

	.tick .text {
		color: #666;
		position: relative;
		white-space: nowrap;
		transform: translateX(-50%);
	}
	/* This looks a little better at 40 percent than 50 */
	.axis.snapTicks .tick:last-child {
		transform: translateX(-40%);
	}
	.axis.snapTicks .tick.tick-0 {
		transform: translateX(40%);
	}
</style>
