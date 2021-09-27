<template>
  <ion-page>
    <ion-header class="">
      <ion-grid class="user__top">
        <ion-row>
          <ion-col size="6">
            <div class="left">
              <div class="profile-image">
                <ion-img
                  v-if="currentUser.profileImageUri"
                  :src="currentUser.profileImageUri"
                  class="uploaded"
                ></ion-img>
                <ion-img
                  v-else
                  :src="require('@/assets/images/placeholder4.png')"
                  class="default"
                ></ion-img>
              </div>

              <span>@{{ currentUser.nickname }}</span>
            </div>
          </ion-col>
          <ion-col size="6">
            <div class="right">
              <div>
                <span>{{ currentStats.totalFollowers }}</span>
                <span class="label">Followers</span>
              </div>

              <div>
                <span>{{ currentStats.totalFollowing }}</span>
                <span class="label">Following</span>
              </div>
              <div>
                <span>{{ currentStats.totalVlogs }}</span>
                <ion-icon :icon="playCircleOutline"></ion-icon>
              </div>

              <div>
                <span>{{ currentStats.totalLikesReceived }}</span>
                <ion-icon :icon="heartOutline"></ion-icon>
              </div>

              <div>
                <span>{{ currentStats.totalViews }}</span>
                <ion-icon :icon="eyeOutline"></ion-icon>
              </div>

              <div>
                <span>{{ currentStats.totalReactionsGiven }}</span>
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
    </ion-header>
    <ion-content class="user">
      <div class="user__content">
        <component :is="currentTabComponent" :key="selectedUser.id">
        </component>
      </div>
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
  IonHeader,
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
  name: 'User',
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
    IonHeader,
  },

  data() {
    return {
      selectedIndex: 0,
      tabs: this.$route.params.id
        ? ['Vlogs', 'Following', 'Followers']
        : ['Vlogs', 'Profile', 'Following', 'Followers'],
      playCircleOutline,
      heartOutline,
      eyeOutline,
      ellipseIcon: ellipse,
      image: null,
      currentUser: {},
      currentStats: {},
    };
  },

  computed: {
    currentTabComponent: function() {
      return this.tabs[this.selectedIndex].toLowerCase();
    },

    ...mapState('user', [
      'self',
      'selfStats',
      'selectedUser',
      'selectedUserStats',
    ]),
  },

  watch: {
    '$route.params.id': {
      handler() {
        this.fetchUserData(this.$route.params.id);
        this.selectTab(0);
      },
      immediate: true,
    },
  },

  methods: {
    async fetchUserData(id) {
      if (id) {
        await this.$store.dispatch('user/fetchSelectedUser', id);
        await this.$store.dispatch('user/fetchSelectedUserStats', id);
        await this.$store.dispatch('user/fetchSelectedUserFollowing', id);
        await this.$store.dispatch('user/fetchSelectedUserFollowers', id);
        await this.$store.dispatch('vlog/fetchCurrentUserVlogs', id);
      } else {
        await this.$store.dispatch('user/selfStats');
        await this.$store.dispatch('user/fetchSelectedUserRequested');
        await this.$store.dispatch(
          'user/fetchSelectedUserFollowing',
          this.self.id
        );

        await this.$store.dispatch(
          'user/fetchSelectedUserFollowers',
          this.self.id
        );
        await this.$store.dispatch('vlog/fetchCurrentUserVlogs', this.self.id);
      }

      this.setCurrentUser();
    },

    setCurrentUser() {
      if (this.$route.params.id) {
        this.currentUser = this.selectedUser;
        this.currentStats = this.selectedUserStats;
      } else {
        this.currentUser = this.self;
        this.currentStats = this.selfStats;
      }
    },

    selectTab(index) {
      this.selectedIndex = index;
    },
  },
};
</script>
