<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Корзина</a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Корзина</h1>
        <span class="content__info">{{ pluralForm }}</span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul v-if="products && products.length > 0" class="cart__list">
            <li v-for="product in products" :key="product.id">
              <CartItem :product="product"/>
            </li>
          </ul>
          <div v-else class="">Ваша корзина пуста...</div>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">Итого: <span>{{ totalPrice }} ₽</span></p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import { mapGetters } from 'vuex';
import plural from '@/helpers/plural';

export default {
  name: 'CartPage',
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailedProducts',
      totalPrice: 'cartTotalPrice',
      totalCount: 'cartTotalQuantity',
    }),
    pluralForm() {
      const countForm = plural(this.totalCount, {
        zero: 'товар',
        few: 'товара',
        many: 'товаров',
        other: 'товаров',
      });

      return `${this.totalCount} ${countForm}`;
    },
  },
};
</script>

<style scoped></style>
