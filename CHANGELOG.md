# Changelog

All notable changes to this project will be documented in this file.

## 0.0.54 - 2026-03-28

### Changed

- 将数字计算工具 `amount` 重命名为 `SafeNumber`，并同步更新了测试与文档。

### Deprecated

- 保留了兼容导出 `amount` 和 `Amout`，调用时会输出错误提示，并计划在 `0.7.0` 版本删除；请改用 `SafeNumber`。

## 0.0.53 - 2026-03-28

### Added

- 增加了精确的大陆区域身份证号判断功能。
