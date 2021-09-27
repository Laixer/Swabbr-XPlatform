<template>
  <ion-slides
    pager="false"
    ref="slides"
    @ionSlideDidChange="ionSlideDidChange"
    :options="slideOpts"
  >
    <template class="vlog" v-for="vlogWrapper in vlogs" :key="vlogWrapper.id">
      <Vlog
        :ref="vlogWrapper.vlog.id"
        :vlogWrapper="vlogWrapper"
        @onVideoEnded="handleOnVideoEnded"
      ></Vlog>
    </template>
  </ion-slides>
</template>

<script>
import { IonSlides } from '@ionic/vue';
import Vlog from '@/components/Vlog.vue';

export default {
  name: 'VlogViewer',
  components: { Vlog, IonSlides },

  props: {
    vlogs: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
      noSwiping: true,
      noSwipingClass: 'do_not_swipe',
    };
    return { slideOpts };
  },

  data() {
    return {
      offset: 0,
    };
  },

  mounted() {
    const vlogId = this.vlogs[0].vlog.id;
    this.$refs[vlogId].$refs[vlogId].play();
  },

  computed: {
    // testVlogs() {
    //   console.log(this.offset);
    //   console.log(this.vlogs.slice(this.offset, this.offset + 3));
    //   return this.vlogs.slice(this.offset, this.offset + 3);
    // },
  },

  methods: {
    handleOnVideoEnded() {
      this.$refs.slides.$el.slideNext();
    },

    ionSlideDidChange(e) {
      e.target.getPreviousIndex().then((i) => {
        const vlogId = this.vlogs[i].vlog.id;
        this.$refs[vlogId].$refs[vlogId].pause();
        this.$refs[vlogId].$refs[vlogId].currentTime = 0;
      });

      e.target.getActiveIndex().then((i) => {
        this.offset = i;
        const vlogId = this.vlogs[i].vlog.id;
        this.$refs[vlogId].$refs[vlogId].play();
      });

      e.target.update().then((e) => {
        console.log(e);
      });
    },
  },
};
</script>
