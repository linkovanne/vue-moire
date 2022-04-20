<template>
  <div class="cart__item product">
    <div class="product__pic">
      <img :src="product.color.gallery[0].file.url"
           width="120" height="120" :alt="product.product.title">
    </div>
    <h3 class="product__title">{{ product.product.title }}</h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{backgroundColor: product.color.color.code}"></i>
        {{ product.color.color.title }}
      </span>
    </p>
    <span class="product__code">Артикул: {{ product.id }}</span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <label>
        <input type="text" value="1" name="count">
      </label>

      <button type="button" aria-label="Добавить один товар">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">{{ product.price }} ₽</b>

    <button class="product__del button-del" type="button"
            aria-label="Удалить товар из корзины"
            @click.prevent="deleteItem(product.product.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CartItem',
  props: ['product'],
  methods: {
    ...mapActions(['deleteProductFromCart']),
    deleteItem(basketItemId) {
      this.deleteProductFromCart(basketItemId);
    },
  },
};
</script>

<style scoped>

</style>
