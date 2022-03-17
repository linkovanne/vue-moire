<template>
  <div class="item__content" v-show="selected">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UiTab',
  props: ['selected'],
};
</script>

<style scoped>

</style>
