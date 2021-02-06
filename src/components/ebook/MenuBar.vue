<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hideBox': settingVisible >= 0}" v-show="this.menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu icon" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon"  @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-add icon" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'
import EbookSlide from './EbookSlide'
export default {
  name: 'MenuBar',
  components: { EbookSlide, EbookSettingProgress, EbookSettingTheme, EbookSettingFontPopup, EbookSettingFont },
  mixins: [ebookMixin],
  data () {
    return {
      showTag: -1,
      isShowSetting: false,
      ifShowContent: false
    }
  },
  methods: {
    hideContent () {
      this.ifShowContent = false
    },
    onChangeInput (value) {
      this.progress = value
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    onProgressChange (progress) {
      this.$emit('onProgressChange', progress)
    },
    setTheme (index) {
      this.$emit('setTheme', index)
    },
    setFontSize (fontSize) {
      this.$emit('setFontSize', fontSize)
    },
    jumpTo (target) {
      this.$emit('jumpTo', target)
    },
    showSetting (tag) {
      this.setSettingVisible(tag)
      // this.showTag = tag
      // if (tag === 3) {
      //   this.isShowSetting = false
      //   this.ifShowContent = true
      // } else {
      //   this.isShowSetting = true
      // }
    },
    hideSettingShow () {
      this.isShowSetting = false
    }
  }
}
</script>

<style lang="scss" scoped>
 @import "../../assets/styles/global";
  .menu-bar {
    .menu-wrapper {
      position: absolute;
      bottom: - px2rem(1);
      left: 0;
      width: 100%;
      height: px2rem(46);
      background-color: white;
      z-index: 100;
      display: flex;
      justify-content: space-around;
      box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .2);
      &.hideBox {
        box-shadow: none;
      }
      .icon-wrapper {
        @include center
      }
    }
    .content-mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
      width: 100%;
      height: 100%;
      background-color: rgba(51,51,51,.8);
    }
  }
</style>
