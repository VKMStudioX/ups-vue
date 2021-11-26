<template>
  <div class="photos">
    <masonry-wall
      :items="photos"
      :ssr-columns="1"
      :column-width="300"
      :gap="16"
    >
      <template #default="{ item }">
        <img
          :alt="item.alt_description"
          :src="item.urls.small"
          @click="openModal(item)"
        />
      </template>
    </masonry-wall>
    <infinite-loading
      @infinite="loadMore"
      :distance="1000"
      :firstLoad="false"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Photos",
  props: {
    photos: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const busy = ref(false);
    const loadMore = () => emit("loadMore");
    const openModal = (photo) => emit("openModalWithPhoto", photo);

    return { loadMore, busy, openModal };
  },
  emits: ["loadMore", "openModalWithPhoto"],
};
</script>

<style lang="scss">
#vue3-infinite-loading {
  display: none !important;
}

.photos {
  max-width: 90%;
  margin: auto;
  width: 100%;
  img {
    height: auto;
    max-width: 100%;
    margin: 1em;
    border-radius: 1rem;
    border: 1px solid #ccc;
    box-shadow: 0px 2px 4px #444;
    opacity: 0.5;
    transition: all 1s ease-in-out;
  }
}

.photos img:hover {
  transform: scale(1.05);
  opacity: 1;
}

@media (max-width: 800px) {
  .photos {
    column-count: 3;
  }
}

@media (max-width: 600px) {
  .photos {
    column-count: 2;
  }
}

@media (max-width: 400px) {
  .photos {
    column-count: 1;
  }
}
</style>
