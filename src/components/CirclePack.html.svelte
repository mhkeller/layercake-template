<script>
	import { stratify, pack, hierarchy } from 'd3-hierarchy'
	import { getContext } from 'svelte';
	import { format } from 'd3-format';

	const { width, height, data } = getContext('LayerCake');

  // export let name = '';
  export let idKey = 'id';
  export let parentKey = undefined;
  export let valueKey = 'value';
  export let labelVisibilityThreshold = r => r > 25;
  export let fill = '#fff';
	export let stroke = '#999';
	export let textColor = '#333';
	export let textStroke = 0;
	export let textStrokeColor = '#000';
	export let sortBy = (a, b) => b.value - a.value; // 'depth' is also a popular choice

  export let circlePadding = 0;

  /* --------------------------------------------
   * This component will automatically group your data
   * into one group if no `parentKey` was passed in.
   * Stash $data here so we can add our own parent
   * if there's no `parentKey`
   */
  let parent = {};
  $: dataset = $data;

  $: if (parentKey === undefined) {
    parent = { [idKey]: 'all' };
    dataset = [...dataset, parent]
  }

	$: stratifier = stratify()
		.id(d => d[idKey])
    .parentId(d => {
      if (d[idKey] === parent[idKey]) return '';
      return d[parentKey] || parent[idKey];
    });

	$: packer = pack()
		.size([$width, $height])
		.padding(circlePadding);

	$: stratified = stratifier(dataset);

	$: root = hierarchy(stratified)
		.sum((d, i) => {
			return d.data[valueKey] || 1;
		})
		.sort(sortBy);

	$: packed = packer(root);

  $: descendants = packed.descendants();

	const titleCase = d => d.replace(/^\w/, w => w.toUpperCase());
	const commas = format(',');
</script>

<div class="circle-pack" data-has-parent-key="{parentKey !== undefined}">
	{#each descendants as d}
		<div
      class="circle-group"
      data-id="{d.data.id}"
      data-visible="{labelVisibilityThreshold(d.r)}"
    >
			<div
				class="circle"
				style="left:{d.x}px;top:{d.y}px;width:{d.r * 2}px;height:{d.r * 2}px;background-color:{fill};border: 1px solid {stroke};"
			/>
				<div
					class="text-group"
					style="
						color:{textColor};
						text-shadow:
							-{textStroke}px -{textStroke}px 0 {textStrokeColor},
							{textStroke}px -{textStroke}px 0 {textStrokeColor},
							-{textStroke}px {textStroke}px 0 {textStrokeColor},
							{textStroke}px {textStroke}px 0 {textStrokeColor};
						left:{d.x}px;
						top:{d.y - (labelVisibilityThreshold(d.r) ? 0 : (d.r + 4))}px;
					"
				>
					<div class="text">{titleCase(d.data.id)}</div>
					{#if d.data.data[valueKey]}
						<div class="text value" >{commas(d.data.data[valueKey])}</div>
					{/if}
				</div>
		</div>
	{/each}
</div>

<style>
	.circle-pack {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.circle,
	.text-group {
		position: absolute;
	}
  .circle {
		transform: translate(-50%, -50%);
  }
	/* Hide the root node if we want, useful if we are creating our own root */
  .circle-pack[data-has-parent-key="false"]	.circle-group[data-id="all"] {
		display: none;
	}
  /* .circle-group:hover {
    z-index: 9999;
  } */
	.circle-group[data-visible="false"] .text-group {
		display: none;
		padding: 4px 7px;
		background: #fff;
		border: 1px solid #ccc;
		transform: translate(-50%, -100%);
    top: -4px;
	}
  .circle-group[data-visible="false"]:hover .text-group {
		z-index: 999;
		display: block !important;
	}
	.circle-group[data-visible="false"]:hover .circle {
		border-color: #000 !important;
	}
	.text-group {
		width: auto;
    top: 50%;
    left: 50%;
		text-align: center;
		transform: translate(-50%, -50%);
		white-space: nowrap;
		pointer-events: none;
		cursor: pointer;
		line-height: 13px;
	}
	.text {
		width: 100%;
		font-size: 11px;
		/* text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; */
	}
	.text.value{
		font-size: 11px;
	}
	.circle {
    border-radius: 50%;
    top: 0;
    left: 0;
	}
</style>
