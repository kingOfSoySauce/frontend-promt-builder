# TODO

## Prompt Builder（promt-builder.html）
- [ ] 在界面中增加一个输出选项：`spec`
  - 默认不选
  - 可选值：`openspec`
- [ ] 明确 spec 选中后的 prompt 行为（追加输出要求）：
  - [ ] 生成一份 OpenSpec 风格的规格说明（建议包含：目标/范围、功能点、数据结构、接口/事件、错误码、边界情况、验收标准）
  - [ ] 输出文件名：`SPEC.md`（或你指定的名字）

## Notes
- 本次仅记录待办，不修改现有代码。


# Frontend TODO (Leon)

- [ ] **facehash 头像组件库**：调研/封装一个基于 facehash（头像 hash）的组件库（用于生成一致的占位头像/identicon 风格）。
  - 记录时间：2026-02-07
  - 备注：待补充使用场景、目标 API、技术选型（React/Vue、Canvas/SVG、hash 算法、SSR 支持等）。

## 提示词构造器 TODO

- [ ] 选项支持 `link`：点击后可打开/预览一个本地 `.md`（用于解释每个技术/选项的作用；同时充当前端笔记）。
- [ ] 支持导出「问题清单」到剪切板：把当前问题/配置导出成一段可直接丢给大模型对话的 prompt；
  - 目标流程：导出 → 跟大模型对话得到最优配置 → 粘贴回构造器 → 自动拼接生成最终 prompt。



给几个预设：配色方案、字体等，比如claude code风格、kimi风格、kiro风格、telegram风格等

加上：如果需求有未明确的地方请询问用户澄清