const book = {
  state: {
    fileName: 'book111',
    menuVisible: false,
    settingVisible: -1, /* -1 hide */
    defaultFontSize: 16,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'Default',
    bookAvailable: false,
    progress: 0,
    section: 0,
    isPaginating: true,
    currentBook: null,
    navigation: null,
    cover: null,
    metadata: null,
    paginate: '',
    pagelist: null,
    offsetY: 0,
    isBookmark: null
    // speakingIconBottom: realPx(58)
  },
  mutations: {
    SET_FileName: (state, fileName) => {
      state.fileName = fileName
    },
    SET_MENUVISIBLE: (state, menuVisible) => {
      state.menuVisible = menuVisible
    },
    SET_SETTINGVISIBLE: (state, settingVisible) => {
      state.settingVisible = settingVisible
    },
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
    },
    SET_MENU_VISIBLE: (state, visible) => {
      state.menuVisible = visible
    },
    SET_SETTING_VISIBLE: (state, visible) => {
      state.settingVisible = visible
    },
    SET_DEFAULT_FONT_SIZE: (state, fontSize) => {
      state.defaultFontSize = fontSize
    },
    SET_DEFAULT_FONT_FAMILY: (state, font) => {
      state.defaultFontFamily = font
    },
    SET_FONT_FAMILY_VISIBLE: (state, visible) => {
      state.fontFamilyVisible = visible
    },
    SET_DEFAULT_THEME: (state, theme) => {
      state.defaultTheme = theme
    },
    SET_BOOK_AVAILABLE: (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    SET_PROGRESS: (state, progress) => {
      state.progress = progress
    },
    SET_SECTION: (state, section) => {
      state.section = section
    },
    SET_IS_PAGINATING: (state, isPaginating) => {
      state.isPaginating = isPaginating
    },
    SET_CURRENT_BOOK: (state, currentBook) => {
      state.currentBook = currentBook
    },
    SET_NAVIGATION: (state, navigation) => {
      state.navigation = navigation
    },
    SET_COVER: (state, cover) => {
      state.cover = cover
    },
    SET_METADATA: (state, metadata) => {
      state.metadata = metadata
    },
    SET_PAGINATE: (state, paginate) => {
      state.paginate = paginate
    },
    SET_PAGELIST: (state, pagelist) => {
      state.pagelist = pagelist
    },
    SET_OFFSETY: (state, offsetY) => {
      state.offsetY = offsetY
    },
    SET_IS_BOOKMARK: (state, isBookmark) => {
      state.isBookmark = isBookmark
    },
    SET_SPEAKING_ICON_BOTTOM: (state, speakingIconBottom) => {
      state.speakingIconBottom = speakingIconBottom
    }
  },
  actions: {
    setFileName: ({ commit, state }, fileName) => {
      commit('SET_FileName', fileName)
    },
    setMenuVisible: ({ commit }, menuVisible) => {
      return commit('SET_MENUVISIBLE', menuVisible)
    },
    setSettingVisible: ({ commit }, settingVisible) => {
      return commit('SET_SETTINGVISIBLE', settingVisible)
    },
    setFontFamilyVisible: ({ commit }, visible) => {
      return commit('SET_FONT_FAMILY_VISIBLE', visible)
    },
    setDefaultFontFamily: ({ commit }, font) => {
      return commit('SET_DEFAULT_FONT_FAMILY', font)
    },
    setDefaultFontSize: ({ commit }, defaultFontSize) => {
      return commit('SET_DEFAULT_FONT_SIZE', defaultFontSize)
    },
    setDefaultTheme: ({ commit }, theme) => {
      return commit('SET_DEFAULT_THEME', theme)
    },
    setBookAvailable: ({ commit }, bookAvailable) => {
      return commit('SET_BOOK_AVAILABLE', bookAvailable)
    },
    setProgress: ({ commit }, progress) => {
      return commit('SET_PROGRESS', progress)
    },
    setSection: ({ commit }, section) => {
      return commit('SET_SECTION', section)
    },
    setIsPaginating: ({ commit }, isPaginating) => {
      return commit('SET_IS_PAGINATING', isPaginating)
    },
    setCurrentBook: ({ commit }, book) => {
      return commit('SET_CURRENT_BOOK', book)
    },
    setNavigation: ({ commit }, navigation) => {
      return commit('SET_NAVIGATION', navigation)
    },
    setCover: ({ commit }, cover) => {
      return commit('SET_COVER', cover)
    },
    setMetadata: ({ commit }, metadata) => {
      return commit('SET_METADATA', metadata)
    },
    setPaginate: ({ commit }, paginate) => {
      return commit('SET_PAGINATE', paginate)
    },
    setPagelist: ({ commit }, pagelist) => {
      return commit('SET_PAGELIST', pagelist)
    },
    setIsBookmark ({ commit }, isBookmark) {
      return commit('SET_IS_BOOKMARK', isBookmark)
    },
    setOffsetY ({ commit }, offsetY) {
      return commit('SET_OFFSETY', offsetY)
    },
    setSpeakingIconBottom ({ commit }, speakingIconBottom) {
      commit('SET_SPEAKING_ICON_BOTTOM', speakingIconBottom)
    }
  }
}

export default book
