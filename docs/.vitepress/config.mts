import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Arcdash',
  description:
    'Business Function Library - Modern, Simple, Typed, and Powerful',
  lastUpdated: true,
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
      { text: 'Api', link: '/api/array/joinValues' },
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
        {
          text: 'Array',
          collapsed: true,
          items: [
            { text: 'joinValues', link: '/api/array/joinValues' },
            { text: 'sum', link: '/api/array/sum' },
          ],
        },
        {
          text: 'Number',
          collapsed: false,
          items: [
            {
              text: '字节转换',
              collapsed: false,
              items: [
                { text: 'autoConvertBytes', link: '/api/number/byte/autoConvertBytes' },
                { text: 'convertBytes', link: '/api/number/byte/convertBytes' },
                { text: 'convertBytesTo', link: '/api/number/byte/convertBytesTo' },
              ],
            },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Azir-11/arcdash' },
    ],
  },
})
