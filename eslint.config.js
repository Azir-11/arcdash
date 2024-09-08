import antfu from '@antfu/eslint-config'

export default antfu(
  {},
  {
    ignores: [
      'docs/.vitepress/cache',
    ],
  },
  {
    rules: {
      'ts/no-invalid-void-type': 'off',
      'prefer-regex-literals': 'off',
      'no-new-wrappers': 'off',
    },
  },
)
