# 相近开源实现调查

调查日期：2026-10-07（Asia/Shanghai）。现场读取官方 GitHub 仓库、release 页、GitHub API 最近提交及关键源码；未引入其代码、资源或运行依赖。版本是本次查询快照，不保证之后不变。

| 项目 | 最新提交快照 | Release / 许可证 | 阅读实现与取舍 |
|---|---|---|---|
| [remarkablegames/phaser-rpg](https://github.com/remarkablegames/phaser-rpg) | `d2a5e79f493f744a872cb3775ade17c0b054b23e`，2026-10-06 | [无 GitHub release](https://github.com/remarkablegames/phaser-rpg/releases)；[MIT](https://github.com/remarkablegames/phaser-rpg/blob/master/LICENSE) | [src/main.ts](https://github.com/remarkablegames/phaser-rpg/blob/master/src/main.ts)：场景注册、生产环境禁调试、FIT/CENTER 缩放、像素过滤。借鉴发布与调试分离、保持画布比例；纯 FIT 会让390px文字过小，本项目另做可读的 DOM 布局，不迁入 Phaser。 |
| [RSamaium/RPG-JS](https://github.com/RSamaium/RPG-JS) | `2560a72fa9ca8b33ef9b61e69003e58872e4f344`，2026-09-28 | [v5 系列包 5.0.0](https://github.com/RSamaium/RPG-JS/releases)（physic 包5.0.3）；[MIT](https://github.com/RSamaium/RPG-JS/blob/v5/LICENSE) | [Player.ts](https://github.com/RSamaium/RPG-JS/blob/v5/packages/server/src/Player/Player.ts)：存档槽元信息、自动保存策略与快照/运行时分离。采用明确的持久状态边界和恢复验证；本项目离线单人，不采用多人服务器、同步、Vue 或框架迁移。 |
| [phaserjs/phaser](https://github.com/phaserjs/phaser) | `02d8931b626d9764c133cbb3fbf99966c03c757c`，2026-08-21 | [v4.2.1](https://github.com/phaserjs/phaser/releases/tag/v4.2.1)，2026-07-09；[MIT](https://github.com/phaserjs/phaser/blob/master/LICENSE.md) | [KeyboardPlugin.js](https://github.com/phaserjs/phaser/blob/master/src/input/keyboard/KeyboardPlugin.js)：场景活动检查、重复事件过滤、按键边沿状态。采用输入生命周期与防重复触发原则；不为修复现有小型引擎增加整个渲染框架。 |

最近提交通过 GitHub commits 搜索按 committer-date 降序核对；Phaser 开发分支的4.3变更日志不等于已发布4.3。三项目近期均有活动。poliastro 是与本游戏无关的已归档轨道算法库，不作为游戏依赖或活跃参照。

本轮工作优先级由现有代码缺陷决定：可恢复存档、战斗资源与首领流程、输入释放、可读缩放、自包含打包和可重放验收。MIT 允许复用但并不构成引入必要性；本轮只借鉴架构思路，保留本游戏原创内容与成熟代码。
