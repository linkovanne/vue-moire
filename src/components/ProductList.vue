<template>
  <ul class="catalog__list">
    <li v-for="item of items" :key="item.id" class="catalog__item">
      <ProductCard :item="item"/>
    </li>
  </ul>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  props: ['items'],
};
</script>

<style scoped>

</style>
