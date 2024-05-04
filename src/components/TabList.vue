<template>
  <div id="tabpanel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
    <FacebookTimeline />
  </div>
  <div
    id="tabpanel-2"
    role="tabpanel"
    tabindex="0"
    aria-labelledby="tab-2"
    class="is-hidden"
  >
    <YoutubeTimeline />
  </div>
  <div
    id="tabpanel-3"
    role="tabpanel"
    tabindex="0"
    aria-labelledby="tab-3"
    class="is-hidden"
  >
    <InstagramTimeline />
  </div>
  <div class="tabnav">
    <h2 id="tablist-1">Mes réseaux sociaux</h2>
    <div role="tablist" aria-labelledby="tablist-1" class="automatic">
      <button
        id="tab-1"
        ref="tabButtons"
        type="button"
        role="tab"
        aria-selected="true"
        aria-controls="tabpanel-1"
        @click="selectTab"
      >
        <span class="focus">Facebook</span>
      </button>
      <button
        id="tab-2"
        ref="tabButtons"
        type="button"
        role="tab"
        aria-selected="false"
        aria-controls="tabpanel-2"
        tabindex="-1"
        @click="selectTab"
      >
        <span class="focus">Youtube</span>
      </button>
      <button
        id="tab-3"
        ref="tabButtons"
        type="button"
        role="tab"
        aria-selected="false"
        aria-controls="tabpanel-3"
        tabindex="-1"
        @click="selectTab"
      >
        <span class="focus">Instagram</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FacebookTimeline from "./FacebookTimeline.vue";
import YoutubeTimeline from "./YoutubeTimeline.vue";
import InstagramTimeline from "./InstagramTimeline.vue";

const tabButtons = ref([]);
const selectTab = function (event) {
  for (let index = 0; index < tabButtons.value.length; index++) {
    const tab = tabButtons.value[index];
    if (event.target === tab) {
      tab.setAttribute("aria-selected", "true");
      tab.removeAttribute("tabindex");
      this.tabpanels[index].classList.remove("is-hidden");
    } else {
      tab.setAttribute("aria-selected", "false");
      tab.tabIndex = -1;
      this.tabpanels[index].classList.add("is-hidden");
    }
  }
};

class TabsAutomatic {
  constructor(groupNode) {
    this.tablistNode = groupNode;

    this.tabs = [];

    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll("[role=tab]"));
    this.tabpanels = [];

    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      var tabpanel = document.getElementById(tab.getAttribute("aria-controls"));

      tab.tabIndex = -1;
      tab.setAttribute("aria-selected", "false");
      this.tabpanels.push(tabpanel);

      tab.addEventListener("keydown", this.onKeydown.bind(this));
      tab.addEventListener("click", this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    this.setSelectedTab(this.firstTab, false);
  }

  setSelectedTab(currentTab, setFocus) {
    if (typeof setFocus !== "boolean") {
      setFocus = true;
    }
    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute("aria-selected", "true");
        tab.removeAttribute("tabindex");
        this.tabpanels[i].classList.remove("is-hidden");
        if (setFocus) {
          tab.focus();
        }
      } else {
        tab.setAttribute("aria-selected", "false");
        tab.tabIndex = -1;
        this.tabpanels[i].classList.add("is-hidden");
      }
    }
  }

  setSelectedToPreviousTab(currentTab) {
    var index;

    if (currentTab === this.firstTab) {
      this.setSelectedTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index - 1]);
    }
  }

  setSelectedToNextTab(currentTab) {
    var index;

    if (currentTab === this.lastTab) {
      this.setSelectedTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case "ArrowLeft":
        this.setSelectedToPreviousTab(tgt);
        flag = true;
        break;

      case "ArrowRight":
        this.setSelectedToNextTab(tgt);
        flag = true;
        break;

      case "Home":
        this.setSelectedTab(this.firstTab);
        flag = true;
        break;

      case "End":
        this.setSelectedTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}

// Initialize tablist

window.addEventListener("load", function () {
  var tablists = document.querySelectorAll("[role=tablist].automatic");
  for (var i = 0; i < tablists.length; i++) {
    new TabsAutomatic(tablists[i]);
  }
});
</script>

<style scoped>
.tabnav {
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100%;
  min-width: 100%;
  background-color: black;
}

h2 {
  margin: 5px 1rem 5px 2.4rem;
  font-size: 0.7rem;
}

[role="tab"] {
  display: inline-block;
  position: relative;
  z-index: 2;
  overflow: hidden;
  width: 33%;
  height: 2rem;
  padding: 0;
  padding-left: 1.6rem;
  color: white;
  font-size: 0.6rem;
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.5s, border 0.5s;
}

[role="tab"]::before {
  content: "";
  position: absolute;
  z-index: 5;
  left: 0.45rem;
  top: 0;
  height: 100%;
  width: 0.65rem;
  border-left: 3.4px solid grey;
  border-right: 3.4px solid grey;
  transition: border 0.5s;
}

[role="tab"][aria-selected="true"]::before {
  border-left: 3.4px solid white;
  border-right: 3.4px solid white;
}

[role="tab"]:focus span,
[role="tab"]:hover span,
[role="tab"][aria-selected="true"] span {
  transform: scale(1.2);
  transition: transform 0.5s;
}

[role="tab"][aria-selected="true"]:not(:first-child) {
  border-left: 1px solid white;
}

[role="tab"][aria-selected="true"]:not(:last-child) {
  border-right: 1px solid white;
}

[role="tab"][aria-selected="false"] {
  color: grey;
  border-top: 1px solid white;
}

[role="tab"][aria-selected="false"]:not(:last-child) {
  border-right: 1px solid grey;
}
[role="tab"] span.focus {
  display: inline-block;
  margin: 2px;
  padding: 4px 6px;
}

[role="tabpanel"] {
  padding: 5px 1rem 5px 2.4rem;
  height: calc(100vh - 80px - 54.8px);
  overflow: auto;
}
[role="tabpanel"].is-hidden {
  display: none;
}

[role="tabpanel"] p {
  margin: 0;
}

@media (min-width: 770px) {
  .tabnav {
    position: absolute;
    top: 0;
    right: 0;
    width: 6rem;
    min-width: 6rem;
    height: 100%;
    min-height: 100%;
  }

  h2 {
    margin: 5px 0;
    font-size: 1rem;
  }

  [role="tablist"] {
    display: flex;
    flex-flow: column;
  }

  [role="tab"] {
    width: 6rem;
    height: 6rem;
    padding-left: 0;
    font-size: 0.8rem;
  }

  [role="tab"]::before {
    content: none;
  }

  [role="tab"][aria-selected="true"]:not(:first-child) {
    border-left: none;
    border-top: 1px solid white;
  }

  [role="tab"][aria-selected="true"]:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid white;
  }

  [role="tab"][aria-selected="false"] {
    border-left: 1px solid white;
    border-top: none;
  }

  [role="tab"][aria-selected="false"]:not(:last-child) {
    border-right: none;
  }

  [role="tabpanel"] {
    height: 100vh;
    padding: 5px 0 5px 4.4rem;
  }
}
</style>
