<!--  -->
<template>
<div class="">
  <NavBar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" :key="index" class="title-item" :class="{ active: select === index }" @click="itemClick(index)">
        {{ item }}
      </div>
    </div>
  </NavBar>
</div>
</template>

<script>
import NavBar from "components/common/navbar/Navbar";

export default {
  name: "DEtailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      select: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.select = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back img {
  margin-top: 10px;
}
</style>
