<template>
  <router-link :to="{name: 'cart'}" class="header__cart" aria-label="Корзина с товарами">
    <svg width="19" height="24">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ totalCount }}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartIndicator',
  computed: {
    ...mapGetters({
      totalCount: 'cartTotalQuantity',
    }),
  },
};
</script>

<style scoped></style>
