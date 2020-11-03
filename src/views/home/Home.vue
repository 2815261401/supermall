<!--  -->
<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabcontrol"
      :class="{ fixed: isTabFixed }"
      v-show="isTabFixed"
    />
    <Scroll
      :probeType="3"
      class="content"
      ref="Scroll"
      @scroll="scrollPosition"
      @pullingUp="loadMore"
      :pullUpLoad="true"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <recommend-view :recommend="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabcontrol"
      />
      <goods-list :goods="goods[defalutSelect].list" />
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/Navbar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/content/scroll/Scroll";
import { itemListenerMixin } from "@/common/mixin";

import { debounce } from "@/common/utils";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import { getHomeMultidata, getHomeGoods } from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
      defalutSelect: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  mixins: [itemListenerMixin],
  methods: {
    // 组件传递
    tabClick(index) {
      switch (index) {
        case 0:
          this.defalutSelect = "pop";
          break;
        case 1:
          this.defalutSelect = "new";
          break;
        case 2:
          this.defalutSelect = "sell";
          break;
      }
      this.$refs.Scroll.scrollTo(0, -this.$refs.tabcontrol.$el.offsetTop, 300);
    },
    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.Scroll.finishPullUp();
      });
    },
    scrollPosition(position) {
      this.isShowBackTop = -position.y > 1000;
      this.isTabFixed = -position.y > this.tabOffsetTop - 44;
    },
    loadMore() {
      this.getHomeGoods(this.defalutSelect);
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabcontrol.$el.offsetTop;
    },
  },
  activated() {
    this.$refs.Scroll.scrollTo(0, this.saveY, 0);
    this.$refs.Scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.Scroll.getScrollY();
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  padding-top: 44px;
  padding-bottom: 50px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
}

.fixed {
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 9;
}
</style>
