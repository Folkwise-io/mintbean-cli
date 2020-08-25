import App from './App.svelte';

const app = new App({
	// Target is where the app will be injected
	target: document.body,
	// props is anything I want to pass to the props
});

export default app;