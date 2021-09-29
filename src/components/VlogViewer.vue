<template>
  <swiper
    v-if="vlogs.length > 0"
    :slides-per-view="1"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    @afterInit="init()"
    virtual
  >
    <swiper-slide
      v-for="(vlogWrapper, index) in vlogs"
      :key="index"
      :virtualIndex="index"
      class="vlog"
    >
      <Vlog
        :ref="vlogWrapper.vlog.id"
        :vlogWrapper="vlogWrapper"
        @onVideoEnded="handleOnVideoEnded"
      ></Vlog>
    </swiper-slide>
  </swiper>
</template>

<script>
import Vlog from '@/components/Vlog.vue';
import { mapGetters } from 'vuex';

import { Swiper, SwiperSlide } from 'swiper/vue';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Virtual } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Virtual]);

import 'swiper/swiper.scss';

export default {
  name: 'VlogViewer',
  components: {
    Vlog,
    Swiper,
    SwiperSlide,
  },

  setup() {
    return {
      Virtual,
    };
  },

  data() {
    return {
      offset: 0,
      index: 0,
      loading: false,
      swiper: null,
    };
  },

  mounted() {},

  computed: {
    ...mapGetters('vlog', {
      vlogs: 'recommendedVlogs',
    }),
  },

  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
      console.log(this.swiper);
    },
    init() {
      // this.$refs.slides.$el.slideNext();
      // const vlogId = this.vlogs[0].vlog.id;
      // this.$refs[vlogId].$refs[vlogId].play();
    },

    handleOnVideoEnded() {
      this.swiper.slideNext();
    },

    onSlideChange(e) {
      const previousIndex = e.previousIndex;

      let previousVlogId = this.vlogs[previousIndex].vlog.id;
      this.$refs[previousVlogId].$refs[previousVlogId].pause();
      this.$refs[previousVlogId].$refs[previousVlogId].currentTime = 0;

      const activeIndex = e.activeIndex;

      let activeVlogId = this.vlogs[activeIndex].vlog.id;

      this.$refs[activeVlogId].$refs[activeVlogId].play();
      this.fetchNextVlogs(activeIndex);
    },

    fetchNextVlogs(currentIndex) {
      const length = this.vlogs.length;
      const limit = 5;

      // console.log('Current index: ' + currentIndex);
      // console.log('Length: ' + length);
      // console.log('Floor:' + Math.floor(length / 2));

      if (currentIndex - 1 == length - limit) {
        this.$store
          .dispatch('vlog/fetchRecommendedVlogs', {
            limit: limit,
            offset: length,
          })
          .then(() => {
            // this.loading = false;
            // this.$refs.slides.$el.update().then((d) => {
            //   console.log(d);
            // });
          });
      }
    },
  },
};
</script>
