<template>
  <div class="vlog">
    <div class="vlog__user">
      <img :src="vlogWrapper.user.profileImageUri" />
      <span class="name">@{{ vlogWrapper.user.nickname }}</span>
    </div>
    <video
      :ref="vlogWrapper.vlog.id"
      playsinline
      muted
      style="pointer-events: none;"
      @ended="onVideoEnd()"
      @timeupdate="timeUpdate()"
      @loadedmetadata="getDuration()"
      :poster="vlogWrapper.vlog.thumbnailUri"
    >
      <source :src="vlogWrapper.vlog.videoUri" type="video/mp4" />
    </video>

    <div class="controls swiper-no-swiping">
      <span class="current-time">{{ formatedCurrentTime }}</span>
      <input
        type="range"
        class="progressBar"
        min="0"
        :max="duration"
        @input="seeking()"
        v-model="progress"
      />
      <span class="total-time">{{ formatedDuration }}</span>
    </div>

    <div class="vlog__stats">
      <div class="left">
        <div>
          <ion-icon :icon="heartOutline"></ion-icon>
          <span>{{ vlogWrapper.vlogLikeCount }}</span>
        </div>

        <div>
          <ion-icon :icon="eyeOutline"></ion-icon>
          <span>{{ vlogWrapper.vlog.views }}</span>
        </div>

        <div>
          <ion-icon :icon="chatboxEllipsesOutline"></ion-icon>
          <span>{{ vlogWrapper.reactionCount }}</span>
        </div>
      </div>

      <div class="record"></div>
    </div>
  </div>
</template>

<script>
import { IonIcon, IonImg } from '@ionic/vue';

import {
  heartOutline,
  eyeOutline,
  chatboxEllipsesOutline,
} from 'ionicons/icons';

export default {
  name: 'Vlog',
  components: {
    IonIcon,
    IonImg,
    heartOutline,
    eyeOutline,
    chatboxEllipsesOutline,
  },

  props: {
    vlogWrapper: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      heartOutline,
      eyeOutline,
      chatboxEllipsesOutline,
      currentTime: '00:00',
      formatedDuration: '00:00',
      progress: 0,
      duration: 0,
    };
  },

  computed: {
    player() {
      return this.$refs[this.vlogWrapper.vlog.id];
    },

    formatedCurrentTime() {
      const result = new Date(parseInt(this.currentTime) * 1000)
        .toISOString()
        .substr(11, 8);
      return result.substr(3, 2) + ':' + result.substr(6, 2);
    },
  },

  methods: {
    seeking() {
      this.player.currentTime = this.progress;
      this.player.play();
    },
    timeUpdate() {
      this.currentTime = this.player.currentTime;
      this.progress = Math.floor(this.player.currentTime);
    },

    getDuration() {
      const result = new Date(parseInt(this.player.duration) * 1000)
        .toISOString()
        .substr(11, 8);
      this.duration = Math.floor(this.player.duration);
      this.formatedDuration = result.substr(3, 2) + ':' + result.substr(6, 2);
    },

    onVideoEnd() {
      this.$emit('onVideoEnded');
    },
  },
};
</script>
