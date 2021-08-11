<template>
  <ion-page>
    <ion-content :fullscreen="true">
      Home
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
  },

  mounted() {
    // this.self();
  },

  methods: {
    // async self() {
    //   let result = await this.$store.dispatch('user/self');
    //   console.log(result);
    // },
  },
};
</script>
