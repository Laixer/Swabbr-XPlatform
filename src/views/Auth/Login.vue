<template>
  <ion-page>
    <ion-content :fullscreen="true" scroll-y="false" class="login">
      <div class="login__logo">
        <img :src="require('@/assets/images/logo_round.png')" alt="" />
      </div>
      <form class="login__form">
        <ion-item>
          <ion-icon :icon="mail"></ion-icon>
          <ion-input placeholder="Email" v-model="email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-icon :icon="lockClosed"></ion-icon>
          <ion-input
            type="password"
            placeholder="Password"
            v-model="password"
          ></ion-input>
        </ion-item>

        <div class="actions">
          <a class="btn btn--primary" @click="doLogin()">Login</a>
          <router-link to="/register" class="btn btn--primary"
            >Register</router-link
          >
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonInput, IonItem, IonIcon } from '@ionic/vue';

import { mail, lockClosed } from 'ionicons/icons';

export default {
  name: 'Login',
  components: { IonContent, IonPage, IonInput, IonItem, IonIcon },
  data() {
    return {
      email: '',
      password: '',
      mail,
      lockClosed,
    };
  },

  created() {
    if (this.$store.state.auth.token) {
      this.$router.push('/');
    }
  },

  methods: {
    async doLogin() {
      if (this.email && this.password) {
        let result = await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
          handle: 'testtest',
          pushNotificationPlatform: 1,
        });

        if (result) {
          this.$router.push('/');
        }
      }
    },
  },
};
</script>
