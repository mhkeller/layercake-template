<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet } = getContext('LayerCake');

	export let r = 5;
	export let fill = '#000';
</script>

<g class="scatter-group">
	{#each $data as d}
		<circle
			cx={$xGet(d)}
			cy={$yGet(d)}
			{r}
			{fill}
		/>
	{/each}
</g>
