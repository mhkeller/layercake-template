<script>
	import { getContext } from 'svelte';

	const { padding, xRange, xScale, yScale } = getContext('LayerCake');

	export let ticks = 4;
	export let gridlines = true;
	export let baseline = false;
	export let formatTick = d => d;
	export let xTick = -4;
	export let yTick = 2;
	// export let dxTick = 0;
	// export let dyTick = -4;
	// export let textAnchor = 'start';

	$: isBandwidth = typeof $yScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks) ? ticks :
		isBandwidth ?
			$yScale.domain() :
			$yScale.ticks(ticks);
</script>

<div class='axis y-axis' style='transform:translate(-{$padding.left}px, 0)'>
	{#each tickVals as tick, i}
		<div class='tick tick-{i}' style='top:{$yScale(tick) + (isBandwidth ? $yScale.bandwidth () / 2 : 0)}%;left:{$xRange[0]}%;'>
			{#if gridlines !== false}
				<div class="gridline" style='top:0;left:{isBandwidth ? $padding.left : 0}px;right:-{$padding.left + $padding.right}px;'></div>
			{/if}
			{#if baseline !== false && i === 0}
				<div class="gridline baseline" style='top:0;left:{isBandwidth ? $padding.left : 0};right:-{$padding.left + $padding.right}px;'></div>
			{/if}
			<div
				class="text"
				style='
					top:{yTick - 3}px;
					left:{isBandwidth ? ($padding.left + xTick) : 0}px;
					transform: translate({isBandwidth ? '-100%' : 0}, {isBandwidth ? -50 - Math.floor($yScale.bandwidth() / -2) : '-100'}%);
				'
			>{formatTick(tick)}</div>
		</div>
	{/each}
</div>

<style>
	.axis,
	.tick,
	.gridline,
	.baseline,
	.text {
		position: absolute;
	}
	.axis {
		width: 100%;
		height: 100%;
	}
	.tick {
		font-size: 12px;
		width: 100%;
		font-weight: 100;
	}

	.gridline {
		border-top: 1px dashed #aaa;
	}

	.baseline.gridline {
		border-top-style: solid;
	}

	.tick .text {
		color: #666;
	}
</style>
