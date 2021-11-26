<template>
  <div>
    <header v-if="route.path === '/'" class="header header-home">
      <div class="header-home-box">
        <router-link to="/">
          <h1 class="header-h1">Unsplash</h1>
          <h2 class="header-h2">Photo search</h2>
        </router-link>
      </div>
    </header>

    <header v-if="route.path === '/results'" class="header header-results">
      <div class="header-results-box">
        <slot name="query"></slot>
      </div>

      <div>
        <slot name="search"></slot>
      </div>

      <div class="header-results-box">
        <router-link to="/">
          <h1 class="header-h1 header-h1-small">Unsplash</h1>
        </router-link>
        <router-link to="/">
          <h2 class="header-h2">Photo search</h2>
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "Header",
  setup() {
    const route = useRoute();
    return { route };
  },
};
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0px;
  display: grid;
  width: 100%;
  padding: 0.25rem;
  border-bottom: 1px #000;
  background-color: rgba(131, 131, 131, 0.1);
  &-home {
    padding: 2rem;
    grid-template-columns: repeat(1, 1fr);

    &-box {
      display: block;
    }

    & a {
      text-decoration: none;
    }
  }

  &-results {
    grid-template-columns: repeat(3, 1fr);
    box-shadow: 0px 2px 2px 2px rgba(136, 136, 136, 0.75);
    border-bottom: 2px #000;
    background-color: rgba(131, 131, 131, 0.5);
    z-index: 100;
    padding: 0.5rem;

    &-box {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-right: 2rem;
    }

    & a {
      text-decoration: none;
    }
  }

  &-h1 {
    color: #fff;
    font-family: "Open Sans Condensed";
    font-size: 50px;
    letter-spacing: 0.5rem;
    font-weight: 700;
    line-height: 50px;
    text-transform: uppercase;
    text-shadow: 2px 2px 0 #000;
    text-align: center;

    &-small {
      font-size: 30px;
      line-height: 30px;
    }
  }

  &-h2 {
    font-size: 30px;
    letter-spacing: -1px;
    color: #dfbf84;
    text-transform: uppercase;
    text-shadow: 1px 1px 0 #000;
    margin: 0px;
    text-align: center;
    line-height: 30px;
  }
}

@media (max-width: 800px) {
  .header-results {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
