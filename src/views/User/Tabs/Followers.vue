<template>
  <div class="followers">
    <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <!-- @click="$router.replace(`/user/${request.user.id}`)" -->
    <div class="user-list requested" v-if="selectedUserRequested.length > 0">
      <div
        class="user-list__item"
        v-for="(request, index) in selectedUserRequested"
        :key="index"
      >
        <ion-img
          v-if="request.user.hasProfileImage"
          :src="request.user.profileImageUri"
        ></ion-img>
        <ion-img
          v-else
          :src="require('@/assets/images/placeholder4.png')"
          class="default"
        ></ion-img>
        <span>@{{ request.user.nickname }}</span>

        <div class="action">
          <ion-icon
            class="accept"
            @click="respondToRequest(request.user.id, 'accept')"
            :icon="checkmarkCircleOutline"
          ></ion-icon>
          <ion-icon
            class="decline"
            @click="respondToRequest(request.user.id, 'decline')"
            :icon="closeCircleOutline"
          ></ion-icon>
        </div>
      </div>
    </div>

    <div class="user-list" v-if="selectedUserFollowers.length > 0">
      <div
        class="user-list__item"
        v-for="(user, index) in selectedUserFollowers"
        :key="index"
        @click="$router.replace(`/user/${user.id}`)"
      >
        <ion-img
          v-if="user.hasProfileImage"
          :src="user.profileImageUri"
        ></ion-img>
        <ion-img
          v-else
          :src="require('@/assets/images/placeholder4.png')"
          class="default"
        ></ion-img>
        <span>@{{ user.nickname }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { IonRefresher, IonRefresherContent, IonImg, IonIcon } from '@ionic/vue';

import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';

export default {
  name: 'Followers',
  components: {
    IonRefresher,
    IonRefresherContent,
    IonImg,
    checkmarkCircleOutline,
    closeCircleOutline,
    IonIcon,
  },

  data() {
    return {
      checkmarkCircleOutline,
      closeCircleOutline,
    };
  },

  computed: {
    ...mapState('user', [
      'self',
      'selectedUserFollowers',
      'selectedUserRequested',
    ]),
  },

  methods: {
    async respondToRequest(id, value) {
      const response = await this.$store.dispatch('user/respondToRequest', {
        requestingUserId: id,
        status: value,
      });

      if (response) {
        this.refresh(null);
      }
    },

    async refresh(event) {
      var id;
      if (this.$route.params.id) {
        id = this.$route.params.id;
      } else {
        id = this.self.id;
      }

      await this.$store.dispatch('user/fetchSelectedUserFollowers', id);
      await this.$store.dispatch('user/fetchSelectedUserRequested');
      if (event) {
        event.target.complete();
      }
    },
  },
};
</script>
