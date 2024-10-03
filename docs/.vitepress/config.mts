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
      { text: 'Api', link: '/api/time/waitFor' },
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
          text: 'Time · 食光',
          collapsed: false,
          items: [
            {
              collapsed: false,
              items: [
                { text: 'waitFor', link: '/api/time/waitFor' },
              ],
            },
          ],
        },
        {
          text: 'Lang · 弱类型真好',
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
              ],
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
              ],
            },
            {
              text: 'Number',
              collapsed: false,
              items: [
                { text: 'isNumber', link: '/api/lang/number/isNumber' },
                { text: 'isInt', link: '/api/lang/number/isInt' },
                { text: 'isFloat', link: '/api/lang/number/isFloat' },
                { text: 'isNegative', link: '/api/lang/number/isNegative' },
                { text: 'isPositive', link: '/api/lang/number/isPositive' },
                { text: 'max', link: '/api/lang/number/max' },
                { text: 'min', link: '/api/lang/number/min' },
              ],
            },
            {
              text: 'Object',
              collapsed: false,
              items: [
                { text: 'isObject', link: '/api/lang/object/isObject' },
                { text: 'isSymbol', link: '/api/lang/object/isSymbol' },
                { text: 'isFunction', link: '/api/lang/object/isFunction' },
                { text: 'isDate', link: '/api/lang/object/isDate' },
                { text: 'isPromise', link: '/api/lang/object/isPromise' },
              ],
            },
            {
              text: 'String',
              collapsed: false,
              items: [
                { text: 'isString', link: '/api/lang/string/isString' },
              ],
            },
          ],
        },
        {
          text: 'Array · 天上的玻璃珠',
          collapsed: true,
          items: [
            { text: 'formatArrayToString', link: '/api/array/formatArrayToString' },
            { text: 'head', link: '/api/array/head' },
            { text: 'last', link: '/api/array/last' },
            { text: 'map', link: '/api/array/map' },
            { text: 'mergeArraysByKeyValue', link: '/api/array/mergeArraysByKeyValue' },
            { text: 'sum', link: '/api/array/sum' },
          ],
        },
        {
          text: 'Number · 上帝说祂也不会',
          collapsed: true,
          items: [
            {
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
