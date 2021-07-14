<template>
  <ion-page>
    <ion-content :fullscreen="true" scroll-y="false" class="login">
      <div class="login__inner">
        <div class="login-form">
          <h1>Inloggen</h1>
          <ion-input placeholder="Email" v-model="email"></ion-input>
          <ion-input
            type="password"
            placeholder="Wachtwoord"
            v-model="password"
          >
          </ion-input>
          <ion-button @click="doLogin()">Inloggen</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonInput, IonButton } from '@ionic/vue';

export default {
  name: 'Login',
  components: { IonContent, IonPage, IonInput, IonButton },
  data() {
    return {
      email: '',
      password: '',
    };
  },

  created() {
    // if (this.$store.state.auth.token) {
    //   this.$router.push('/');
    // }
  },

  methods: {
    async doLogin() {
      let result = await this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      });

      if (result) {
        this.$router.push('/');
      }
    },
  },
};
</script>
