import { debounce } from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      isShowBackTop: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    backClick() {
      this.$refs.Scroll.scrollTo(0, 0, 500);
    },
    scrollPosition(position) {
      this.isShowBackTop = -position.y > 1000;
    },
  },
  mounted() {
    const refresh = debounce(this.$refs.Scroll.refresh, 200);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$off("itemImgLoad").$on("itemImgLoad", this.itemImgListener);
  },
}