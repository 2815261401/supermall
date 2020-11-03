<!--  -->
<template>
<div class="wrapper" ref="wrapper">
  <div ref="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
      aheight: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    wrapperHeight() {
      return document.documentElement.clientHeight - this.height + "px";
    },
    contentHeight() {
      return this.aheight + "px";
    },
  },
  methods: {
    refresh() {
      this.scroll.refresh();
    },
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", (position) => {
        this.$emit("pullingUp");
      });
    }
  },
  watch: {
    aheight(newData, oidData) {
      console.log(newData, oidData);
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  overflow: hidden;
}

.content {}
</style>
