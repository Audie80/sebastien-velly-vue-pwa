<template>
  <header>
    <img alt="Vue logo" src="./assets/titre.jpg" height="120px" />
    <h1>Toute l'actualité du musicien Sébastien Velly</h1>
  </header>
  <main>
    <TabList />
  </main>
</template>

<script setup>
import TabList from "./components/TabList.vue";
</script>

<style>
html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: black;
}

header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-right: 1rem;
}

header::after {
  content: "";
  position: absolute;
  left: 0.6rem;
  bottom: 0;
  width: 90px;
  border-bottom: 1px solid white;
}

header img {
  height: 80px;
}

h1 {
  margin: 0;
  font-size: 0.8rem;
}

main {
  position: relative;
  height: calc(100vh - 80px - 54.8px);
}

main::before {
  content: "";
  position: absolute;
  z-index: 5;
  left: 0.6rem;
  height: 100%;
  width: 0.65rem;
  border-left: 3.4px solid white;
  border-right: 3.4px solid white;
}

p {
  font-size: 11px;
}

@media (min-width: 770px) {
  header::after {
    left: 1rem;
    width: 238px;
  }

  header img {
    height: unset;
  }

  h1 {
    font-size: 1.2rem;
  }

  main {
    height: 100vh;
  }

  main::before {
    left: 1rem;
    width: 1.6rem;
    height: 100%;
    border-left: 7px solid white;
    border-right: 7px solid white;
  }

  p {
    font-size: 14px;
  }
}
</style>
