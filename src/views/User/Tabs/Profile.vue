<template>
  <form class="profile" @submit.prevent="updateProfile()">
    <UploadProfileImage
      @onImageChange="handleImageChange"
      :profileImageUri="self.profileImageUri"
    ></UploadProfileImage>
    <div>
      <label>Date of birth</label>
      <ion-datetime
        placeholder="Choose Date"
        v-model="self.birthDate"
        displayFormat="YYYY-MM-DD"
      ></ion-datetime>
    </div>

    <label>Nickname</label>
    <ion-item>
      <ion-input
        placeholder="Nickname"
        required
        v-model="self.nickname"
      ></ion-input>
    </ion-item>

    <label>First name</label>
    <ion-item>
      <ion-input
        placeholder="first name"
        required
        v-model="self.firstName"
      ></ion-input>
    </ion-item>

    <label>Last name</label>
    <ion-item>
      <ion-input
        placeholder="Last name"
        required
        v-model="self.lastName"
      ></ion-input>
    </ion-item>

    <label>Gender</label>
    <ion-select
      v-model.number="self.gender"
      ok-text="Select"
      value="1"
      cancel-text="Cancel"
      placeholder="Test"
    >
      <ion-select-option
        v-for="(item, index) in genderOptions"
        :key="index"
        :value="item.value"
        >{{ item.text }}</ion-select-option
      >
    </ion-select>

    <label>Is profile private?</label>
    <ion-toggle v-model="self.isPrivate"></ion-toggle>

    <label>Daily vlog request limit</label>
    <ion-select
      v-model.number="self.dailyVlogRequestLimit"
      ok-text="Select"
      value="3"
      cancel-text="Cancel"
    >
      <ion-select-option
        v-for="(value, index) in limitOptions"
        :key="index"
        :value="value"
        >{{ value }}</ion-select-option
      >
    </ion-select>

    <label>Interest</label>
    <div>
      <ion-item>
        <ion-input
          placeholder="Enter an interest..."
          v-model="self.interest1"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          placeholder="Enter an interest..."
          v-model="self.interest2"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          placeholder="Enter an interest..."
          v-model="self.interest3"
        ></ion-input>
      </ion-item>
    </div>

    <span class="btn btn--primary" @click="logout()">UITLOGGEN</span>
    <button type="submit" class="btn btn--primary">Save</button>
  </form>
</template>

<script>
import {
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonItem,
  IonDatetime,
} from '@ionic/vue';

import { mapState } from 'vuex';

import UploadProfileImage from '@/components/UploadProfileImage.vue';
import { uploadFile } from '@/services/s3';

export default {
  name: 'Profile',
  components: {
    UploadProfileImage,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonItem,
    uploadFile,
    IonDatetime,
  },
  data() {
    return {
      genderOptions: [
        {
          value: 1,
          text: 'Man',
        },
        {
          value: 0,
          text: 'Female',
        },
        {
          value: 2,
          text: 'Other',
        },
      ],
      limitOptions: [0, 1, 2, 3],
    };
  },

  computed: {
    ...mapState('user', ['self']),
  },

  methods: {
    async logout() {
      let result = await this.$store.dispatch('auth/logout');

      if (result) {
        this.$router.push('/login');
      }
    },

    async updateProfile() {
      this.self.birthDate = this.self.birthDate.split('+')[0];
      await this.$store.dispatch('user/updateProfile', this.self);
    },

    async handleImageChange(image) {
      this.image = image;

      const base64Data = new Buffer.from(
        this.image.dataUrl.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );

      const params = {
        Bucket: process.env.VUE_APP_DO_BUCKET,
        Key: 'userprofileimages/' + this.self.id,
        ContentType: `image/${this.image.format}`,
        Body: base64Data,
      };

      await uploadFile(params);
    },
  },
};
</script>
