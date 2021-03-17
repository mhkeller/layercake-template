<script>
	import { getContext } from 'svelte';
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';

	const { data, xGet, height, zGet, custom } = getContext('LayerCake');

	const nodes = $data.map((d) => ({ ...d }));

	export let r = 4;
	export let xStrength = 0.95;
	export let yStrength = 0.075;
	export let strokeWidth = 1;
	export let strokeColor = '#fff';

	$: simulation = forceSimulation(nodes)
		.force('x', forceX().x(d => $xGet(d)).strength(xStrength))
		.force('y', forceY().y($height / 2).strength(yStrength))
		.force('collide', forceCollide(r))
		.stop();

	$: {
		for ( var i = 0,
			n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
			i < n;
			++i ) {
			simulation.tick();
		}
	}
</script>

<g class='bee-group'>
	{#each simulation.nodes() as node}
		<circle
			fill='{$zGet(node)}'
			stroke='{strokeColor}'
			stroke-width='{strokeWidth}'
			cx='{node.x}'
			cy='{node.y}'
			r='{r}'
		>
			<title>{$custom.getTitle(node)}</title>
		</circle>
	{/each}
</g>
