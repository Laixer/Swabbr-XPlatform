<template>
  <ion-page>
    <ion-content :fullscreen="true">
      Love its!

      <div class="user-list" v-if="likedVlogs.length > 0">
        <div
          class="user-list__item"
          v-for="(vlog, index) in likedVlogs"
          :key="index"
          @click="$router.replace(`/user/${user.id}`)"
        >
          <ion-img
            v-if="vlog.user.hasProfileImage"
            :src="vlog.user.profileImageUri"
          ></ion-img>
          <ion-img
            v-else
            :src="require('@/assets/images/placeholder4.png')"
            class="default"
          ></ion-img>
          <span>@{{ vlog.user.nickname }}</span>

          <span class="btn btn--primary">Vlog</span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { mapState } from 'vuex';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default {
  name: 'Tab1',
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonImg,
  },

  data() {
    return {};
  },

  created() {
    this.fetchLikedVlogs();
  },

  computed: {
    ...mapState('user', ['self', 'likedVlogs']),
  },

  methods: {
    async fetchLikedVlogs() {
      await this.$store.dispatch('user/fetchLikedVlogs');
    },
  },
};
</script>
