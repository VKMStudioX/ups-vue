<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Open+Sans+Condensed:700);

* {
  box-sizing: border-box;
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  background-color: rgba(131, 131, 131, 0.5);
  background: linear-gradient(-45deg, #ccc, #666, #ccc, #666);
  background-size: 400% 400%;
  min-height: 100vh;
  animation: gradient 15s ease infinite;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

a:visited {
  color: #333;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  border-left: 1px solid #dfbf84;
}
::-webkit-scrollbar-thumb {
  background: #dfbf84;
  box-shadow: inset 0 0 6px #dfbf84;
  -webkit-box-shadow: inset 0 0 6px #dfbf84;
}
::-webkit-scrollbar-thumb:hover {
  background: #dfbf84;
  box-shadow: inset 0 0 6px black;
  -webkit-box-shadow: inset 0 0 6px black;
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #dfbf84;
}
</style>
