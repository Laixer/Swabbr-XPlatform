<template>
  <div>
    <VlogViewer
      v-if="currentUserVlogs.length > 0"
      :vlogs="currentUserVlogs"
    ></VlogViewer>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import VlogViewer from '@/components/VlogViewer.vue';

export default {
  name: 'userVlog',
  components: {
    VlogViewer,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState('vlog', ['currentUserVlogs']),
  },

  mounted() {
    // this.$store.dispatch('vlog/FetchCurrentUserVlogs');
  },

  methods: {},
};
</script>
