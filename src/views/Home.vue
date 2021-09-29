<template>
  <ion-page>
    <ion-content>
      <VlogViewer></VlogViewer>
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
  IonIcon,
} from '@ionic/vue';

// import { mapState } from 'vuex';

import VlogViewer from '@/components/VlogViewer.vue';

export default {
  name: 'Home',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSlides,
    IonSlide,
    IonIcon,
    VlogViewer,
  },

  data() {
    return {};
  },

  // computed: {
  //   ...mapState('vlog', ['recommendedVlogs']),
  // },

  mounted() {
    this.$store.dispatch('vlog/fetchRecommendedVlogs', {
      offset: 0,
      limit: 5,
    });
  },

  methods: {},
};
</script>
