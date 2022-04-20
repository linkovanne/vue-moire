<template>
  <div>
    <router-link :to="{name: 'product', params: {id: item.id}}" class="catalog__pic">
      <img v-if="item.colors[0].gallery"
           :src="item.colors[0].gallery[0].file.url"
           :alt="item.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: item.id}}">{{ item.title }}</router-link>
    </h3>

    <span class="catalog__price">{{ item.price }} ₽</span>

    <ul class="colors colors--black">
      <li v-for="color in item.colors" :key="color.id" class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only"
                 type="radio" name="color-1" :value="color.color.code"
                 checked="">
          <span class="colors__value" :style="{backgroundColor: color.color.code}"></span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['item'],
};
</script>

<style scoped>

</style>
