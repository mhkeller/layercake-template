<script>
  import { getContext } from 'svelte';

  import QuadTree from './QuadTree.svelte';

  const { width, yScale, originalSettings } = getContext('LayerCake');

  export let dataset;

  const w = 150;
  const w2 = w / 2;
  let top = 0;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length);
  }

  function addCommas (num) {
    const parts = String(num).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  let contents = '';

	function setContents (result) {
    if (Object.keys(result).length === 0) return '';
    const rows = Object.keys(result).filter(d => d !== $originalSettings.x).map(key => {
      return {
        key,
        value: result[key]
      };
    }).sort((a, b) => b.value - a.value);

    top = $yScale(rows[0].value) - 20;

    return `
      <div style="font-weight: bold;">${monthNames[result[$originalSettings.x].getUTCMonth()]} ${result[$originalSettings.x].getUTCDate()}</div>
      ${rows.map(row => `<div><span style="color: #999; width: 65px;display:inline-block;">${capitalize(row.key)}:</span> ${addCommas(row.value)}</div>`).join('')}`;
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
    transition: left 250ms ease-out, top 250ms ease-out;
    z-index: 15;
	}
</style>

<QuadTree
  {dataset}
  y='x'
  let:x
  let:y
  let:visible
  let:found
  let:e
>
  <div
    class="tooltip"
    style="width:{w}px;display: { visible ? 'block' : 'none' };top:{top}px;left:{Math.min(Math.max(w2, x), $width - w2)}px;">{@html setContents(found)}</div>
</QuadTree>

