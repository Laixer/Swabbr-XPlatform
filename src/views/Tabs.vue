<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <!-- <ion-router-outlet></ion-router-outlet> -->
        <ion-tab-button tab="tab1" href="/home">
          <ion-icon :icon="homeSharp" />
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/search">
          <ion-icon :icon="search" />
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/loves">
          <ion-icon :icon="heart" />
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/user">
          <ion-icon :icon="person" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonPage,
  // IonRouterOutlet,
} from '@ionic/vue';
import { heart, search, homeSharp, person } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: {
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    // IonRouterOutlet,
  },
  setup() {
    return {
      heart,
      search,
      homeSharp,
      person,
    };
  },
};
</script>
