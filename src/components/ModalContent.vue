<template>
  <div class="modal">
    <div class="modal-header">
      <div class="modal-content">
        <p>Author:</p>
        <span>{{ modalPhoto.user.name }}</span>
      </div>
      <div class="modal-content">
        <p>Created at:</p>
        <span>{{ dayjs(modalPhoto.created_at).format("MMMM - YYYY") }} </span>
      </div>
      <div class="modal-content">
        <p>Location:</p>
        <span>{{
          modalPhoto.user.location ? modalPhoto.user.location : "Unknown"
        }}</span>
      </div>
    </div>
    <div class="modal-content">
      <div class="modal-image">
        <img
          :key="imgFull"
          :alt="modalPhoto.alt_description"
          :src="imgFull ? modalPhoto.urls.regular : modalPhoto.urls.small"
          @click="handleImgFull()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import dayjs from "dayjs";

export default {
  name: "ModalContent",
  setup() {
    const store = useStore();

    const modalPhoto = computed(() => store.getters["unsplash/modalPhoto"]);

    const imgFull = ref(false);
    const handleImgFull = () => {
      imgFull.value = !imgFull.value;
    };

    return { dayjs, handleImgFull, modalPhoto, imgFull };
  },
};
</script>

<style lang="scss">
.modal-container {
  position: fixed;
  z-index: 10000;
  border-radius: 10px;
  box-shadow: 0px 2px 2px 4px #ccc;
  cursor: default !important;
}

.modal {
  display: flex;
  flex-direction: column;
  margin: 0;
  background-color: #fff;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
  max-width: 100vw;
  max-height: 100vh;

  &-header {
    display: flex;
    flex: 1 1 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 5rem;
    border: 0;
    border-bottom: 2px solid #ccc;
  }

  &-content {
    p {
      font-size: 1.5rem;
      font-weight: bold;
    }
    span {
      font-size: 1.6rem;
    }
  }

  &-image {
    padding: 1rem;
    display: block;
    overflow: hidden;
    img {
      width: 100%;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
