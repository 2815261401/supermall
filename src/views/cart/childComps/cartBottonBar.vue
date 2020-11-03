<template>
  <div class="bottom-bar">
    <div class="check-count">
      <CheckButton
        class="check-butten"
        :isCheck="isSelectAll"
        @click.native="selectAll"
      />
      <span>全选</span>
    </div>
    <div class="totalPrice">合计:{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "cartBottonBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "¥" +
        this.$store.state.cartList
          .filter((item) => item.checked)
          .reduce((preValue, item) => preValue + item.price * item.count, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    selectAll() {
      const isSelectAll = !this.isSelectAll;
      this.$store.state.cartList.forEach(
        (item) => (item.checked = isSelectAll)
      );
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}

.check-count {
  width: 80px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
}
.totalPrice {
  flex: 1;
}
.check-butten {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.calculate {
  width: 90px;
  color: #ccc;
  text-align: center;
  background-color: red;
}
</style>
