<script>
	import { setContext, onMount } from 'svelte';

	const vals = ['top', 'right', 'bottom', 'left'];

	export let container = undefined;
	export let annotations = [];

	onMount(() => {
		setContext('annotation-els', Array.from(container.querySelectorAll('.layercake-annotation')));
	});

	$: fillStyle = d => {
		let style = '';
		vals.forEach(val => {
			if (d[val]) {
				style += `${val}:${d[val]};`;
			}
		});
		return style;
	};
</script>

<div class="layercake-annotations" bind:this={container}>
	{#each annotations as d, i}
		<div
			class="layercake-annotation"
			data-id="{i}"
			style="{fillStyle(d)}"
		>{d.text}</div>
	{/each}
</div>

<style>
	.layercake-annotation {
		position: absolute;
	}
</style>

