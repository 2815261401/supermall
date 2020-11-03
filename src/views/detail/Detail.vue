<template>
  <div id="detail">
    <DEtailNavBar @titleClick="titleClick" ref="DEtailNavBar" />
    <scroll
      class="detail_wrapper"
      ref="Scroll"
      :probeType="3"
      @scroll="scrollPosition"
    >
      <DetailSwiper :topImages="topImg" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailGoodsInfo :detailInfo="detailInfo" @itemimgLoad="imgLoad" />
      <detail-params :param-info="itemParams" ref="params" />
      <DetailComment :comment="comment" ref="comment" />
      <GoodsList :goods="recommends" ref="recommends" />
    </scroll>
    <DetailBottomBar @addToCart="addToCart" />
    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DEtailNavBar from "./childComps/DEtailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParams from "./childComps/DetailParams.vue";
import DetailComment from "./childComps/DetailComment";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

import { itemListenerMixin } from "@/common/mixin";

import Scroll from "@/components/content/scroll/Scroll";

import { debounce } from "@/common/utils";

import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";

export default {
  name: "Detail",
  components: {
    DEtailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailComment,
    GoodsList,
    DetailBottomBar,
    Scroll,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImg: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      comment: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      canClick: false,
      currentIndex: 0,
    };
  },
  methods: {
    ...mapActions(["addCart"]),
    imgLoad(boolean) {
      this.canClick = boolean;
      this.getThemeTopY();
    },
    titleClick(index) {
      if (this.canClick) {
        this.$refs.Scroll.scrollTo(0, -this.themeTopYs[index], 200);
      }
    },
    scrollPosition(position) {
      const positionY = -position.y;
      for (let i in this.themeTopYs) {
        if (
          this.currentIndex != i &&
          positionY > this.themeTopYs[parseInt(i)] &&
          (positionY < this.themeTopYs[parseInt(i) + 1] ||
            this.themeTopYs[parseInt(i) + 1] == undefined)
        ) {
          this.currentIndex = parseInt(i);
          this.$refs.DEtailNavBar.select = this.currentIndex;
        }
      }
    },
    addToCart() {
      const product = {};
      product.image = this.topImg[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      this.addCart(product).then((res) => {
        this.$toast.show(res, 2000);
        // console.log(this.$toast);
      });
    },
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImg = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.itemParams = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate != 0) {
        this.comment = data.rate.list[0];
      }
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 23);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 3);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44);
      });
    }, 200);
  },
  mounted() {
    // const refresh = debounce(this.$refs.Scroll.refresh, 200);
    // this.$bus.$off("ImgLoad").$on("ImgLoad", () => {
    //   refresh();
    // });
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail_wrapper {
  height: calc(100% - 102px);
}
</style>
