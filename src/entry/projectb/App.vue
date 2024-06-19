<template>
  <div id="projectb">
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'projectbView',
  data() {
    return {
      //
    };
  },
};
</script>
