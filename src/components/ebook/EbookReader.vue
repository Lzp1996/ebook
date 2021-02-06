<template>
    <div class="reader-wrapper">
      <div id="read"></div>
      <div class="ebook-read-mask"
           @touchmove="move"
           @touchend="moveEnd"
           @click="onMaskClick">
      </div>
    </div>
</template>

<script>
import Epub from 'epubjs'
import { ebookMixin } from '../../utils/mixin'
import { flatten, THEME_LIST } from '../../utils/book'
import { getFontSize, saveFontSize, getLocation } from '../../utils/localStorage'

global.epub = Epub
const DOWNLOAD_URL = '/static/2018_Book_AgileProcessesInSoftwareEngine.epub'
export default {
  name: 'EbookReader',
  mixins: [ebookMixin],
  data () {
    return {
      themeList: THEME_LIST
    }
  },
  methods: {
    move (e) {
      let offsetY = 0
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY
        this.setOffsetY(offsetY)
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY
      }
      e.preventDefault()
      e.stopPropagation()
    },
    moveEnd (e) {
      this.setOffsetY(0)
      this.firstOffsetY = null
    },
    onMaskClick (e) {
      const offsetX = e.offsetX
      const innerWidth = window.innerWidth
      if (offsetX > 0 && offsetX < innerWidth * 0.3) {
        this.prevPage()
      } else if (offsetX > 0 && offsetX > innerWidth * 0.7) {
        this.nextPage()
      } else {
        this.toggleTitleAndMenu()
      }
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
      }
      this.setMenuVisible(!this.menuVisible)
      this.setFontFamilyVisible(false)
    },
    initFontSize () {
      const fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.font(fontSize + 'px')
        this.setDefaultFontSize(fontSize)
      }
    },
    initTheme () {
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(this.defaultTheme)
    },
    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      const locations = getLocation(this.fileName)
      this.display(locations, () => {
        this.initFontSize()
        this.initTheme()
        this.refreshLocation()
      })
    },
    initGesture () {
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        event.preventDefault()
        event.stopPropagation()
      })
    },
    parseBook () {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
        })
        this.book.loaded.navigation.then(nav => {
          const navItem = flatten(nav.toc)
          function find (item, level = 0) {
            return !item.parent ? level : find(navItem.filter(nav => nav.id === item.parent)[0], ++level)
          }
          navItem.forEach(item => {
            item.level = find(item)
          })
          this.setNavigation(navItem)
        })
      })
    },
    initEpub () {
      // const url = this.fileName + '.epub'
      this.book = new Epub(DOWNLOAD_URL)
      this.setFileName('book')
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      this.parseBook()
      this.rendition.hooks.content.register(contents => {
        contents.addStylesheet()
      })
      this.book.ready.then(() => {
        return this.book.locations.generate(
          750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
          .then(location => {
            this.setBookAvailable(true)
            this.refreshLocation()
          })
      })
    }
  },
  mounted () {
    this.$store.dispatch('setFileName', this.$route.params.fileName)
      .then(() => {
        this.initEpub()
      })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .reader-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .ebook-read-mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 150;
      width: 100%;
      height: 100%;
    }
  }
</style>
