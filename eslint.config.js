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
    },
  },
)
