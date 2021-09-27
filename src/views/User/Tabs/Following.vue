<template>
  <div class="following">
    <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <div class="user-list" v-if="selectedUserFollowing.length > 0">
      <div
        class="user-list__item"
        v-for="(user, index) in selectedUserFollowing"
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
import { IonRefresher, IonRefresherContent, IonImg } from '@ionic/vue';

export default {
  name: 'Following',
  components: {
    IonRefresher,
    IonRefresherContent,
    IonImg,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState('user', ['self', 'selectedUserFollowing']),
  },

  methods: {
    async refresh(event) {
      console.log(event);

      var id;
      if (this.$route.params.id) {
        id = this.$route.params.id;
      } else {
        id = this.self.id;
      }

      await this.$store.dispatch('user/fetchSelectedUserFollowing', id);

      event.target.complete();
    },
  },
};
</script>
