<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар"
            @click.prevent="changeProductCount(count-1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label>
      <input type="text" v-model.number="count" name="count">
    </label>

    <button type="button" aria-label="Добавить один товар"
            @click.prevent="changeProductCount(count+1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'UiNumberInput',
  props: ['productCount'],
  methods: {
    changeProductCount(productCount) {
      if (productCount < 1) {
        return;
      }

      this.$emit('update:productCount', productCount);
    },
  },
  computed: {
    count: {
      get() {
        return this.productCount;
      },
      set(value) {
        if (value < 1) {
          return;
        }

        this.$emit('update:productCount', value);
      },
    },
  },
};
</script>

<style scoped>

</style>
