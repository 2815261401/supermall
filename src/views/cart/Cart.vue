<!--  -->
<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </NavBar>
    <CartList />
    <cartBottonBar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/Navbar";
import CartList from "./childComps/CartList";
import cartBottonBar from "./childComps/cartBottonBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  data() {
    return {};
  },
  components: {
    NavBar,
    CartList,
    cartBottonBar,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: normal;
}
</style>
