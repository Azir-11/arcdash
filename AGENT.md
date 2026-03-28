# AGENT

## 文档约定

- `SafeNumber` 相关文档除外，其他 API 文档默认由 JSDoc 配合 `pnpm docs:gen` 生成。
- 新增或修改非 `SafeNumber` 能力时，优先更新源码中的 JSDoc，避免直接手改 `docs/api` 下的生成文档。
- 涉及 `SafeNumber` 的功能变更时，需要同步检查并更新 `docs/safe-number` 与 `docs/api/SafeNumber.md`。

## 版本与 Changelog

- 修改 `package.json` 中的版本号时，需要拉取上一个版本提交到当前版本提交之间的 Git 记录。
- 基于这段时间内的 Git 提交生成中文 changelog，并同步更新 `CHANGELOG.md`。
- 生成 changelog 时，以用户可读性为先，按功能、修复、重构或文档等维度整理，不要直接堆砌原始提交信息。

## 开发要求

- 写新代码时必须关注测试覆盖度；新增功能、修复缺陷、调整行为时，都应补齐或更新对应测试。
- 行为、接口、示例或使用方式发生变化时，必须同步更新相关文档。
- 写代码时始终遵循 skill：`typescript-strict`，优先保证严格类型、安全收窄、清晰边界，避免以 `any` 或弱类型绕过约束。
