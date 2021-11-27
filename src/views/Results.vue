<template>
  <div class="results">
    <Header>
      <template #query>
        <h2 class="header-h2">{{ query }}</h2>
      </template>
      <template #search>
        <Search :queryResult="query" :key="query" />
      </template>
    </Header>

    <Modal v-if="modalState" />

    <div v-if="photos.length > 0 && !loading">
      <Photos
        :photos="photos"
        :key="photos"
        @loadMore="loadMore()"
        @openModalWithPhoto="openModalWithPhoto($event)"
      />
    </div>
    <div v-else class="results-spinner">
      <spinner
        :status="loading"
        color="#000000"
        :size="100"
        :clockwise="true"
      ></spinner>
    </div>

    <Footer />
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import Header from "../components/Header.vue";
import Photos from "../components/Photos.vue";
import Footer from "../components/Footer.vue";
import ModalContent from "../components/ModalContent.vue";
import { container, openModal } from "jenesius-vue-modal";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, onMounted, watch, ref } from "vue";

export default {
  name: "Results",
  components: { Search, Header, Photos, Modal: container, Footer },
  setup() {
    const store = useStore();
    const route = useRoute();
    const query = computed(() => {
      return route.query.search
        ? route.query.search.toString().replace("+", " ")
        : null;
    });
    const photosFromStore = computed(() => store.getters["unsplash/photos"]);
    const photos = ref([]);
    const modalState = ref(false);
    const page = ref(1);
    const loading = ref(true);

    const openModalWithPhoto = (photo) => {
      store.dispatch("unsplash/modalPhoto", photo).then(() => {
        modalState.value = true;
        openModal(ModalContent);
      });
    };

    const getPhotosDelayed = (newQuery) => {
      const delayed = setTimeout(() => {
        getPhotos(newQuery);
      }, 300);
      return () => clearTimeout(delayed);
    };

    const getPhotos = async (newQuery) => {
      const params = {
        query: query.value,
        page: page.value,
      };

      await store
        .dispatch("unsplash/getPhotos", params)
        .then(
          (data) => {
            newQuery
              ? (photos.value = photosFromStore.value)
              : (photos.value = photos.value.concat(data.response.results));
            loading.value = false;
          },
          (error) => {
            console.error(error);
            loading.value = true;
          }
        )
        .catch(() => {
          loading.value = true;
        });
    };

    const loadMore = () => {
      page.value = page.value + 1;
      getPhotosDelayed(false);
    };

    onMounted(() => {
      getPhotos(true);
    });

    watch(query, (value, prevValue) => {
      if (
        route.path === "/results" &&
        value !== undefined &&
        value !== prevValue
      ) {
        page.value = 1;
        getPhotosDelayed(true);
      }
    });

    return {
      query,
      photos,
      loading,
      loadMore,
      modalState,
      openModalWithPhoto,
    };
  },
};
</script>

<style lang="scss">
.results {
  position: relative;
  height: 100%;
  margin-top: 8rem;

  &-spinner {
    position: absolute;
    top: 40vh;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
