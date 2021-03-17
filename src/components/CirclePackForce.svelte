<script>
	import { getContext } from 'svelte';
	import {
		forceSimulation,
		forceX,
		forceManyBody,
		forceCollide,
		forceCenter,
	} from 'd3-force';

	const { data, width, height, xScale, xGet, rGet, zGet } = getContext('LayerCake');

	/* --------------------------------------------
	 * Here are some values to play with, but most every force layout
	 * is going be unique and this component will need to be customized
	 * See more: https://github.com/d3/d3-force/blob/master/README.md
	 */
	export let manyBodyStrength = 5;
	export let xStrength = 0.1;
	/* --------------------------------------------
	 * Set a manual color, otherwise it will default to using the zScale
	 */
	export let nodeColor = undefined;
	export let nodeStrokeWidth = 1;
	export let nodeStrokeColor = '#fff';
	export let groupBy = true;

	/* --------------------------------------------
	 * Make a copy because the simulation will alter the objects
	 */
	const initialNodes = $data.map((d) => ({ ...d }));

	const simulation = forceSimulation(initialNodes)

	let nodes = [];

	simulation.on("tick", () => {
		nodes = simulation.nodes()
	})

	/* ----------------------------------------------
	 * When variables change, set forces and restart the simulation
	 */
	$: {
		simulation
			.force('x', forceX().x(d => {
				return groupBy === true ? $xGet(d) + $xScale.bandwidth() / 2 : $width / 2;
			}).strength(xStrength))
			.force('center', forceCenter($width / 2, $height / 2))
			.force('charge', forceManyBody().strength(manyBodyStrength))
			.force('collision', forceCollide().radius(d => {
				return $rGet(d) + nodeStrokeWidth / 2; // Divide this by two because an svg stroke is drawn halfway out
			}))
			.force('center', forceCenter($width / 2, $height / 2))
			.alpha(1)
			.restart()
	}

</script>
	{#each nodes as point}
    <circle
			class='node'
			r={$rGet(point)}
			fill={nodeColor || $zGet(point)}
			stroke-width={nodeStrokeWidth}
			stroke={nodeStrokeColor}
			cx='{point.x}'
			cy='{point.y}'
		>
    	<!-- <title>{point[$custom.title]}</title> -->
		</circle>
	{/each}
