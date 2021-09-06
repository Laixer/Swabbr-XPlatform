<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-slides pager="true" :options="slideOpts">
        <ion-slide>
          <h1>Slide 1</h1>
        </ion-slide>
        <ion-slide>
          <h1>Slide 2</h1>
        </ion-slide>
        <ion-slide>
          <h1>Slide 3</h1>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSlides,
  IonSlide,
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import axios from 'axios';

export default {
  name: 'Tab1',
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSlides,
    IonSlide,
  },

  setup() {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
      mode: 'ios',
    };
    return { slideOpts };
  },

  mounted() {
    // this.self();
    this.getVlogs();
  },

  methods: {
    // async self() {
    //   let result = await this.$store.dispatch('user/self');
    //   console.log(result);
    // },

    async getVlogs() {
      try {
        const response = await axios.get(
          `${axios.defaults.baseURL}/vlog/recomended`
        );
        if (response) {
          console.log(response.data);
          // this.userList = response.data;
        }
      } catch (error) {
        // this.dispatch('global/showToast', error.response.data);
      }

      console.log(this.userList);
    },
  },
};
</script>
