<script>
	import { stratify, pack, hierarchy } from 'd3-hierarchy'
	import { getContext } from 'svelte';

	const { width, height, data } = getContext('LayerCake');

  // export let name = '';
  export let idKey = 'id';
  export let parentKey = undefined;
  export let valueKey = 'value';
  export let labelVisibilityThreshold = 25;
  export let fill = '#ff00cc50';
  export let stroke = '#f0c';

  export let circlePadding = 0;

  /* --------------------------------------------
   * This component will automatically group your data
   * into one group if no `parentKey` was passed in.
   * Stash $data here so we can add our own parent
   * if there's no `parentKey`
   */
  let parent = {};
  let dataset = $data;

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
			return d.data[valueKey];
		})
		.sort((a, b) => b.value - a.value );

	$: packed = packer(root);

  $: descendants = packed.descendants();

  const titleCase = d => d.replace(/^\w/, w => w.toUpperCase());
</script>

<div class="circle-pack">
	{#each descendants as d}
		<div
      class="circle-group"
      data-id="{d.data.id}"
      data-visible="{d.r > labelVisibilityThreshold}"
      style="left:{d.x}px;top:{d.y}px;"
    >
			<div class="circle"
				style="width:{d.r * 2}px;height:{d.r * 2}px;background-color:{fill};border: 1px solid {stroke};"
			/>
			<div class="text-group">
				<div class="text">{titleCase(d.data.id)}</div>
				<div class="text value" >{d.data.data[valueKey]}</div>
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
	.circle-group,
	.text-group {
		position: absolute;
	}
  .circle-group {
		transform: translate(-50%, -50%);
  }
  .circle-group[data-id="all"] {
		display: none;
	}
  .circle-group:hover {
    z-index: 9999;
  }
	.circle-group[data-visible="false"] .text-group {
		display: none;
		padding: 4px 7px;
		background: #fff;
		border: 1px solid #ccc;
		transform: translate(-50%, -100%);
    top: -4px;
	}
  .circle-group:hover .text-group {
		display: block !important;
	}
	.text-group {
		z-index: 9999;
		width: auto;
    top: 50%;
    left: 50%;
		text-align: center;
		transform: translate(-50%, -50%);
		white-space: nowrap;
		pointer-events: none;
		cursor: pointer;
	}
	.text {
		color: #333;
		width: 100%;
		font-size: 13px;
		/* text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; */
	}
	.text.value{
		font-size: 12px;
		transform: translate(0, 1px)
	}
	.circle {
    border-radius: 50%;
    top: 0;
    left: 0;
	}
	.circle:hover {
		border-color: #000;
	}
</style>
