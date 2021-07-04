<template>
  <div id="swiper">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <slot name="indicator"> </slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div
          v-for="(item, index) in slideCount"
          :key="index"
          class="indi-item"
          :class="{ active: index === currentIndex - 1 }"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    // 定时器时间
    interval: {
      type: Number,
      default: 2000,
    },
    // 动画效果时间
    animDuration: {
      type: Number,
      default: 300,
    },
    moveRatio: {
      type: Number,
      default: 0.25,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      slideCount: 0, //元素个数
      totalWidth: 0, //swiper的宽度
      swiperStyle: {}, //swiper样式
      currentIndex: 1, //当前的index
      scrolling: false, //是否滚动
    };
  },
  mounted: function () {
    setTimeout(() => {
      // 1.操作DOM 在前后添加slide
      this.handleDom();

      // 2.开启定时器
      this.startTimer();
    }, 100);
  },
  methods: {
    /**
     * 定时器操作
     */
    startTimer: function () {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },

    stopTimer: function () {
      window.clearInterval(this.playTimer);
    },

    /**
     * 滚动到正确位置
     *
     */
    scrollContent: function (currentPosition) {
      // 1.设置正在滚动
      this.scrolling = true;

      // 2.开始滚动动画
      this.swiperStyle.transition = "all 300ms";
      this.setTransform(currentPosition);

      // 3.判断滚动位置
      this.checkPosition();
      // 4.滚动完成
      this.scrolling = false;
    },

    /**
     * 校验正确的位置
     */

    checkPosition: function () {
      window.setTimeout(() => {
        // 无缝滚动
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
      }, this.animDuration);
    },
    /*
      设置滚动的位置
    */
    setTransform: function (position) {
      this.swiperStyle.transform = "translateX(" + position + "px)";
    },

    /**
     * 操作Dom元素
     */
    handleDom: function () {
      //  1.获取元素
      let swiperEl = document.querySelector(".swiper");
      let slideEls = swiperEl.querySelectorAll(".slide");

      // 2.保存个数
      this.slideCount = slideEls.length;

      // 3.如果大于1个，那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirstSlide = slideEls[0].cloneNode(true);
        let cloneLastSlide = slideEls[this.slideCount - 1].cloneNode(true);

        swiperEl.appendChild(cloneFirstSlide);
        swiperEl.insertBefore(cloneLastSlide, slideEls[0]);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;

        // 4.让swiper显示第一张 默认显示的是克隆的那张
        this.setTransform(-this.totalWidth);
      }
    },

    /**
     * 手指触碰
     */
    touchStart: function (event) {
      // 1.如果正在滚动 不可以拖动
      if (this.scrolling) {
        return;
      }

      // 2.停止定时器
      this.stopTimer();

      // 3.保存开始滚动的位置
      this.startX = event.touches[0].pageX;
    },

    /**
     * 手指移动
     */
    touchMove: function (event) {
      // 1 计算出用户拖动的距离
      this.currentX = event.touches[0].pageX;
      // 用户移动的距离
      this.distance = this.currentX - this.startX;
      //原来盒子的位置
      let currentPosition = -this.currentIndex * this.totalWidth;
      // 原来盒子的位置 + 移动的距离 = 需要移动的距离
      let moveDistance = currentPosition + this.distance;

      //2.设置当前位置
      this.setTransform(moveDistance);
    },

    /**
     * 手指离开 根据移动距离去判断是回弹还是播放上一张下一张
     */
    touchEnd: function (event) {
      let currentMove = Math.abs(this.distance);

      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        this.currentIndex++;
      }

      // 移动到正确位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 移动完成后重新开启定时器
      this.startTimer();
    },

    /**
     * 控制上一个 下一个
     */
    previous: function () {
      this.changeItem(-1);
    },

    next: function () {
      this.changeItem(1);
    },

    changeItem: function (num) {
      // 1.移除定时器
      this.stopTimer();

      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 3.添加定时器
      this.startTimer();
    },
  },
};
</script>

<style>
#swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>