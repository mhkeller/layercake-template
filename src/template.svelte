<script>
	export let head = '';
	export let html = '';
	export let includeJS = true;

	const version = Date.now();
</script>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width,initial-scale=1'>

	<title>LayerCake Example</title>

	<link rel='icon' type='image/png' href='/favicon.png'>
	<link rel='stylesheet' href='/global.css'>
	<link rel='stylesheet' href='/build/bundle.css?version={version}'>

	{#if includeJS === true}
	<script defer src='/build/bundle.js?version={version}'></script>
	{/if}
	{@html head}
</head>

<body>
	{@html html}
</body>
</html>
