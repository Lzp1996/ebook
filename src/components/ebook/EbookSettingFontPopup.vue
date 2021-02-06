<template>
  <transition name="ff-silde-up">
    <div class="ebook-setting-font-list-wrapper" v-show="fontFamilyVisible">
      <div class="ebook-setting-font-title">
        <div class="ebook-setting-font-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <div class="ebook-setting-font-title-text">
          {{$t('book.selectFont')}}
        </div>
      </div>
      <div class="ebook-setting-font-list">
        <div class="ebook-setting-font-item"
             v-for="(item,index) of fontFamilyList"
             :key="index"
             @click="setFontFamily(item.font)"
        >
          <div class="ebook-setting-font-text" :class="{'selected': item.font === defaultFontFamily}">{{item.font}}</div>
          <div class="ebook-setting-font-icon" v-show="item.font === defaultFontFamily">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { FONT_FAMILY } from '../../utils/book'
// import { saveFontFamily } from '../../utils/localStorage'

export default {
  name: 'EbookSettingFontPopup',
  mixins: [ebookMixin],
  data () {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  methods: {
    setFontFamily (font) {
      // saveFontFamily(this.fileName, font)
      this.setDefaultFontFamily(font)
    },
    hide () {
      this.setFontFamilyVisible(false)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .ebook-setting-font-list-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    background: white;
    border-bottom: 1px solid #eee;
    box-shadow: 0 px2rem(-6) px2rem(6) rgba(0, 0,0, .2);
    .ebook-setting-font-title {
      position: relative;
      padding: px2rem(15);
      box-sizing: border-box;
      text-align: center;
      .ebook-setting-font-title-icon {
        position: absolute;
        top: 0;
        left: px2rem(10);
        font-size: px2rem(25);
        height: 100%;
        @include center
      }
      .ebook-setting-font-title-text {
        font-size: px2rem(16);
        font-weight: bold;
      }
    }
    .ebook-setting-font-list {
      .ebook-setting-font-item {
        display: flex;
        padding: px2rem(10);
        border-bottom: 1px solid #eeeeee;
        .ebook-setting-font-text {
          flex: 1;
          text-align: left;
          font-size: px2rem(16);
          &.selected {
            color: slateblue;
            font-weight: bold;
          }
        }
        .ebook-setting-font-icon {
          flex: 1;
          text-align: right;
          font-size: px2rem(14);
          color: slateblue;
          font-weight: bold;
        }
      }
    }
  }
</style>
