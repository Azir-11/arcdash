import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Arcdash',
  description:
    'Business Function Library - Modern, Simple, Typed, and Powerful',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指引', link: '/guide/intro' },
      { text: 'Api', link: '/api/index' }
    ],

    sidebar: {
      '/guide': [
        {
          text: '开始',
          items: [
            { text: '简介', link: '/guide/intro' },
            { text: '快速上手', link: '/guide/quick-start' }
          ]
        }
      ],
      '/api': [
        {
          text: 'Array',
          items: [
            { text: 'joinValues', link: '/api/array/joinValues' },
            { text: 'sum', link: '/api/array/sum' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Azir-11/arcdash' }
    ]
  }
})
