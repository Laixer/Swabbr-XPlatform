<template>
  <ion-page>
    <ion-content :fullscreen="true" scroll-y="false" class="register">
      <UploadProfileImage
        @onImageChange="handleImageChange"
      ></UploadProfileImage>
      <form class="register__form">
        <ion-item>
          <ion-icon :icon="person"></ion-icon>
          <ion-input placeholder="Nickname" v-model="nickname"></ion-input>
        </ion-item>

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

        <ion-item>
          <ion-input
            type="password"
            placeholder="Confirm password"
            v-model="repeatPassword"
          ></ion-input>
        </ion-item>

        <div class="actions">
          <a class="btn btn--primary" @click="validateFields()">Register</a>
        </div>

        <a class="btn btn--primary" @click="upload()">Hoi Joel</a>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonIcon,
  IonImg,
} from '@ionic/vue';

import { person, mail, lockClosed } from 'ionicons/icons';
import AWS from 'aws-sdk';

import UploadProfileImage from '@/components/UploadProfileImage.vue';

export default {
  name: 'Register',
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonItem,
    IonIcon,
    IonImg,
    UploadProfileImage,
  },
  data() {
    return {
      nickname: '',
      email: '',
      password: '',
      repeatPassword: '',
      person,
      mail,
      lockClosed,
      image: null,
    };
  },

  methods: {
    async doRegister() {
      let resultRegister = await this.$store.dispatch('auth/register', {
        nickname: this.nickname,
        email: this.email,
        password: this.password,
      });

      if (resultRegister) {
        let user = await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
          handle: 'testtest',
          pushNotificationPlatform: 1,
        });

        if (this.image && user) {
          this.uploadImage(user);
        }

        if (user) {
          this.$router.push('/');
        }
      }
    },

    handleImageChange(image) {
      this.image = image;
    },

    async uploadImage(user) {
      const spacesEndpoint = new AWS.Endpoint(
        process.env.VUE_APP_DO_SERVICE_URI
      );

      const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: process.env.VUE_APP_DO_ACCESS_KEY,
        secretAccessKey: process.env.VUE_APP_DO_SECRET_KEY,
      });

      const base64Data = new Buffer.from(
        this.image.dataUrl.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );

      const params = {
        Bucket: process.env.VUE_APP_DO_BUCKET,
        Key: 'userprofileimages/' + user.id,
        ContentType: `image/${this.image.format}`,
        Body: base64Data,
      };

      try {
        await s3.putObject(params).promise();
      } catch (err) {
        console.log('fetch failed', err);
      }
    },

    validateFields() {
      let error = null;

      if (!this.email || !this.nickname || !this.password) {
        error = 'Not all fields are filled in.';
      } else if (this.password !== this.repeatPassword) {
        error = "Passwords don't match.";
      } else if (this.password.length < 8) {
        error = 'Password must consist of at least 8 characters.';
      }

      if (!error) {
        this.doRegister();
      } else {
        this.$store.dispatch('global/showToast', error);
      }
    },
  },
};
</script>
