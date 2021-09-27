<template>
  <div class="upload-profile-image">
    <ion-img
      v-if="profileImageUri"
      :src="profileImageUri"
      class="uploaded"
    ></ion-img>
    <ion-img
      v-else
      :src="require('@/assets/images/placeholder4.png')"
      class="default"
    ></ion-img>
    <ion-icon :icon="pencil" @click="openCamera()"></ion-icon>
  </div>
</template>

<script>
import { IonIcon, IonImg } from '@ionic/vue';
import { pencil } from 'ionicons/icons';

import { Camera, CameraResultType } from '@capacitor/camera';

export default {
  name: 'UploadProfileImage',
  components: { IonIcon, IonImg },

  props: {
    profileImageUri: String,
  },

  data() {
    return {
      pencil,
      image: null,
    };
  },

  methods: {
    async openCamera() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
      });
      this.image = image;
      this.$emit('onImageChange', image);
    },
  },
};
</script>
