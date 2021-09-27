<template>
  <ion-page>
    <ion-header>
      <ion-item>
        <ion-icon :icon="searchOutline"></ion-icon>
        <ion-input v-model="searchInput" placeholder="Search users"></ion-input>
      </ion-item>
    </ion-header>
    <ion-content class="search">
      <div class="user-list" v-if="userList.length > 0">
        <div
          class="user-list__item"
          v-for="(user, index) in userList"
          :key="index"
          @click="$router.push(`/user/${user.user.id}`)"
        >
          <ion-img
            v-if="user.user.hasProfileImage"
            :src="user.user.profileImageUri"
          ></ion-img>
          <ion-img
            v-else
            :src="require('@/assets/images/placeholder4.png')"
            class="default"
          ></ion-img>
          <span>@{{ user.user.nickname }}</span>
          <span
            class="btn btn--primary"
            @click="changeFollowRequestStatus(user, true)"
            v-if="user.followRequestStatus == null"
            >Follow</span
          >
          <span
            class="btn btn--primary"
            @click="changeFollowRequestStatus(user, false)"
            v-if="user.followRequestStatus == 0"
            >Requested</span
          >
          <span
            class="btn btn--primary"
            @click="changeFollowRequestStatus(user, false)"
            v-if="user.followRequestStatus == 1"
            >Following</span
          >
        </div>
      </div>
      <div v-else-if="userList.length == 0 && searchInput != ''">
        No results
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import _ from 'lodash';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonImg,
} from '@ionic/vue';
import axios from 'axios';
import { searchOutline } from 'ionicons/icons';

export default {
  name: 'Search',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonIcon,
    IonInput,
    IonItem,
    IonImg,
  },
  data() {
    return {
      searchInput: '',
      searchOutline,
      userList: {},
    };
  },

  created() {
    this.debouncedSearch = _.debounce(this.search, 500);
  },

  watch: {
    searchInput: function() {
      this.debouncedSearch();
    },
  },

  methods: {
    async search() {
      try {
        const response = await axios.get(
          `${axios.defaults.baseURL}/user/search?SortingOrder=2&Query=` +
            this.searchInput
        );
        if (response) {
          console.log(response.data);
          this.userList = response.data;
        }
      } catch (error) {
        this.dispatch('global/showToast', error.response.data);
      }
    },

    async changeFollowRequestStatus(user, newStatus) {
      let uri = 'followrequest';

      if (!newStatus) {
        uri = uri + '/unfollow';
      }

      try {
        const response = await axios.post(
          `${axios.defaults.baseURL}/${uri}?receiverId=${user.user.id}`
        );
        if (response) {
          if (newStatus) {
            user.followRequestStatus = 0;
          } else {
            user.followRequestStatus = null;
          }
        }
      } catch (error) {
        //
      }
    },
  },
};
</script>
