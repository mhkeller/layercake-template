<script>
  import { getContext } from 'svelte';
  import { max } from 'd3-array';

  const { data, x, y, xScale, yScale, xRange, yRange } = getContext('LayerCake');

  /* --------------------------------------------
	 * Title case the first letter
	 */
	const cap = val => val.replace(/^\w/, d => d.toUpperCase());

  /* --------------------------------------------
	 * Put the label on the highest value
	 */
  $: left = values => $xScale(max(values, $x)) /  Math.max(...$xRange);
  $: top = values => $yScale(max(values, $y)) / Math.max(...$yRange);
</script>

{#each $data as group}
	<div
    class="label"
    style="
      top:{top(group.values) * 100}%;
      left:{left(group.values) * 100}%;
    "
  >{cap(group.key)}</div>
{/each}

<style>
	.label {
		position: absolute;
		transform: translate(-100%, -100%)translateY(1px);
		font-size: 13px;
	}
</style>
