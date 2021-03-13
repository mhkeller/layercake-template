<script>
	// Based on this example https://observablehq.com/@d3/force-directed-graph
	import { onMount, getContext } from 'svelte';
	import {
		forceSimulation,
		forceLink,
		forceCollide,
		forceManyBody,
		forceCenter
	} from 'd3-force';

	const { data, width, height, zGet, x } = getContext('LayerCake');

	export let linkDistance = 30;
	export let nodeRadius = 5;
	/* --------------------------------------------
	 * Set a manual color, otherwise it will default to using the zScale
	 */
	export let nodeColor = undefined;
	export let linkColor = '#999';
	export let linkOpacity = 0.6;
	export let nodeStroke = '1';
	export let nodeStrokeColor = '#fff';
	export let showLinks = true;

	$: links = $data.links.map(d => Object.create(d));
	$: nodes = $data.nodes.map(d => Object.create(d));

	$: simulation = forceSimulation(nodes)
		.force('link', forceLink(links).id($x).distance(linkDistance))
		.force('charge', forceManyBody())
		.force('center', forceCenter($width / 2, $height / 2))
		// .force('collision', forceCollide().radius(function(d) {
		// 	return d.radius
		// }))
		.on('tick', simulationUpdate);

	// $: {
	// 	for ( var i = 0,
	// 		n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
	// 		i < n;
	// 		++i ) {
	// 		simulation.tick();
	// 	}
	// }

	function simulationUpdate () {
		simulation.tick();
		nodes = [...nodes];
		links = [...links];
	}
</script>
	{#if showLinks === true}
		{#each links as link}
			<g stroke='{linkColor}' stroke-opacity='{linkOpacity}'>
				<line
					x1='{link.source.x}'
					y1='{link.source.y}'
					x2='{link.target.x}'
					y2='{link.target.y}'
				>
					<title>{$x(link.source)}</title>
				</line>
			</g>
		{/each}
	{/if}

	{#each simulation.nodes() as point}
    <circle
			class='node'
			r={nodeRadius}
			fill={nodeColor || $zGet(point)}
			stroke={nodeStroke}
			strokeColor={nodeStrokeColor}
			cx='{point.x}'
			cy='{point.y}'
		>
    	<title>{$x(point)}</title>
		</circle>
	{/each}
