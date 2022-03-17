<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit()">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" v-model.number="currentPriceFrom" type="text" name="min-price">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" v-model.number="currentPriceTo" name="max-price">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" v-model="currentCategoryId" name="category">
            <option :value="0">Все категории</option>
            <option v-for="category in categoryData"
                    :key="category.id" :value="category.id">{{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="check-list">
          <ul class="colors colors--black">
            <li v-for="color in colorsData" :key="color.id" class="colors__item">
              <label class="colors__label">
                <input class="colors__radio sr-only"
                       type="checkbox" name="color-1" v-model="currentColor" :value="color.id"
                       checked="">
                <span class="colors__value" :style="{backgroundColor: color.code}"></span>
              </label>
            </li>
          </ul>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li v-for="material in materialData" :key="material.id" class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="material"
                     v-model="currentMaterials" :value="material.id">
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li v-for="season in seasonData" :key="season.id" class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="collection"
                     v-model="currentSeasons" :value="season.id">
              <span class="check-list__desc">
                    {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">Применить</button>
      <button class="filter__reset button button--second"
              type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  name: 'ProductFilter',
  props: ['priceFrom', 'priceTo', 'categoryId', 'colors', 'materials', 'seasons'],
  data() {
    return {
      categoryData: [],
      colorsData: [],
      materialData: [],
      seasonData: [],

      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: [],
      currentMaterials: [],
      currentSeasons: [],
    };
  },
  created() {
    this.getColors();
    this.getMaterials();
    this.getSeasons();
    this.getCategories();
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colors(value) {
      this.currentColor.push(value);
    },
    materials(value) {
      this.currentMaterials.push(value);
    },
    seasons(value) {
      this.currentSeasons.push(value);
    },
  },
  methods: {
    getColors() {
      // @todo use async await
      axios
        .get(`${API_BASE_URL}/api/colors`)
        .then((response) => {
          this.colorsData = response.data.items;
        });
    },
    getMaterials() {
      // @todo use async await
      axios
        .get(`${API_BASE_URL}/api/materials`)
        .then((response) => {
          this.materialData = response.data.items;
        });
    },
    getSeasons() {
      // @todo use async await
      axios
        .get(`${API_BASE_URL}/api/seasons`)
        .then((response) => {
          this.seasonData = response.data.items;
        });
    },
    getCategories() {
      // @todo use async await
      axios
        .get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => {
          this.categoryData = response.data.items;
        });
    },
    submit() {
      // priceFrom', 'priceTo', 'categoryId', 'colors', 'materials', 'seasons
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colors', this.currentColor);
      this.$emit('update:materials', this.currentMaterials);
      this.$emit('update:seasons', this.currentSeasons);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:color', null);
      this.$emit('update:materials', []);
      this.$emit('update:seasons', []);
    },
  },
};
</script>

<style scoped>

</style>
