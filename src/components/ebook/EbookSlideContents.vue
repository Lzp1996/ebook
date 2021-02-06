<template>
    <div class="ebook-slide-content">
      <div class="slide-content-search-wrapper">
        <div class="slide-content-search-input-wrapper">
          <div class="slide-content-search-icon">
            <span class="icon-search"></span>
          </div>
          <input type="text"
                 v-model="searchText"
                 class="slide-content-search-input"
                 @click="showSearchPage"
                 @keyup.enter.exact="search()"
                 :placeholder="$t('book.searchHint')">
        </div>
        <div class="slide-content-search-cancel"
             v-show="searchVisible"
             @click="hideSearchPage">
          {{$t('book.cancel')}}
        </div>
      </div>
      <div class="slide-content-book-wrapper" v-show="!searchVisible">
        <div class="slide-content-book-img-wrapper">
          <img :src="cover" class="slide-content-book-img" alt="">
        </div>
        <div class="slide-content-book-info-wrapper">
          <div class="slide-content-book-title">{{metadata.title ? metadata.title : ' '}}</div>
          <div class="slide-content-book-author">{{metadata.creator}}</div>
        </div>
        <div class="slide-content-book-progress-wrpper">
          <div class="slide-content-book-progress">
            <span class="progress">{{progress + '%'}}</span>
            <span class="progress-text">{{$t('book.haveRead2')}}</span>
          </div>
          <div class="slide-content-book-time">{{getReadtimeText()}}</div>
        </div>
      </div>
      <scroll class="slide-content-list"
              :top="156"
              :bottom="48"
              v-show="!searchVisible"
              ref="scroll">
        <div class="slide-content-item"
             v-for="(item, index) of navigation"
             :key="index">
          <span
            class="slide-content-item-label"
            :style="contentItemStyle(item)"
            :class="{'selected': section === index}"
            @click="displayNavigation(item.href)"
          >
            {{item.label}}</span>
          <span class="slide-content-item-page"></span>
        </div>
      </scroll>
      <scroll class="slide-search-list"
              :top="66"
              :bottom="48"
              v-show="searchVisible">
        <div class="slide-search-item"
             v-for="(item, index) of searchList"
             v-html="item.excerpt"
             @click="displayContent(item.cfi, true)"
             :key="index">
        </div>
      </scroll>
    </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Scroll from '../Scroll'
import { px2rem } from '../../utils/utils'

export default {
  name: 'EbookSlideContents',
  components: { Scroll },
  mixins: [ebookMixin],
  data () {
    return {
      searchVisible: false,
      searchList: null,
      searchText: ''
    }
  },
  methods: {
    displayNavigation (href) {
      this.display(href, () => {
        this.hideTitleAndMenu()
      })
    },
    displayContent (cfi, highlight = false) {
      this.display(cfi, () => {
        this.hideTitleAndMenu()
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(cfi)
        }
      })
    },
    search () {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(list => {
          this.searchList = list
          this.searchList.map(item => {
            item.excerpt = item.excerpt.replace(this.searchText, `<span style="{color: red}">${this.searchText}</span>`)
            return item
          })
        })
      }
    },
    doSearch (q) {
      if (this.currentBook && this.currentBook.spine) {
        return Promise.all(
          this.currentBook.spine.spineItems.map(
            item => item.load(this.currentBook.load.bind(this.currentBook)).then(item.find.bind(item, q)).finally(item.unload.bind(item)))
        ).then(results => Promise.resolve([].concat.apply([], results)))
      }
    },
    showSearchPage () {
      this.searchVisible = true
    },
    hideSearchPage () {
      this.searchVisible = false
      this.searchList = null
      this.searchText = ''
    },
    contentItemStyle (item) {
      return {
        marginLeft: `${px2rem(item.level) * 15}rem`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .ebook-slide-content {
    width: 100%;
    font-size: 0;
    .slide-content-search-wrapper{
      display: flex;
      width: 100%;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-content-search-input-wrapper{
        flex: 1;
        display: flex;
        @include center;
        .slide-content-search-icon{
          flex: 0 0 px2rem(28);
          font-size: px2rem(14);
          @include center;
        }
        .slide-content-search-input{
          flex: 1;
          width: 100%;
          height: px2rem(32);
          font-size: px2rem(14);
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
        }
      }
      .slide-content-search-cancel{
        flex: 0 0 px2rem(30);
        font-size: px2rem(15);
        @include right;
      }
    }
    .slide-content-book-wrapper{
      display: flex;
      width: 100%;
      height: px2rem(90);
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;
      .slide-content-book-img-wrapper {
        flex: 0 0 px2rem(45);
        padding: 0 px2rem(10);
        .slide-content-book-img{
          width: px2rem(45);
          height: px2rem(60);
        }
      }
      .slide-content-book-info-wrapper{
        flex: 1;
        .slide-content-book-title{
          width: px2rem(137.5);
          font-size: px2rem(14);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
        .slide-content-book-author{
          width: px2rem(137.5);
          font-size: px2rem(12);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          margin-top: px2rem(5);
        }
      }
      .slide-content-book-progress-wrpper{
        flex: 0 0 px2rem(70);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .slide-content-book-progress{
          .progress{
            font-size: px2rem(12);
          }
          .progress-text{
            font-size: px2rem(12);
          }
        }
        .slide-content-book-time{
          font-size: px2rem(12);
        }
      }
    }
    .slide-content-list{
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-content-item{
        display: flex;
        padding: px2rem(20) 0;
        box-sizing: border-box;
        .slide-content-item-label{
          flex: 1;
          font-size: px2rem(14);
          @include ellipsis;
          &.selected {
            color: red;
            font-weight: bold;
          }
        }
        .slide-content-item-page{}
      }
    }
    .slide-search-list {
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-search-item {
        padding: px2rem(20) 0;
        box-sizing: border-box;
        font-size: px2rem(14);
      }
    }
  }
</style>
