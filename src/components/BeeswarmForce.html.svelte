<script>
	import { getContext } from 'svelte';
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';

	const { data, xGet, height, zGet, custom } = getContext('LayerCake');

	const nodes = $data.map((d) => ({ ...d }));

	export let r = 4;
	export let strokeWidth = 0.5;
	export let xStrength = 0.95;
	export let yStrength = 0.075;
	export let strokeColor = '#fff';

	$: simulation = forceSimulation(nodes)
		.force('x', forceX().x(d => $xGet(d)).strength(xStrength))
		.force('y', forceY().y($height / 2).strength(yStrength))
		.force('collide', forceCollide(r + strokeWidth / 2))
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

<div class='bee-group'>
	{#each simulation.nodes() as node}
		<div
			class='bee'
			style='
				left:{node.x}px;
				top: {node.y}px;
				width: {r * 2}px;
				height: {r * 2}px;
				background: {$zGet(node)};
				border-width: {strokeWidth}px;
				border-color: {strokeColor};
				'
		>
			<title>{$custom.getTitle(node)}</title>
		</div>
	{/each}
</div>

<style>
	.bee {
		position: absolute;
		border-style: solid;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
