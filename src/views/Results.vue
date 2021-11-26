<template>
  <div>
    <Header>
      <template #query>
        <h2 class="header-h2">{{ query }}</h2>
      </template>
      <template #search>
        <Search :queryResult="query" :key="query" />
      </template>
    </Header>

    <Modal v-if="modalState" />
    <!-- <template #content>
        <ModalContent />
      </template>
    </Modal> -->

    <Photos
      :photos="photos"
      :key="photos"
      @loadMore="loadMore()"
      @openModalWithPhoto="openModalWithPhoto($event)"
    />
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import Header from "../components/Header.vue";
import Photos from "../components/Photos.vue";
// import Modal from "../components/Modal.vue";
import ModalContent from "../components/ModalContent.vue";
import { container, openModal } from "jenesius-vue-modal";

import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, onMounted, watch, ref } from "vue";

export default {
  name: "Results",
  components: { Search, Header, Photos, Modal: container },
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

    const openModalWithPhoto = (photo) => {
      store.dispatch("unsplash/modalPhoto", photo).then(() => {
        modalState.value = true;
        openModal(ModalContent);
      });
    };

    const closeModal = () => {
      modalState.value = false;

      console.log(modalState.value);
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
          },
          (error) => {
            console.error(error);
          }
        )
        .catch(() => {});
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
        page.value = 0;
        getPhotosDelayed(true);
      }
    });

    return {
      query,
      photos,
      loadMore,
      openModalWithPhoto,
      closeModal,
      modalState,
    };
  },
};
</script>

<style></style>
