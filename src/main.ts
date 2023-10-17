import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "@/App.vue";

import "@/assets/scss/app.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueAxios, axios);

axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

app.mount("#app");
