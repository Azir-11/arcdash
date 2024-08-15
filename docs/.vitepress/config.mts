import { defineConfig } from 'vitepress'
import {arrayContains, arrayUnique, isNil} from "../../src";

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
      { text: 'Api', link: '/api/lang/array/isArray' },
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
          text: 'Lang',
          collapsed: true,
          items: [
            {
              text: 'Array',
                collapsed: false,
                items: [
                  { text: 'isArray', link: '/api/lang/array/isArray' },
                  { text: 'arrayNotEmpty', link: '/api/lang/array/arrayNotEmpty' },
                  { text: 'arrayContains', link: '/api/lang/array/arrayContains' },
                  { text: 'arrayNotContains', link: '/api/lang/array/arrayNotContains' },
                  { text: 'arrayUnique', link: '/api/lang/array/arrayUnique' },
                ],
            },
            {
              text: 'Boolean',
              collapsed: false,
              items: [
                { text: 'isBoolean', link: '/api/lang/boolean/isBoolean' },
              ]
            },
            {
              text: 'Common',
              collapsed: false,
              items: [
                { text: 'isNotEmpty', link: '/api/lang/common/isNotEmpty' },
                { text: 'isDefined', link: '/api/lang/common/isDefined' },
                { text: 'isPrimitive', link: '/api/lang/common/isPrimitive' },
                { text: 'isEmpty', link: '/api/lang/common/isEmpty' },
                { text: 'isEqual', link: '/api/lang/common/isEqual' },
                { text: 'notEquals', link: '/api/lang/common/notEquals' },
                { text: 'isNil', link: '/api/lang/common/isNil' },
              ]
            }
          ]
        },
        {
          text: 'Array',
          collapsed: false,
          items: [
            { text: 'formatArrayToString', link: '/api/array/formatArrayToString' },
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
