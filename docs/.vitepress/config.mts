import { getRecords } from 'func2md'
import { defineConfig } from 'vitepress'

const pages = getRecords()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Arcdash',
  description:
    'Modern JS/TS tool library',
  lastUpdated: true,
  head: [
    ['meta', { name: 'author', content: 'Azir-11' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'arcdash, azir, JavaScript function library, function library',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
      },
    ],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/Azir-11/arcdash/tree/main/docs/:path',
      text: '编辑当前页面',
    },
    search: {
      provider: 'local',
    },
    nav: [
      { text: '指引', link: '/guide/intro' },
      { text: 'Api', link: '/api/formatArrayToString' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          collapsed: true,
          items: [
            { text: '简介', link: '/guide/intro' },
            { text: '快速上手', link: '/guide/quick-start' },
          ],
        },
      ],
      '/api/': [
        ...pages,
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Azir-11/arcdash' },
    ],
  },
})
