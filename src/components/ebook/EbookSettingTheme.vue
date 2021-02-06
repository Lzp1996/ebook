<template>
  <transition name="slide-up">
    <div class="setting-wrapper"  v-show="menuVisible && settingVisible === 1 ">
      <div class="setting-theme" >
        <div class="setting-theme-item"  v-for="(item,index) of themeList"  @click="setTheme(index)" :key="index">
          <div class="preview"
               :class="{'white-border': item.name === defaultTheme}"
               :style="{background: item.style.body.background}"></div>
          <div class="text" :class="{'select': item.name === defaultTheme}">{{item.name}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { THEME_LIST } from '../../utils/book'
export default {
  name: 'EbookSettingTheme',
  mixins: [ebookMixin],
  data () {
    return {
      themeList: THEME_LIST
    }
  },
  methods: {
    setTheme (index) {
      const theme = this.themeList[index]
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(45);
    left: 0;
    width: 100%;
    height: px2rem(90);
    z-index: 101;
    background-color: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .2);
    .setting-theme {
      display: flex;
      height: 100%;
      .setting-theme-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          &.white-border {
            border: px2rem(1) solid black;
          }
        }
        .text {
          flex: 0 0 px2rem(20);
          font-size: px2rem(5);
          color: gray;
          @include center;
          &.select {
            color: red;
          }
        }
      }
    }
  }
</style>
