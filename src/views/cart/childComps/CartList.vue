<!--  -->
<template>
  <div class="cart-list">
    <Scroll class="scroll" ref="scroll">
      <CartListItem
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"
      />
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/components/content/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 93px - 40px);
}

.scroll {
  height: 100%;
}
</style>
