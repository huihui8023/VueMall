/**
 * 混入对象
 * exprote const mixin= {function(){}}
 * mixins = [mixin]
 */

import BackTop from "@/components/content/backTop/BackTop.vue";

export const backTopMixin = {
    data() {
        return {
            isBackTopShow: false,
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.bsscroll.scrollTo(0, 0, 500);
        },
    }
}