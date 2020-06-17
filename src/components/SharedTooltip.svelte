<script>
  import { getContext } from 'svelte';
  import { format } from 'd3-format';

  import QuadTree from './QuadTree.svelte';

  const { data, width, yScale, config } = getContext('LayerCake');

  const commas = format(',');
  const titleCase = d => d.replace(/^\w/, w => w.toUpperCase());

  export let tooltipOffset = 20;
  export let dataset = undefined;
  export let formatTitle = d => d;
  export let formatKey = d => titleCase(d);
  export let formatValue = d => isNaN(+d) ? d : commas(d);

  const w = 150;
  const w2 = w / 2;
  let top = 0;

	/* --------------------------------------------
	 * Sort the keys by the highest value
	 */
  function sortResult(result) {
    if (Object.keys(result).length === 0) return [];
    const rows = Object.keys(result).filter(d => d !== $config.x).map(key => {
      return {
        key,
        value: result[key]
      };
    }).sort((a, b) => b.value - a.value);

    return rows;
  }
</script>

<style>
	.tooltip {
		position: absolute;
		font-size: 13px;
		pointer-events: none;
		border: 1px solid #ccc;
		background: rgba(255, 255, 255, 0.85);
		transform: translate(-50%, -100%);
    padding: 5px;
    z-index: 15;
    pointer-events: none;
  }
  .line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    border-left: 1px dotted #666;
    pointer-events: none;
  }
  .tooltip,
  .line {
    transition: left 250ms ease-out, top 250ms ease-out;
  }
  .title {
    font-weight: bold;
  }
  .key {
    color: #999;
  }
</style>

<QuadTree
  dataset={dataset || $data}
  y='x'
  let:x
  let:y
  let:visible
  let:found
  let:e
>
  {#if visible === true}
    <div
      style="left:{x}px;"
      class="line"></div>
    <div
      class="tooltip"
      style="
        width:{w}px;
        display: { visible ? 'block' : 'none' };
        top:{$yScale(sortResult(found)[0].value) - tooltipOffset}px;
        left:{Math.min(Math.max(w2, x), $width - w2)}px;"
      >
        <div class="title">{formatTitle(found[$config.x])}</div>
        {#each sortResult(found) as row}
          <div class="row"><span class="key">{formatKey(row.key)}:</span> {formatValue(row.value)}</div>
        {/each}
    </div>
  {/if}
</QuadTree>

