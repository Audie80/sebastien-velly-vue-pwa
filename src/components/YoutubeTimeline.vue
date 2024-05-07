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
  await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=id&channelId=UCmevOXVyh-LCV5Km0Uc3hZg&maxResults=9&order=date&type=video&videoEmbeddable=true&key=${process.env.VUE_APP_YOUTUBE_API}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      response.json().then((data) => {
        videos.value = data.items;
      });
    })
    .catch((err) => {
      console.error(err);
    });
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
