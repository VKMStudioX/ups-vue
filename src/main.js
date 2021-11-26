import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import InfiniteLoading from "v3-infinite-loading";
import MasonryWall from "@yeger/vue-masonry-wall";
import Spinner from "vue-spinner-component/src/Spinner.vue";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSearch);

createApp(App)
  .use(store)
  .use(router)
  .use(MasonryWall)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("infinite-loading", InfiniteLoading)
  .component("spinner", Spinner)
  .mount("#app");
