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
            { text: '拼接字符串', link: '/api/array/joinValues' },
            { text: '求和', link: '/api/array/sum' },
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
                { text: '自动转换大小', link: '/api/number/byte/autoConvertBytes' },
                { text: '从某单位转换至目标单位', link: '/api/number/byte/convertBytes' },
                { text: '转换至目标单位', link: '/api/number/byte/convertBytesTo' },
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
