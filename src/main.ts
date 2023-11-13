/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";
import { firebaseApp } from "./configs/firebase";
// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import { VueFire, VueFireAuth } from "vuefire";

const app = createApp(App);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
registerPlugins(app);

app.mount("#app");
