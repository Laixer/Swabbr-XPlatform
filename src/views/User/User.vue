<template>
  <ion-page>
    <ion-content class="user">
      <ion-grid class="user__top">
        <ion-row>
          <ion-col size="4">
            <div class="left">
              <ion-img
                v-if="image"
                :src="image.dataUrl"
                class="uploaded"
              ></ion-img>
              <ion-img
                v-else
                :src="require('@/assets/images/placeholder4.png')"
                class="default"
              ></ion-img>

              <span>@Gert</span>
            </div>
          </ion-col>
          <ion-col size="8">
            <div class="right">
              <div>
                <span>{{ stats.totalFollowers }}</span>
                <span class="label">Followers</span>
              </div>

              <div>
                <span>{{ stats.totalFollowing }}</span>
                <span class="label">Following</span>
              </div>
              <div>
                <span>{{ stats.totalVlogs }}</span>
                <ion-icon :icon="playCircleOutline"></ion-icon>
              </div>

              <div>
                <span>{{ stats.totalLikesReceived }}</span>
                <ion-icon :icon="heartOutline"></ion-icon>
              </div>

              <div>
                <span>{{ stats.totalViews }}</span>
                <ion-icon :icon="eyeOutline"></ion-icon>
              </div>

              <div>
                <span>{{ stats.totalReactionsGiven }}</span>
                <ion-icon :icon="ellipseIcon"></ion-icon>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div class="user__tabs">
        <div v-for="(tab, index) in tabs" :key="index">
          <span
            @click="selectTab(index)"
            class="tab"
            :class="{ active: selectedIndex == index }"
            >{{ tab }}</span
          >
        </div>
      </div>

      <component :is="currentTabComponent" class="user__content"> </component>

      <span @click="logout()">UITLOGGEN</span>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonImg,
} from '@ionic/vue';

import {
  playCircleOutline,
  heartOutline,
  eyeOutline,
  ellipse,
} from 'ionicons/icons';

import { mapState } from 'vuex';

import Profile from './Tabs/Profile.vue';
import Vlogs from './Tabs/Vlogs.vue';
import Following from './Tabs/Following.vue';
import Followers from './Tabs/Followers.vue';

export default {
  name: 'Test',
  components: {
    IonContent,
    IonPage,
    IonButton,
    Profile,
    Vlogs,
    Followers,
    Following,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    playCircleOutline,
    heartOutline,
    eyeOutline,
    ellipse,
    IonImg,
  },

  data() {
    return {
      selectedIndex: 0,
      tabs: ['Vlogs', 'Profile', 'Following', 'Followers'],
      playCircleOutline,
      heartOutline,
      eyeOutline,
      ellipseIcon: ellipse,
      image: null,
    };
  },

  created() {
    this.fetchStats();
  },

  computed: {
    currentTabComponent: function() {
      return this.tabs[this.selectedIndex].toLowerCase();
    },
    ...mapState('user', ['stats']),
  },

  methods: {
    async fetchStats() {
      await this.$store.dispatch('user/selfStats');
    },

    selectTab(index) {
      this.selectedIndex = index;
    },

    async logout() {
      let result = await this.$store.dispatch('auth/logout');

      if (result) {
        this.$router.push('/login');
      }
    },
  },
};
</script>
