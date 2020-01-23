<script>
	import { getContext } from 'svelte';
	import { scaleQuantize } from 'd3-scale';
	import { timeFormat } from 'd3-time-format';
	import { timeDay } from 'd3-time';

	export let calcCellSize = d => d;
	export let seriesColors = ['#fff5cc', '#ffeba9', '#ffe182', '#ffd754', '#ffcc00'];

	const { width, height, data, x, r, extents } = getContext('LayerCake');

	const getDayOfWeek = timeFormat('%w');
	const getWeekOfYear = timeFormat('%U');

	$: count = date => {
		const stringDate = date.toISOString().split('T')[0];
		const days = $data.filter(d => $x(d) === stringDate)[0];
		if (days) {
			return $r(days);
		}
		return 0;
	};

	$: colorScale = scaleQuantize()
		.domain($extents.r)
		.range(seriesColors);

	$: fillColor = day => {
		const n = count(day);
		return n ? colorScale(n) : '#fff';
	};

	$: cellSize = calcCellSize($width, $height);

	let days;

	/* --------------------------------------------
	 * Calculate what month we're in and generate the full days of that month
	 */
	$: {
		const minDate = $extents.x[0];
		const parts = minDate.split('-').map(d => +d);

		days = timeDay.range(new Date(Date.UTC(parts[0], parts[1] - 1, 1)), new Date(Date.UTC(parts[0], parts[1], 1)));
	}

	$: rectX = day => getDayOfWeek(day) * cellSize;
	$: rectY = day => {
		const startWeek = getWeekOfYear(new Date(day.getUTCFullYear(), day.getUTCMonth(), 1));
		const thisWeek = getWeekOfYear(day);
		const weekDiff = thisWeek - startWeek;
		return weekDiff * cellSize;
	};

	function showCount(day) {
		console.log(day, count(day));
	}
</script>

{#each days as day}
	<rect
		class="day"
		width="{cellSize}"
		height="{cellSize}"
		x="{rectX(day)}"
		y="{rectY(day)}"
		style="fill:{fillColor(day)};"
		on:mouseenter="{showCount(day)}"
	/>
{/each}

<style>
	.day {
		stroke: #000;
		stroke-width: 1;
		fill: #fff;
	}
</style>
