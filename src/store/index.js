import { createStore } from "vuex";
import { createLogger } from "vuex";
import { unsplash } from "./modules/unsplash.module";

const store = createStore({
  modules: {
    unsplash,
  },
  plugins: [createLogger()],
});

export default store;
