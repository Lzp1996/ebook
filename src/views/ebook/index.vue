<template>
  <div class="ebook" ref="ebook">
    <title-bar></title-bar>
    <ebook-reader></ebook-reader>
    <menu-bar></menu-bar>
    <ebook-bookmark></ebook-bookmark>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import TitleBar from '../../components/ebook/TitleBar'
import MenuBar from '../../components/ebook/MenuBar'
import { ebookMixin } from '../../utils/mixin'
import { getReadTime, saveReadTime } from '../../utils/localStorage'
import EbookBookmark from '../../components/ebook/EbookBookmark'
export default {
  name: 'index',
  mixins: [ebookMixin],
  components: { EbookBookmark, MenuBar, TitleBar, EbookReader },
  methods: {
    startLoopReadTime () {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    },
    move (v) {
      this.$refs.ebook.style.top = v + 'px'
    },
    restore () {
      this.$refs.ebook.style.top = 0
      this.$refs.ebook.style.transition = 'all .2s linear'
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    }
  },
  watch: {
    offsetY (v) {
      if (!this.menuVisible && this.bookAvailable) {
        if (v > 0) {
          this.move(v)
        } else if (v === 0) {
          this.restore()
        }
      }
    }
  },
  mounted () {
    this.startLoopReadTime()
  },
  beforeDestroy () {
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .ebook {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
