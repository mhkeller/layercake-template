import App from './App.svelte';
import config from '../config.json';

const app = new App({
	target: document.body,
	hydrate: config.hydrate
});

export default app;
