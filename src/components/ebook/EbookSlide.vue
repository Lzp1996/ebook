<template>
    <transition name="fade">
      <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
        <transition name="slide-right">
          <div class="content">
            <div class="content-page-wrapper" v-if="!bookAvailable">
              <div class="content-page">
                <component :is="currentTab === 1 ? content : mark"></component>
              </div>
              <div class="content-page-tab">
                <div class="content-page-tab-item"
                  :class="{'selected': currentTab === 1}"
                  @click="selectTab(1)">
                  {{$t('book.navigation')}}
                </div>
                <div class="content-page-tab-item"
                     :class="{'selected': currentTab === 2}"
                     @click="selectTab(2)">
                  {{$t('book.bookmark')}}
                </div>
              </div>
            </div>
            <div class="content-empty" v-else>
              <ebook-loading></ebook-loading>
            </div>
          </div>
        </transition>
        <div class="content-bg" @click="hideTitleAndMenu"></div>
      </div>
    </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import EbookSlideContents from './EbookSlideContents'
import EbookSlideBookmark from './EbookSlideBookmark'
import EbookLoading from './EbookLoading'

export default {
  name: 'EbookSlide',
  components: { EbookLoading },
  mixins: [ebookMixin],
  data () {
    return {
      currentTab: 1,
      content: EbookSlideContents,
      mark: EbookSlideBookmark
    }
  },
  methods: {
    selectTab (tab) {
      this.currentTab = tab
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .slide-content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 110;
    display: flex;
    width: 100%;
    height: 100%;
    .content{
      flex: 0 0 85%;
      width: 85%;
      height: 100%;
      background-color: #cccccc;
      .content-page-wrapper{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        .content-page{
          flex: 1;
          width: 100%;
          overflow: hidden;
        }
        .content-page-tab{
          display: flex;
          width: 100%;
          height: px2rem(48);
          background-color: yellow;
          .content-page-tab-item{
            flex: 1;
            font-size: px2rem(12);
            @include center;
            &.selected {
              color: red;
            }
          }
        }
      }
      .content-empty{
        @include center;
        width: 100%;
        height: 100%;
      }
    }
    .content-bg{
      flex: 0 0 15%;
      width: 15%;
      height: 100%;
      background-color: rgba(0,0,0,.5);
    }
  }
</style>
