<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info">{{ pluralForm }}</span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-model:price-from="filterPriceFrom"
        v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId"
        v-model:colors="filterColorIds"
        v-model:materials="filterMaterialIds"
        v-model:seasons="filterSeasonIds"
      />

      <section class="catalog">
        <div v-if="scene === 'loading'">Загрузка товаров...</div>
        <div v-if="scene === 'error'">
          При загрузке товаров произошла ошибка<br>
          <button @click.prevent="loadProducts()">Попробовать еще раз</button>
        </div>

        <div v-if="scene === 'empty'">Товары не найдены...</div>
        <template v-if="scene === 'list'">
          <ProductList :items="productList"/>

          <UiPagination
            v-model:page="page"
            :count="countProducts"
            :per-page="perPage"
          />
        </template>
      </section>
    </div>
  </main>
</template>

<script>
import ProductFilter from '@/components/ProductFilter.vue';
import ProductList from '@/components/ProductList.vue';
import UiPagination from '@/components/ui/UiPagination.vue';
import { mapActions, mapGetters } from 'vuex';
import plural from '@/helpers/plural';

export default {
  name: 'MainPage',
  components: {
    ProductFilter,
    ProductList,
    UiPagination,
  },
  data() {
    return {
      scene: 'loading',
      productsData: null,

      page: 1,
      perPage: 6,

      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterMaterialIds: [],
      filterSeasonIds: [],
      filterColorIds: [],
    };
  },
  created() {
    this.loadProducts();
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterSeasonIds() {
      this.loadProducts();
    },
    filterColorIds() {
      this.loadProducts();
    },
  },
  methods: {
    ...mapActions(['getProductList', 'getColors']),
    loadProducts() {
      this.scene = 'loading';
      clearTimeout(this.getProductsTimer);
      const params = {
        page: this.page,
        limit: this.perPage,
        categoryId: this.filterCategoryId,
        materialIds: [...this.filterMaterialIds],
        seasonIds: [...this.filterSeasonIds],
        colorIds: [...this.filterColorIds],
        minPrice: this.filterPriceFrom,
        maxPrice: this.filterPriceTo,
      };

      // @todo use async await
      this.getProductsTimer = setTimeout(() => {
        this.getProductList(JSON.stringify(params))
          .catch(() => {
            this.scene = 'error';
          })
          .then(() => {
            this.scene = this.productList.length > 0 ? 'list' : 'empty';
          });
      });
    },
  },
  computed: {
    ...mapGetters({
      productList: 'productListInfo',
      total: 'totalInfo',
    }),
    pluralForm() {
      const countForm = plural(this.total, {
        zero: 'товар',
        few: 'товара',
        many: 'товаров',
        other: 'товаров',
      });

      return `${this.total} ${countForm}`;
    },
    countProducts() {
      return this.total ?? 0;
    },
  },
};
</script>

<style scoped></style>
