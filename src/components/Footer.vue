<template>
  <footer class="footer">
    <div class="footer-item">
      Coded with love &#10084; in Vue.js
      <font-awesome-icon :icon="['fab', 'vuejs']" /><br />
      by
      <a href="https://vkmstudiox.github.io/" target="_blank" alt="">
        VKM Studio (Krzysztof Meyer)</a
      >
      &copy; 2021<br />
      for one nice IT company as recruitment task.
    </div>
    <svg
      style="visibility: hidden; position: absolute"
      width="0"
      height="0"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
.footer {
  position: fixed;
  top: 90vh;
  left: 0.5vw;
  display: block;
  z-index: 100;
  opacity: 0.5;

  &-item,
  &-item a {
    font-family: "Open Sans Condensed";
    font-size: 2rem;
    line-height: 1.35;
    font-weight: bold;
    font-style: italic;
    display: inline;
    text-decoration: none;
    box-decoration-break: clone;
    background-color: black;
    text-shadow: 1px 1px 2 #000;
    letter-spacing: 1px;
    color: #a87d2c;
    padding: 0.5rem 0.5rem;
    filter: url("#goo");
  }
  &-item a:hover {
    color: white;
  }
}
</style>
