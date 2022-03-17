<template>
  <header class="header container">
    <div class="header__wrapper">
      <router-link :to="{name: 'main'}" class="header__info">Каталог</router-link>

      <a class="header__logo" href="#">
        <img src="img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire"
             width="116" height="34">
      </a>

      <a class="header__tel" href="tel:8 800 600 90 09">8 800 600 90 09</a>

      <CartIndicator />
    </div>
  </header>
</template>

<script>
import CartIndicator from '@/components/CartIndicator.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  components: {
    CartIndicator,
  },
};
</script>

<style scoped>

</style>
