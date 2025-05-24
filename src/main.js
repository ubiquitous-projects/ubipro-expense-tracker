import "./assets/style.css";
import App from "./App.vue";
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(Toast);
app.mount("#app");
