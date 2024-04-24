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
  left: 1rem;
  bottom: 0;
  width: 132px;
  border-bottom: 1px solid white;
}

h1 {
  margin: 0;
  font-size: 1.2rem;
}

main {
  position: relative;
  height: 100vh;
}

main::before {
  content: "";
  position: absolute;
  z-index: 5;
  left: 1rem;
  height: 100%;
  width: 1rem;
  border-left: 5px solid white;
  border-right: 5px solid white;
}

@media (min-width: 770px) {
  main {
    height: calc(100vh - 120px);
  }
}
</style>
