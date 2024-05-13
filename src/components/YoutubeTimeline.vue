<template>
  <div class="youtube-container">
    <p>
      Les dernières vidéos de la chaîne Youtube Sébastien Velly, clips musicaux,
      making-off, émissions de télévision, concerts live, coulisses...
    </p>
    <div class="videos-wall">
      <iframe
        height="180"
        :src="`https://www.youtube.com/embed/${video.id.videoId}?si=98wYA2WYnSmY4_UK`"
        title="YouTube video player"
        frameborder="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        v-for="video in videos"
        :key="video.id"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

let videos = ref([]);

onMounted(() => {
  fetchData();
});

async function fetchData() {
  try {
    const youtubeUrl =
      "https://youtube.googleapis.com/youtube/v3/search?part=id&channelId=UCmevOXVyh-LCV5Km0Uc3hZg&maxResults=9&order=date&type=video&videoEmbeddable=true&key=" +
      process.env.VUE_APP_YOUTUBE_API;
    const response = await fetch(youtubeUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Données récupérées de l'api Youtube");
    videos.value = data.items;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Si l'appel API échoue, chargez les données à partir du fichier JSON de secours
    loadJSONData();
  }
}

async function loadJSONData() {
  try {
    const response = await fetch("/youtube.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();
    console.log("Données récupérées du fichier JSON de secours");
    videos.value = jsonData.items;
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
}
</script>

<style scoped>
.youtube-container {
  height: 600px;
  margin-right: 0;
}

.videos-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  justify-content: center;
  justify-items: stretch;
}

@media (min-width: 770px) {
  .youtube-container {
    margin-right: 96px;
  }

  .videos-wall {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}
</style>
