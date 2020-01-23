<script>
  import { getContext } from 'svelte';

  const { data, x, xGet, yGet } = getContext('LayerCake');

	function pretty (val) {
    return val.charAt(0).toUpperCase() + val.slice(1, val.length);
  }

  // Get the data for the last row (highest x-value)
  $: max = values => {
    let d;
    let m = -Infinity;
    let i = 0;
    while (i < values.length) {
      const val = $x(values[i]);
      if (val > m) {
        m = val;
        d = values[i];
      }
      i += 1;
    }
    return d;
  }

  $: left = values => $xGet(max(values));
  $: top = values => $yGet(max(values));
</script>

{#each $data as group}
	<div
    class="label"
    style="top:{top(group.values)}px;left:{left(group.values)}px;"
  >{pretty(group.key)}</div>
{/each}

<style>
	.label {
		position: absolute;
		transform: translate(-100%, -100%)translateY(1px);
		font-size: 13px;
	}
</style>
