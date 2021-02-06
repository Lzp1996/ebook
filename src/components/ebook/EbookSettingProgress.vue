<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">已阅读{{getReadtimeText()}}}分钟</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prevSection">
            <span class="icon-back" ></span>
          </div>
          <input
            type="range"
            class="progress"
            ref="progress"
            max="100"
            min="0"
            step="1"
            :disabled="!bookAvailable"
            :value="progress"
            @input="onChangeInput($event.target.value)"
            @change="onChangeProgress($event.target.value)"
          >
          <div class="progress-icon-wrapper"  @click="nextSection">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-seciton-text">{{getSectionName}}</span>
          <span>{{bookAvailable ? ' ('+progress+'%)' : '加載中。。。'}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'

export default {
  name: 'EbookSettingProgress',
  mixins: [ebookMixin],
  computed: {
    getSectionName () {
      // if (this.section) {
      //   const sectionInfo = this.currentBook.section(this.section)
      //   if (sectionInfo && sectionInfo.href && this.currentBook && this.currentBook.navigation) {
      //     return this.currentBook.navigation.get(sectionInfo.href).label
      //   }
      // }
      return this.section ? this.navigation[this.section].label : ''
    }
  },
  methods: {
    onChangeInput (progress) {
      this.setProgress(progress).then(() => {
        this.displayProgressBg()
      })
    },
    onChangeProgress (progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress()
        this.displayProgressBg()
        this.refreshLocation()
      })
    },
    prevSection () {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection()
        })
      }
    },
    nextSection () {
      if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection()
        })
      }
    },
    displaySection () {
      const sectionInfo = this.currentBook.section(this.section)
      this.currentBook.rendition.display(sectionInfo.href).then(() => {
        this.refreshLocation()
      })
    },
    displayProgress () {
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
      this.currentBook.rendition.display(cfi)
    },
    displayProgressBg () {
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .setting-wrapper {
    position: absolute;
    left: 0;
    bottom: px2rem(45);
    width: 100%;
    height: px2rem(70);
    background: white;
    box-shadow: 0 px2rem(-6) px2rem(6) rgba(0, 0, 0, .2);
    z-index: 101;
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: px2rem(30);
        font-size: px2rem(12);
        @include center;
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        @include center;
        .progress-icon-wrapper {
          font-size: px2rem(20);
        }
        .progress {
          width: 100%;
          height: px2rem(2);
          -webkit-appearance: none;
          background: -webkit-linear-gradient(#999,#999) no-repeat, #eee;
          background-size: 0 100%;
          margin: 0 px2rem(10);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: px2rem(15);
            height: px2rem(15);
            background-color: white;
            border-radius: 50%;
            border: px2rem(1) solid #eeeeee;
            box-shadow: 0 4px 4px 0 rgba(0, 0,0, .2);
          }
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(10);
        width: 100%;
        text-align: center;
        font-size: px2rem(12);
        @include center;
        .progress-seciton-text {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
</style>
