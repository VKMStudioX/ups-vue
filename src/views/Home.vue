<template>
  <div>
    <div v-if="!loading && randomPhoto" class="home">
      <Header />

      <div class="home-search">
        <Search />
      </div>

      <img
        class="home-image"
        :alt="randomPhoto.alt_description"
        :src="randomPhoto.urls.regular"
      />

      <Footer />
    </div>
    <div v-else class="home">
      <div class="home-spinner">
        <spinner
          :status="loading"
          color="#000000"
          :size="100"
          :clockwise="true"
        ></spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, onBeforeMount, computed } from "vue";
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";
import Footer from "../components/Footer.vue";

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
          () => (loading.value = false),
          (error) => console.error(error)
        )
        .catch(() => (loading.value = true));
    });
    return { randomPhoto, loading };
  },
  components: { Header, Search, Footer },
};
</script>

<style lang="scss">
.home {
  position: relative;
  height: 100vh;

  &-search {
    position: absolute;
    top: 45vh;
    left: 50%;
    width: 50vh;
    z-index: 100;
    transform: translateX(-50%);
  }

  &-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
