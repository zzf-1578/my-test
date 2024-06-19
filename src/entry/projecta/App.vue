<template>
  <div id="projecta">
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'projectaView',
  data() {
    return {
      //
    };
  },
};
</script>
