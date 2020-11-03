<!--  -->
<template>
<div class="tab-control">
  <div v-for="(item, index) in titles" :key="index" class="tab-control-item" :class="{ active: index === select }" @click="classClick(index)">
    <span>{{ item }}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      select: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default () {
        return [];
      },
    },
  },
  methods: {
    classClick(index) {
      this.select = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.active span {
  padding: 5px;
  border-bottom: 3px solid var(--color-tint);
}
</style>
