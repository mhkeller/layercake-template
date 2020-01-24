<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, yScale } = getContext('LayerCake');

	export let r = 5;
	export let fill = '#000';

</script>

<g class="scatter-group">
	{#each $data as d}
		<circle
			cx={$xGet(d)}
			cy={$yGet(d) + ($yScale.bandwidth() / 2)}
			{r}
			{fill}
		/>
	{/each}
</g>
