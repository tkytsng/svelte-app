import App from "./App.svelte";
require("./asset/scss/bulma.scss");

const app = new App({
  target: document.body
});

export default app;
