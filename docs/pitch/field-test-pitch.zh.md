# Skills Charter 探口风 Pitch

用途：拿去和朋友、同事、创业者、AI 工具用户、平台/安全/文档团队聊，测试这个想法是否真实、是否好懂、是否值得继续推进。重点不是说服对方，而是听出他们哪里点头、哪里困惑、哪里觉得太重。

## 15 秒版本

我们在做 Skills Charter：一个让个人和团队把 Agent Skills 变成可管理、可审查、可迭代资产的 Git 工作流。

现在 skills 的生产和分发很混乱：有人从公开仓库复制，有人让 agent 生成，有人放在本地目录里手改，但很少有可信赖的团队来源。真正痛点不是“怎么改一个 skill”，而是“谁管理、怎么更新、怎么审查、什么时候能给团队安装”。

所以我们的主张是：

> 每个 Agent Skill 进入 runtime 之前，都需要一份团队批准的 charter。

## 1 分钟版本

**Introduction:** Agent Skills 正在变成 AI agent 的“运行记忆”。一个 skill 可能包含 `SKILL.md`、参考资料、脚本、示例、资产和评估记录。装进去之后，它会影响 agent 怎么做 code review、怎么跑工具、怎么遵守团队流程。

**Gap:** 但现在市场还没有一个很好用的团队 skills 写作和维护工具。skills 的生产和分发都很混乱：公开仓库、本地目录、聊天记录、个人 agent 配置混在一起。可信赖的来源很少，团队也很难回答：这个 skill 谁负责？从哪来？更新过什么？有没有审查？能不能回滚？适合装给谁？

**Solution:** Skills Charter 想把 Git 仓库变成团队 skills 的治理层。一个 skill 先作为 candidate 进入仓库，获得一份 Skill Charter：source、owner、review evidence、install target、policy checks、approval status 和 runtime constraints。只有批准过的 charter 才会生成 runtime 安装包。

我们不是要做另一个 marketplace 或 registry。Skills Charter 解决更前面的问题：

> 一个 skill 怎么变得足够可信，可以发布给团队安装？

## 3 分钟版本

**Introduction:** AI 工作流里正在出现一种新的对象：Agent Skill。

它介于文档、prompt 和软件包之间。它像文档一样能给人读，但又会被 agent 加载并在真实任务中执行。这个东西很有价值，也很危险，因为它会逐渐承载团队的 SOP、代码规范、研究流程、审查标准和工具使用方法。

**Gap:** 现在的问题不是大家不会写一个 skill，而是 skills 很难被组织起来，变成可以长期维护的团队资产。

对个人来说，手动改本地 skill 目录可能没问题。但对团队来说，很快会变乱：

- skills 散落在聊天、文档、仓库和本地 agent 目录里
- 公开 skills 可能未经审查就被安装
- agent 生成的 skills 听起来合理，但可能不完整
- scripts、外部链接、依赖和 assets 可能藏着风险
- 出问题时不知道当时安装的是哪个版本
- 非工程同学懂流程，但很难安全地修改 agent package

市场正在分成五层：creation、evaluation、distribution、governance、runtime。Skill creator、eval 系统、marketplace、registry、installer、runtime governance 和自动演化系统都在动。但中间仍然缺一个很朴素的团队工作流：怎样把一个 public/generated/local skill 变成 owned、reviewed、versioned、approved、installable 的资产。

我们的 thesis 是：

> Skills 进入团队 runtime 之前，应该先获得一份团队批准的 charter。

**Solution:** Skills Charter 的闭环是：

```text
发现或生成 skill
-> candidate skill
-> Skill Charter：绑定 owner、source、evidence、policy 和目标 agent
-> 人工审查
-> lint 和 policy 检查
-> approved registry
-> 安装到 agent clients
-> 观察、反馈、修补
```

第一个产品形态是 GitHub Pages manager + CLI checks。它可以浏览 skill package、编辑 `SKILL.md`、检查风险、预览 registry，并且只给 approved packages 生成安装命令。

更重要的是，这不是单纯做软件功能，而是在推广一种维护方式：个人和团队都需要把 skills 从零散指令变成资产，让它们有 owner、review、provenance、evidence、version history、install target 和 rollback。

## 我们的切入点

市场已经开始动了，这反而是好事。更清晰的地图是一个五层生命周期：

```text
Creation -> Evaluation -> Distribution -> Governance -> Runtime
```

大部分相邻产品更偏向 creation、evaluation、distribution 或 runtime，还没有很好解决“团队如何一起写、审查、更新、绑定和沉淀 skills”。

Skills Charter 不应该和所有人硬碰硬。

| 层 | 回答的问题 | 例子 | 我们的位置 |
| --- | --- | --- | --- |
| Creation | skills 从哪里来？ | hand-authored SOPs、generated skills、evolved skills | candidate 来源 |
| Evaluation | skill 是否真的有效？ | evals、benchmarks、trigger tests、scanner reports | review evidence |
| Distribution | skills 如何流动？ | marketplaces、registries、`npx skills`、GitHub adapters | 上游/下游通道 |
| Governance | 我们团队是否应该信任它？ | provenance、ownership、CI、approval、rollback | Skills Charter 负责这一层 |
| Runtime | agent 如何加载和使用它？ | Claude、Codex、Copilot、Cursor、allowlists | 下游执行 |

可以反复测试这句话：

> Evaluation 回答“这个 skill 是否有效”。Governance 回答“我们团队是否应该信任它”。

## 聊完后要问的问题

不要只问“你觉得酷不酷”。要问具体工作流。

1. 你或你们团队现在有没有用 skills、prompts、rules、`AGENTS.md`、Claude skills、Copilot instructions、Cursor rules 或类似的 agent 操作规程？
2. 这些东西现在放在哪里？
3. 谁负责维护？
4. 有没有复制过公开 skill，或者让 agent 生成过类似的东西？
5. 如果一个 public/generated skill 要给团队一起用，你觉得需要 review 吗？
6. 什么会让你觉得一个 skill 足够可信，可以工作中使用？
7. GitHub PR review 对这个场景自然吗？还是更希望在 GitBook、Notion、飞书、语雀、Obsidian 里管理？
8. 对你来说最有价值的是：写 skills、审查导入 skills、安装 approved skills，还是追踪 evidence 和 rollback？
9. 哪部分听起来太重、太早、或者没必要？
10. 如果这是一个开源 starter repo，你会试吗？为什么？

## 值得记录的反应

强信号：

- “我们已经有这个问题。”
- “我们的 prompts/rules 到处都是。”
- “public skills 我确实不敢直接装。”
- “非工程同学需要改流程，但我们需要 review。”
- “这个应该做成 GitHub Action / PR template / repo template。”
- “这更像 policy 和 docs，不是 marketplace。”

弱信号或困惑：

- “这不就是 prompt manager 吗？”
- “registry 不会解决这个吗？”
- “没那么多 skills 之前为什么需要？”
- “这个是不是太工程化了？”
- “我现在还不用 skills。”

如果对方困惑，不要急着解释。可以反问：你们现在用什么承载 agent 的长期行为？system prompt、project rules、workflow docs、coding-agent instructions、runbooks，还是本地脚本？

## 常见质疑怎么回

### “这不就是 prompt management 吗？”

不完全是。Prompt 通常是文本。Skill 是 package：instructions、metadata、references、scripts、examples、assets、evidence 和 install behavior。它更需要 package governance，而不只是 prompt versioning。

### “Registry 不会解决这个吗？”

Registry 解决可信 skills 的存储和分发，但不一定解决一个 public/generated/evolved skill 如何被团队审查、批准、变成可信资产。Skills Charter 做的是 pre-registry approval workflow。

### “小团队会不会太重？”

一个人用可能确实不需要。但只要 skills 开始影响代码、文件、工具、权限、安全审查或客户交付，review 和 rollback 就会很有价值。初始流程可以很轻：owner、source、review status、risk label、install command。

### “Agent 不能自己改进 skills 吗？”

可以，而且这是趋势。但这会让 governance 更重要。Agent 生成或演化出来的 skill 应该先进 candidate，附上 evidence，再由团队决定是否成为 shared memory。

### “为什么是 Git？”

因为 Git 已经有 history、diff、branch、PR、CI、review、tag 和 rollback。Skills Charter 用 Git 做信任层，安装则尽量交给现有 skill 工具。

## 一个 demo 故事

一个 research team 想使用 Anthropic 公开的 `skill-creator`。

他们不是直接把它装进每个人的 agent 环境，而是先导入 Skills Charter，状态是 candidate。Manager 展示 package files、owner、source、scripts、assets、links、risk labels、review notes 和 evidence。CI 检查通过后，reviewer 在 Git 里批准。只有这时，Skills Charter 才生成 approved package 的安装命令。

这把：

```text
copy public skill -> install -> hope
```

变成：

```text
public skill -> candidate -> review -> approved -> install
```

## 可以测试的一句话

不同人试不同说法，看哪句最容易被复述。

- “这是给团队 Agent Skills 用的 GitHub workflow。”
- “Agent 用 skill 之前，团队先 review 一遍。”
- “每个 Agent Skill 进入 runtime 前都需要 charter。”
- “Public/generated skills 和团队安装之间的 trust gate。”
- “给 `SKILL.md` packages 加 policy、provenance 和 review。”
- “不要直接安装随机的 agent memory。先审查。”

## 我们真正想验证什么

不只是验证别人喜不喜欢产品，也是在验证 category language。

关键未知：

- 大家现在理解 “Agent Skill” 这个对象吗？
- “skills 是 operational memory” 这句话是否成立？
- “distribution is not trust” 是否好懂？还是 “distribution 和 runtime 之间的 governance gate” 更清楚？
- GitHub 是不是正确的第一入口？
- 用户更想要 repo template、CLI、GitHub Action、Pages manager、docs platform template，还是一套组合？
- 哪类人最先有痛点：AI infra、platform engineering、security、DevRel/docs、research ops，还是 power users？

## 收尾问题

最后用一个开放问题收尾：

> 这听起来像你现在已经遇到的问题，还是更像一个还没到来的未来基础设施？

然后追问：

> 如果它是真问题，哪个具体场景会让你第一个想用它？
