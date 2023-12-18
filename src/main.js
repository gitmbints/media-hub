import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(Vue3Toasity, {
	autoClose: 2000,
	limit: 2,
	style: {
		fontSize: "12px",
		fontWeight: "bold",
	},
});
app.mount("#app");
