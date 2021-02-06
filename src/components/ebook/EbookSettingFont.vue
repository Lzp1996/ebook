<template>
  <transition name="slide-up">
    <div class="setting-wrapper"  v-show="menuVisible && settingVisible === 0">
      <div class="setting-font-size" >
        <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
        <div class="select-wrapper">
          <div class="select" @click="setFontSize(item.fontSize)" v-for="(item, index) of fontSizeList" :key="index">
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="item.fontSize === defaultFontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length-1].fontSize + 'px'}">A</div>
      </div>
      <div class="setting-font-family">
        <div class="setting-font-family-text-wrapper">
          <div class="setting-font-family-text" @click="showFont">{{defaultFontFamily}}</div>
        </div>
        <div class="setting-font-family-icon-wrapper">
          <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { FONT_SIZE_LIST } from '../../utils/book'
import { saveFontSize } from '../../utils/localStorage'

export default {
  name: 'EbookSettingFont',
  mixins: [ebookMixin],
  data () {
    return {
      fontSizeList: FONT_SIZE_LIST
    }
  },
  methods: {
    setFontSize (fontsize) {
      this.setDefaultFontSize(fontsize)
      saveFontSize(this.fileName, fontsize)
      this.currentBook.rendition.themes.fontSize(fontsize + 'px')
    },
    showFont  () {
      this.setFontFamilyVisible(true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .setting-wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: px2rem(45);
    left: 0;
    width: 100%;
    height: px2rem(45);
    z-index: 100;
    background-color: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .2);
    .setting-font-size{
      display: flex;
      flex: 2;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center
      }
      .select-wrapper{
        flex: 1;
        display: flex;
        align-items: center;
        .select{
          display: flex;
          flex: 1;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line{
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid black;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            height: px2rem(3);
            border-left: px2rem(1) solid black;
            .point {
              position: absolute;
              top: - px2rem(7);
              left: - px2rem(8);
              width: px2rem(15);
              height: px2rem(15);
              border-radius: 50%;
              border: px2rem(1) solid black;
              background: white;
              @include center
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background: black;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
    .setting-font-family {
      flex: 1;
      display: flex;
      @include center;
      font-size: px2rem(14);
      color: gray;
      .setting-font-family-text-wrapper {
        @include center;
      }
      .setting-font-family-icon-wrapper{
        @include center;
      }
    }
  }

</style>
