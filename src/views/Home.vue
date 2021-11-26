<template>
  <div class="home">
    <Header />

    <div className="home-search">
      <Search />
    </div>

    <img
      v-if="!loading && randomPhoto"
      :key="loading"
      class="home-image"
      :alt="randomPhoto.alt_description"
      :src="randomPhoto.urls.full"
    />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, onBeforeMount, computed } from "vue";
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";

export default {
  name: "Home",
  setup() {
    const store = useStore();
    const randomPhoto = computed(() => store.getters["unsplash/randomPhoto"]);
    const loading = ref(true);

    onBeforeMount(async () => {
      await store
        .dispatch("unsplash/getRandomPhoto")
        .then(
          () => {
            loading.value = false;
          },
          (error) => {
            console.error(error);
          }
        )
        .catch(() => {
          loading.value = true;
        });
    });
    return { randomPhoto };
  },
  components: { Header, Search },
};
</script>

<style lang="scss">
.home {
  position: relative;

  &-search {
    position: absolute;
    top: 40vh;
    left: 50%;
    width: 50vh;
    z-index: 100;
    transform: translateX(-50%);
  }

  &-image {
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: -100;
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
}
</style>
