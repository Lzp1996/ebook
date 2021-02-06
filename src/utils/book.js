import { getReadTime } from './localStorage'

export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 }
]

export function flatten (array) {
  return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
}

export function getReadTimeByMinute (fileName) {
  const readTime = getReadTime(fileName)
  if (!readTime) {
    return 0
  } else {
    return Math.ceil(readTime / 60)
  }
}

export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' }
]

export const THEME_LIST = [
  {
    name: 'Default',
    style: {
      body: {
        color: '#000', background: '#fff'
      }
    }
  },
  {
    name: 'eye',
    style: {
      body: {
        color: '#000', background: '#ceeaba'
      }
    }
  },
  {
    name: 'night',
    style: {
      body: {
        color: '#fff', background: '#000'
      }
    }
  },
  {
    name: 'gold',
    style: {
      body: {
        color: '#000', background: 'yellow'
      }
    }
  }
]

export function addCss (href) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
}

export function removeCss (href) {
  const links = document.getElementsByTagName('link')
  for (let i = links.length - 1; i >= 0; i--) {
    const link = links[i]
    if (link && link.getAttribute('href') && link.href === href) {
      link.parentNode.removeChild(link)
    }
  }
}

export function removeAllCss () {
}
