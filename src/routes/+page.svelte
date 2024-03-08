<script>
	import { LayerCake, Svg } from 'layercake';

	import Line from './_components/Line-d3.svelte';
	import Area from './_components/Area.svelte';
	import AxisX from './_components/AxisX.svelte';
	import AxisY from './_components/AxisY.svelte';

	import points from './_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	points.forEach((/** @type {{ [columnName: string]:  number; }} */ row) => {
		row[yKey] = +row[yKey];
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ right: 10, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		yDomain={[0, null]}
		data={points}
		debug={true}
	>
		<Svg>
			<AxisX />
			<AxisY />
			<Line />
			<Area />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 80%;
		height: 80vh;
		margin: 25px auto;
	}
</style>
