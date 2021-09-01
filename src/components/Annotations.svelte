<script>
	const vals = ['top', 'right', 'bottom', 'left'];

	export let annotations = [];

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

<div class="layercake-annotations">
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
