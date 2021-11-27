<template>
  <form class="form" @submit.prevent="handleSearch(query)">
    <div class="form-group">
      <span class="form-field-icon" @click.prevent="handleSearch(query)">
        <font-awesome-icon :icon="['fas', 'search']" />
      </span>
      <input
        type="text"
        name="query"
        class="form-field"
        placeholder="Search for photos"
        v-model="query"
        autocomplete="off"
        @focus="handleFocused()"
        @blur="handleBlured()"
      />

      <ul
        class="suggestions-container"
        :class="
          suggestions.length > 0 && query.length >= 3 && focused
            ? 'suggestions-expanded'
            : ''
        "
      >
        <li
          v-for="sugg in suggestions"
          class="suggestions-item"
          :key="sugg.query"
        >
          <a @click="handleSearch(sugg.query)" class="suggestions-link">{{
            sugg.query
          }}</a>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, watch, computed } from "vue";

export default {
  name: "Search",
  props: {
    queryResult: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const query = ref(props.queryResult ? props.queryResult : "");

    const focused = ref(false);
    const suggestions = computed(() => store.getters["unsplash/suggestions"]);

    const handleFocused = () => (focused.value = true);
    const handleBlured = () => {
      const delayed = setTimeout(() => {
        focused.value = false;
      }, 300);
      return () => clearTimeout(delayed);
    };

    const handleSearch = (searchQuery) => {
      router.push({
        path: "/results",
        query: { search: searchQuery },
      });
    };

    watch(query, (value, prevValue) => {
      if (value !== prevValue && query.value.length >= 3) {
        newSuggestionsList();
      }
    });

    const newSuggestionsList = async () => {
      await store
        .dispatch("unsplash/getSuggestions", query.value)
        .then(
          () => {},
          (error) => {
            console.error(error);
          }
        )
        .catch(() => {});
    };

    return {
      query,
      suggestions,
      focused,
      handleBlured,
      handleFocused,
      handleSearch,
    };
  },
};
</script>

<style lang="scss">
.form-field {
  width: 50vh;
  font-size: 1.6rem;
  line-height: 2.9rem;
  display: block;
  padding: 8px 16px;
  font-weight: 500;
  font-family: inherit;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  -webkit-appearance: none;
  color: #000;
  border: 2px solid;
  border-color: black;
  background: #f9f9f9;
  transition: border 0.3s ease;
  &:focus {
    outline: none;
    border-color: #dfbf84;
  }

  &-icon {
    width: 40px;
    height: 49px;
    text-align: center;
    padding: 10px 12px;
    font-size: 14px;
    line-height: 25px;
    color: black;
    background: #f9f9f9;
    border: 2px solid;
    border-right: none;
    border-color: black;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;

    &:hover {
      cursor: pointer;
    }
  }
}

.form-group {
  position: relative;
  display: flex;
  flex-direction: row;
  flex: 1 1 10rem;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;

  .form-field {
    position: relative;
    z-index: 1;
    flex: 1 1 auto;
    width: 1%;
    margin-top: 0;
    margin-bottom: 0;
  }

  &:focus-within {
    & > span {
      color: white;
      background: grey;
      border-color: #dfbf84;
    }
  }
}

.suggestions {
  &-container {
    list-style: none;
    display: none;
    flex-direction: column;
    flex: 1 1 60vh;
    position: absolute;
    right: 2rem;
    top: 80%;
    background: white;
    min-width: 87.25%;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    padding: unset;
    border-radius: 0.6rem;
    border: 2px solid black;
  }

  &-expanded {
    display: flex;
  }

  &-item {
    list-style-type: none;
  }

  &-link {
    display: block;
    width: 100%;
    padding: 0.5rem 1.5rem;
    font-size: 1.6rem;

    &:hover {
      color: black;
      background: #dfbf84;
      cursor: pointer;
    }
  }
}
</style>
