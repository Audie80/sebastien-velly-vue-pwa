<template>
  <div class="facebook-container">
    <p>
      Les dernières actualités du musicien Sébastien Velly sont sur sa page
      Facebook, chansons en français, dates de concert, passages à la radio,
      photos sur scène...
    </p>
    <div
      class="fb-page"
      data-href="https://www.facebook.com/sebastienvellymusicien"
      data-tabs="timeline"
      data-width="500px"
      data-height="680px"
      data-small-header="true"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    >
      <blockquote
        cite="https://www.facebook.com/sebastienvellymusicien"
        class="fb-xfbml-parse-ignore"
      >
        <a href="https://www.facebook.com/sebastienvellymusicien"
          >Sébastien Velly Musique</a
        >
      </blockquote>
    </div>
  </div>
</template>

<style scoped>
.facebook-container {
  display: block;
  margin-right: 0;
}

@media (min-width: 770px) {
  .youtube-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-right: 96px;
  }
}
</style>
