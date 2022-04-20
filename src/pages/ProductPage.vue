<template>
  <main class="content container">
    <div v-if="productData" class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">
            {{ productData.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">{{ productData.title }}</a>
        </li>
      </ul>
    </div>

    <section v-if="scene === 'loading'">Получение данных о товаре...</section>
    <section v-if="scene === 'error'">
      Не удалось получить данные о товаре...
      <button @click.prevent="getProductInfo()">Попробовать еще раз</button>
    </section>
    <section v-if="scene === 'empty'">Такой товар не найден...</section>
    <section v-if="scene === 'product'" class="item">
      <div class="item__pics pics">
        <div v-if="productImages && productImages.length > 0">
          <div class="pics__wrapper">
            <img width="570" height="570"
                 :src="productImages[selectedImg].file.url"
                 alt="Название товара">
          </div>
          <ul v-if="productImages && productImages.length > 0" class="pics__list">
            <li v-for="img in productImages" :key="img.id" class="pics__item">
              <!--<a class="pics__link pics__link&#45;&#45;current" href="#">-->
              <img width="98" height="98" :src="img.file.url" alt="">
              <!--</a>-->
            </li>
          </ul>
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productData.id }}</span>
        <h2 class="item__title">{{ productData.title }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <UiNumberInput v-model:productCount="productCount"/>

              <b class="item__price">{{ productTotalPrice }} ₽</b>
            </div>

            <div class="item__row">
              <fieldset v-if="productData.colors" class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li v-for="color in productData.colors" :key="color.id" class="colors__item">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item"
                             v-model="productColorId" :value="color.id">
                      <span class="colors__value" :style="{backgroundColor: color.color.code}">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset v-if="productData.sizes && productData.sizes.length > 0"
                        class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" v-model="productSize" type="text" name="category">
                    <option v-for="size in productData.sizes"
                            :key="size.id" :value="size.id">{{ size.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
            <div v-show="productAddScene === 'adding'"
                 class="item__add-scene">товар добавляется в корзину
            </div>
            <div v-show="productAddScene === 'error'"
                 class="item__add-scene">не удалось добавить товар
            </div>
            <div v-show="productAddScene === 'done'"
                 class="item__add-scene">товар добавлен в корзину
            </div>
          </form>
        </div>
      </div>

      <UiTabs>
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link" href="#"
               :class="{'tabs__link--current': selectedTab === 'info'}"
               @click.prevent="selectedTab = 'info'">Информация о товаре</a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"
               :class="{'tabs__link--current': selectedTab === 'delivery'}"
               @click.prevent="selectedTab = 'delivery'">Доставка и возврат</a>
          </li>
        </ul>

        <UiTab :selected="selectedTab === 'info'">
          <h3>Состав:</h3>
          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>
          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>
        </UiTab>

        <UiTab :selected="selectedTab === 'delivery'">
          <h3>Доставка:</h3>
          <p>
            1. Курьерская доставка по Москве и Московской области – 290 ₽<br>
            2.Самовывоз из магазина. Список и адреса магазинов Вы можете посмотреть здесь<br>
          </p>

          <h3>Возврат:</h3>
          <p>
            Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО.<br>
            Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране,
            в которой Вы осуществили покупку.
            БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br>
            Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов,
            позвоните по телефону 8 800 600 90 09<br>
          </p>
        </UiTab>
      </UiTabs>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';
import { mapActions } from 'vuex';
import UiNumberInput from '@/components/ui/UiNumberInput.vue';
import UiTabs from '@/components/ui/UiTabs.vue';
import UiTab from '@/components/ui/UiTab.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductPage',
  components: {
    UiNumberInput,
    UiTabs,
    UiTab,
  },
  data() {
    return {
      scene: 'loading',
      productAddScene: 'init',

      productCount: 1,
      productColorId: null,
      productSize: null,
      productData: null,

      selectedImg: 0,
      selectedTab: 'info',
    };
  },
  watch: {
    $route: {
      handler() {
        if (!this.$route.params.id) {
          return;
        }

        this.getProductInfo();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    getProductInfo() {
      this.scene = 'loading';

      // @todo use asy nc await
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productColorId = response.data.colors[0].id;
          this.productData = response.data;
          this.productSize = response.data.sizes[0].id;
          this.scene = response.data ? 'product' : 'empty';
        })
        .catch(() => {
          this.scene = 'error';
        });
    },
    addToCart() {
      this.productAddScene = 'adding';
      // eslint-disable-next-line max-len
      const colorId = this.productData.colors.filter((color) => color.id === this.productColorId)[0].color.id;

      if (!this.productData.id || !this.productCount || !this.productSize || !colorId) {
        this.productAddScene = 'error';
        return;
      }

      this.addProductToCart({
        productId: this.productData.id.toString(),
        quantity: this.productCount.toString(),
        sizeId: this.productSize.toString(),
        colorId: colorId.toString(),
      })
        // eslint-disable-next-line no-return-assign
        .then(() => this.productAddScene = 'done')
        // eslint-disable-next-line no-return-assign
        .catch(() => this.productAddScene = 'error');
    },
  },
  computed: {
    productImages() {
      console.log(this.productData.colors.filter((color) => color.id === this.productColorId));

      // eslint-disable-next-line max-len
      return this.productData.colors.filter((color) => color.id === this.productColorId)[0].gallery || [];
      // eslint-disable-next-line max-len
      // return this.productData.colors.filter((color) => color.id === this.productColorId)[0].gallery || [];
    },
    productTotalPrice() {
      return numberFormat(this.productCount * this.productData.price);
    },
  },
};
</script>

<style scoped>
.item__add-scene {
}
</style>
