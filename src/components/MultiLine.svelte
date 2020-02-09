<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet } = getContext('LayerCake');

	export let colorScale = d => '#000';

	$: path = values => {
		return 'M' + values
			.map(d => {
				return $xGet(d) + ',' + $yGet(d);
			})
			.join('L');
	};
</script>

<g class="line-group">
	{#each $data as group}
		<path
			class='path-line'
			d='{path(group.values)}'
			stroke="{colorScale(group.key)}"
		></path>
	{/each}
</g>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 3px;
	}
</style>
