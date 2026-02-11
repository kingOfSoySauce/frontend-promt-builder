const T = (x, lang) => {
  if (typeof x === "string") return x;
  if (!x || typeof x !== "object") return "";
  return x[lang] ?? x.zh ?? x.en ?? "";
};

const CONFIG = {
  meta: {
    title: { zh: "AI前端开发完整提示词", en: "AI Frontend Prompt (Full Spec)" },
    version: "2026.02"
  },
  sections: [
    {
      key: "lang", title: { zh: "输出语言", en: "Output Language" }, type: "single+custom", allowCustom: false,
      items: [{ zh: "中文", en: "Chinese", value: "zh" }, { zh: "英文", en: "English", value: "en" }],
      defaults: "zh",
      template: () => ""
    },
    {
      key: "role", title: { zh: "角色/定位", en: "Role" }, type: "multiselect", allowCustom: true,
      placeholder: { zh: "补充角色定位（可选）", en: "Add extra role context (optional)" },
      items: [
        { zh: "你是一名经验丰富的前端工程师和 UI 设计师", en: "You are an experienced frontend engineer and UI designer." },
        { zh: "你擅长构建真实产品级界面，而不是演示级页面", en: "You build real, production-like product UIs, not demo templates." },
        { zh: "你关注信息密度、可用性与一致性，而非炫技", en: "You prioritize information density, usability, and consistency over flashy effects." }
      ],
      defaults: ["你是一名经验丰富的前端工程师和 UI 设计师", "你擅长构建真实产品级界面，而不是演示级页面", "你关注信息密度、可用性与一致性，而非炫技"],
      template: (vals, extra, fields, lang) => {
        const h = lang === "en" ? "【Role】" : "【角色】";
        const l = vals.map(v => `- ${v}`);
        if (extra?.trim()) l.push(`- ${lang === "en" ? "Extra" : "补充"}：${extra.trim()}`);
        return `${h}\n${l.join("\n")}\n`;
      }
    },
    {
      key: "goal", title: { zh: "项目目标", en: "Project Goal" }, type: "multiselect", allowCustom: true,
      placeholder: { zh: "补充项目目标（可选）", en: "Add extra goal details (optional)" },
      items: [
        { zh: "SaaS 后台", en: "SaaS Dashboard" },
        { zh: "AI 工具网站", en: "AI Tool Website" },
        { zh: "技术博客", en: "Tech Blog" },
        { zh: "Landing Page", en: "Landing Page" },
        { zh: "移动端 Web App", en: "Mobile Web App" }
      ],
      defaults: ["AI 工具网站"],
      template: (vals, extra, fields, lang) => {
        const h = lang === "en" ? "【Project Goal】" : "【项目目标】";
        const l = vals.map(v => `- ${v}`);
        if (extra?.trim()) l.push(`- ${lang === "en" ? "Extra" : "补充"}：${extra.trim()}`);
        return `${h}\n${l.join("\n")}\n`;
      }
    },
    {
      key: "users", title: { zh: "目标用户/语境注入", en: "Audience / Context Injection" }, type: "multiselect", allowCustom: true,
      placeholder: { zh: "补充目标用户/场景（可选）", en: "Add audience/scenario context (optional)" },
      items: [
        { zh: "目标用户是开发者（偏工具型界面）", en: "Target users are developers (tool-like UI)." },
        { zh: "页面需要像真实产品官网/控制台，而不是模板站", en: "The UI must feel like a real product site/console, not a template." },
        { zh: "请使用更真实的文案与模块命名，避免 placeholder", en: "Use realistic copy and module names; avoid placeholders." },
        { zh: "减少营销腔，更偏技术/产品说明风格", en: "Avoid marketing tone; prefer technical/product explanation tone." }
      ],
      defaults: ["页面需要像真实产品官网/控制台，而不是模板站", "请使用更真实的文案与模块命名，避免 placeholder"],
      template: (vals, extra, fields, lang) => {
        const h = lang === "en" ? "【Context & Audience】" : "【语境与受众】";
        const l = vals.map(v => `- ${v}`);
        if (extra?.trim()) l.push(`- ${lang === "en" ? "Extra" : "补充"}：${extra.trim()}`);
        return `${h}\n${l.join("\n")}\n`;
      }
    },
    {
      key: "tech", title: { zh: "技术栈要求", en: "Tech Stack" }, type: "multiselect", allowCustom: true,
      placeholder: { zh: "补充技术栈/限制（可选）", en: "Add tech constraints (optional)" },
      items: [
        { zh: "Next.js（App Router）", en: "Next.js (App Router)" },
        { zh: "TypeScript", en: "TypeScript" },
        { zh: "Tailwind CSS", en: "Tailwind CSS" },
        { zh: "shadcn/ui（优先使用其组件）", en: "shadcn/ui (prefer its components)" },
        { zh: "如需视觉增强，可选用 Magic UI / Aceternity UI（保持克制）", en: "For visual enhancements, optionally use Magic UI / Aceternity UI (restrained)." },
        { zh: "不要引入大型 UI 框架（如 Ant Design / MUI），除非明确要求", en: "Do not introduce heavy UI frameworks (AntD/MUI) unless explicitly requested." }
      ],
      defaults: ["Next.js（App Router）", "TypeScript", "Tailwind CSS", "shadcn/ui（优先使用其组件）"],
      template: (vals, extra, fields, lang) => {
        const h = lang === "en" ? "【Tech Stack】" : "【技术栈】";
        const l = vals.map(v => `- ${v}`);
        if (extra?.trim()) l.push(`- ${lang === "en" ? "Extra" : "补充"}：${extra.trim()}`);
        return `${h}\n${l.join("\n")}\n`;
      }
    },
    {
      key: "icons", title: { zh: "矢量图标库（单选）", en: "Icon Library (single)" }, type: "single+custom", allowCustom: true,
      placeholder: { zh: "补充/自定义图标库（可选）", en: "Custom icon library (optional)" },
      items: [
        { zh: "Lucide（lucide-react）", en: "Lucide (lucide-react)" },
        { zh: "Heroicons", en: "Heroicons" },
        { zh: "Tabler Icons", en: "Tabler Icons" },
        { zh: "Phosphor Icons", en: "Phosphor Icons" },
        { zh: "Iconify", en: "Iconify" }
      ],
      defaults: "Lucide（lucide-react）",
      template: (vals, extra, fields, lang) => {
        const h = lang === "en" ? "【Icons】" : "【图标】";
        const p = vals[0] || "";
        const c = extra?.trim();
        const f = c ? `${p}${p ? " + " : ""}${c}` : p;
        if (!f) return "";
        return `${h}\n- ${lang === "en" ? "Prefer a vector icon library" : "优先使用矢量图标库"}：${f}\n`;
      }
    },
    {
      key: "style", title: { zh: "设计风格", en: "Design Style" }, type: "multiselect", allowCustom: true,
      placeholder: { zh: "补充风格关键词（可选）", en: "Add style keywords (optional)" },
      items: [
        { zh: "整体风格：极简、克制、真实产品感", en: "Style: minimal, restrained, real-product feel." },
        { zh: "信息密度：适中偏高（更像工具产品）", en: "Information density: medium-to-high (tool-like product)." },
        { zh: "布局：网格清晰、层级分明、可读性优先", en: "Layout: clear grid, strong hierarchy, readability first." },
        { zh: "动效：轻量、服务信息，不做炫技动画", en: "Motion: subtle and purposeful; avoid showy animations." }
      ],
      defaults: ["整体风格：极简、克制、真实产品感", "信息密度：适中偏高（更像工具产品）", "布局：网格清晰、层级分明、可读性优先"],
      template: (vals, extra, fields, lang) => {
        const h = lang === "en" ? "【Design & Style】" : "【设计与风格】";
        const l = vals.map(v => `- ${v}`);
        if (extra?.trim()) l.push(`- ${lang === "en" ? "Extra" : "补充"}：${extra.trim()}`);
        return `${h}\n${l.join("\n")}\n`;
      }
    },
    {
      key: "palette", title: { zh: "配色方案（可选但推荐）", en: "Color Palette (optional but recommended)" }, type: "fields", allowCustom: false,
      fields: [
        { key: "primary", label: { zh: "主色 HEX", en: "Primary HEX" }, placeholder: "#38BDF8" },
        { key: "secondary", label: { zh: "辅助色 HEX", en: "Secondary HEX" }, placeholder: "#1E293B" },
        { key: "background", label: { zh: "背景色 HEX", en: "Background HEX" }, placeholder: "#0B0F1A" }
      ],
      defaults: {},
      template: (vals, extra, fv, lang) => {
        const { primary, secondary, background } = fv || {};
        if (![primary, secondary, background].some(v => (v || "").trim())) return "";
        const h = lang === "en" ? "【Color Palette (Strict)】" : "【配色方案（严格遵守）】";
        const n = lang === "en" ? "Do not invent new theme colors." : "不要自行生成新的主题色";
        return `${h}\n- ${lang === "en" ? "Primary" : "主色"}：${(primary || "").trim() || (lang === "en" ? "(empty)" : "（未填）")}\n- ${lang === "en" ? "Secondary" : "辅助色"}：${(secondary || "").trim() || (lang === "en" ? "(empty)" : "（未填）")}\n- ${lang === "en" ? "Background" : "背景色"}：${(background || "").trim() || (lang === "en" ? "(empty)" : "（未填）")}\n- ${n}\n`;
      }
    },
    {
      key: "components", title: { zh: "组件要求（页面结构）", en: "Components (Structure)" }, type: "multiselect", allowCustom: true,
      placeholder: { zh: "补充必须包含的模块（可选）", en: "Add required modules (optional)" },
      items: [
        { zh: "Navbar（顶部导航）", en: "Navbar (top navigation)" },
        { zh: "Sidebar（侧边栏）", en: "Sidebar" },
        { zh: "Cards（指标卡片）", en: "Metric cards" },
        { zh: "Table（列表）", en: "Table (list)" },
        { zh: "Filters（筛选）", en: "Filters" },
        { zh: "Dialog/Modal（弹窗）", en: "Dialog/Modal" },
        { zh: "Form（表单）", en: "Form" },
        { zh: "Empty/Loading/Error States（空态/加载/错误态）", en: "Empty/Loading/Error states" }
      ],
      defaults: ["Navbar（顶部导航）", "Cards（指标卡片）", "Table（列表）", "Filters（筛选）", "Dialog/Modal（弹窗）", "Empty/Loading/Error States（空态/加载/错误态）"],
      template: (vals, extra, fields, lang) => {
        const h = lang === "en" ? "【Components & Structure】" : "【组件与页面结构】";
        const l = vals.map(v => `- ${v}`);
        if (extra?.trim()) l.push(`- ${lang === "en" ? "Extra" : "补充"}：${extra.trim()}`);
        return `${h}\n${l.join("\n")}\n`;
      }
    },
    {
      key: "prohibitions", title: { zh: "禁止事项（已内置关键规则）", en: "Prohibitions (built-in rules)" }, type: "multiselect", allowCustom: true,
      placeholder: { zh: "补充禁止事项（可选）", en: "Add prohibitions (optional)" },
      items: [
        { zh: "禁止使用 emoji / 表情符号", en: "No emoji." },
        { zh: "避免默认蓝紫渐变、避免模板站审美", en: "Avoid default blue-purple gradients and template aesthetics." },
        { zh: "避免巨大 Hero + 三段式模板（Hero/Features/CTA）一眼AI", en: "Avoid oversized hero and the obvious 3-section template (Hero/Features/CTA)." },
        { zh: "避免假数据、假评价、假 logo；用合理的示例文案", en: "Avoid fake testimonials/logos; use reasonable sample copy." },
        { zh: "不要过度营销语气（少用夸张词）", en: "No over-marketing tone." }
      ],
      defaults: ["禁止使用 emoji / 表情符号", "避免默认蓝紫渐变、避免模板站审美", "避免巨大 Hero + 三段式模板（Hero/Features/CTA）一眼AI", "避免假数据、假评价、假 logo；用合理的示例文案", "不要过度营销语气（少用夸张词）"],
      template: (vals, extra, fields, lang) => {
        const h = lang === "en" ? "【Prohibitions】" : "【禁止事项】";
        const l = vals.map(v => `- ${v}`);
        if (extra?.trim()) l.push(`- ${lang === "en" ? "Extra" : "补充"}：${extra.trim()}`);
        return `${h}\n${l.join("\n")}\n`;
      }
    },
    {
      key: "codeReq", title: { zh: "代码要求 / 输出要求", en: "Code / Output Requirements" }, type: "multiselect", allowCustom: true,
      placeholder: { zh: "补充代码约束（可选）", en: "Add code constraints (optional)" },
      items: [
        { zh: "组件拆分清晰，可复用，命名规范", en: "Clear component decomposition, reusable, consistent naming." },
        { zh: "优先 Server Components（如适用），避免不必要的客户端状态", en: "Prefer Server Components when applicable; avoid unnecessary client state." },
        { zh: "不要写死数据结构；给出合理的 mock 数据与类型定义", en: "Don't hardcode schemas; provide reasonable mock data and types." },
        { zh: "输出：完整页面代码 + 组件结构说明 + 依赖安装与运行步骤", en: "Output: complete runnable page + structure + install/run steps." }
      ],
      defaults: ["组件拆分清晰，可复用，命名规范", "优先 Server Components（如适用），避免不必要的客户端状态", "不要写死数据结构；给出合理的 mock 数据与类型定义", "输出：完整页面代码 + 组件结构说明 + 依赖安装与运行步骤"],
      template: (vals, extra, fields, lang) => {
        const h = lang === "en" ? "【Code & Output】" : "【代码与输出】";
        const l = vals.map(v => `- ${v}`);
        if (extra?.trim()) l.push(`- ${lang === "en" ? "Extra" : "补充"}：${extra.trim()}`);
        return `${h}\n${l.join("\n")}\n`;
      }
    },
    {
      key: "acceptance", title: { zh: "验收标准", en: "Acceptance Criteria" }, type: "multiselect", allowCustom: true,
      placeholder: { zh: "补充验收标准（可选）", en: "Add acceptance criteria (optional)" },
      items: [
        { zh: "看起来像真实产品（非演示模板）", en: "Looks like a real product (not a demo template)." },
        { zh: "风格一致、组件一致、排版层级清晰", en: "Consistent style/components; clear typography hierarchy." },
        { zh: "可直接运行（无缺失依赖/语法错误）", en: "Runs out-of-the-box (no missing deps/syntax errors)." },
        { zh: "交互合理：hover/focus/keyboard 可用", en: "Good interactions: hover/focus/keyboard usable." }
      ],
      defaults: ["看起来像真实产品（非演示模板）", "风格一致、组件一致、排版层级清晰", "可直接运行（无缺失依赖/语法错误）", "交互合理：hover/focus/keyboard 可用"],
      template: (vals, extra, fields, lang) => {
        const h = lang === "en" ? "【Acceptance Criteria】" : "【验收标准】";
        const l = vals.map(v => `- ${v}`);
        if (extra?.trim()) l.push(`- ${lang === "en" ? "Extra" : "补充"}：${extra.trim()}`);
        return `${h}\n${l.join("\n")}\n`;
      }
    },
    {
      key: "skills", title: { zh: "Skills / 参考文档地址", en: "Skills / Reference URLs" }, type: "multiselect", allowCustom: true,
      placeholder: { zh: "补充你的 Skills 地址 / 文档链接（可选）", en: "Add your skills URLs/docs (optional)" },
      items: [
        "https://ui.shadcn.com", "https://tailwindcss.com", "https://lucide.dev",
        "https://magicui.design", "https://ui.aceternity.com", "https://www.promptingguide.ai",
        "https://github.com/f/awesome-chatgpt-prompts", "https://github.com/getcursor/cursor-examples",
        "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"
      ],
      defaults: ["https://ui.shadcn.com", "https://tailwindcss.com", "https://lucide.dev", "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"],
      template: (vals, extra, fields, lang) => {
        const h = lang === "en" ? "【References / Skills】" : "【参考/Skills】";
        const l = (vals || []).map(v => `- ${v}`);
        if (extra?.trim()) l.push(`- ${lang === "en" ? "Extra" : "补充"}：${extra.trim()}`);
        if (!l.length) return "";
        return `${h}\n${l.join("\n")}\n`;
      }
    }
  ]
};

// ── State & DOM refs ──
const state = {};
const formArea = document.getElementById("formArea");
const output = document.getElementById("output");
const statusEl = document.getElementById("status");

function getLang() {
  const v = state["lang"]?.selected?.[0] || "zh";
  return v === "en" ? "en" : "zh";
}

function initState(withDefaults = true) {
  CONFIG.sections.forEach(sec => {
    state[sec.key] = { selected: [], custom: "", fields: {} };
    if (!withDefaults) return;
    if (sec.type === "single+custom" && sec.defaults) { state[sec.key].selected = [sec.defaults]; }
    if (sec.type === "multiselect" && Array.isArray(sec.defaults)) { state[sec.key].selected = [...sec.defaults]; }
    if (sec.type === "fields" && sec.defaults && typeof sec.defaults === "object") { state[sec.key].fields = { ...sec.defaults }; }
  });
}

function createEl(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") el.className = v;
    else if (k === "html") el.innerHTML = v;
    else el.setAttribute(k, v);
  });
  children.forEach(c => el.appendChild(c));
  return el;
}

// ── Build prompt ──
function buildPrompt() {
  const lang = getLang();
  const parts = [];
  parts.push(`${T(CONFIG.meta.title, lang)}（${CONFIG.meta.version}）\n`);

  CONFIG.sections.forEach(sec => {
    if (sec.key === "lang") return;
    const selected = state[sec.key].selected || [];
    const custom = state[sec.key].custom || "";
    const fields = state[sec.key].fields || {};

    let outputSelected = selected;
    if (lang === "en") {
      outputSelected = selected.map(zhVal => {
        const found = sec.items.find(item => T(item, "zh") === zhVal);
        return found ? T(found, "en") : zhVal;
      });
    }

    const text = sec.template(outputSelected, custom, fields, lang);
    if (text && text.trim()) parts.push(text.trimEnd() + "\n");
  });

  parts.push(lang === "en"
    ? `【Execution】\nPlease produce:\n1) Complete runnable page code\n2) Suggested component split + directory structure\n3) Install & run steps (pnpm/npm)\n4) If using Magic UI / Aceternity UI, cite component source and how to import/use it\n`
    : `【执行指令】\n请基于以上要求输出：\n1) 完整页面代码（可直接运行）\n2) 组件拆分与目录结构建议\n3) 依赖安装与运行步骤（pnpm / npm 都可）\n4) 如使用 Magic UI / Aceternity UI，请说明对应组件来源与引用方式\n`);

  return parts.join("\n").trim() + "\n";
}

// ── Auto-generate: update output whenever state changes ──
function autoGenerate() {
  output.value = buildPrompt();
  setStatus("已自动生成。");
}

function setStatus(msg) { statusEl.textContent = msg; }

// ── Render form UI (always zh) ──
function render() {
  const uiLang = "zh";
  formArea.innerHTML = "";

  CONFIG.sections.forEach(sec => {
    const card = createEl("div", { class: "card" });
    const titleText = T(sec.title, uiLang);
    const typeTag = sec.type === "single+custom" ? "单选" : "多选";
    const title = createEl("h2", { html: `${titleText} <span class="tag">${typeTag}</span>` });
    card.appendChild(title);

    if (sec.type === "fields") {
      const row = createEl("div", { class: "row" });
      sec.fields.forEach(f => {
        const box = createEl("div");
        box.appendChild(createEl("label", { html: T(f.label, uiLang) }));
        const inp = createEl("input", { type: "text", placeholder: f.placeholder || "" });
        inp.value = state[sec.key].fields[f.key] || "";
        inp.addEventListener("input", () => {
          state[sec.key].fields[f.key] = inp.value;
          autoGenerate();
        });
        box.appendChild(inp);
        row.appendChild(box);
      });
      card.appendChild(row);
      formArea.appendChild(card);
      return;
    }

    if (sec.type === "single+custom") {
      card.appendChild(createEl("label", { html: "下拉选择（单选）" }));
      const sel = createEl("select", {});
      sel.appendChild(createEl("option", { value: "", html: "（请选择）" }));
      sec.items.forEach(opt => {
        if (sec.key === "lang" && typeof opt === "object") {
          sel.appendChild(createEl("option", { value: opt.value, html: T(opt, uiLang) }));
        } else {
          const label = T(opt, uiLang) || opt;
          sel.appendChild(createEl("option", { value: label, html: label }));
        }
      });
      sel.value = state[sec.key].selected[0] || "";
      sel.addEventListener("change", () => {
        state[sec.key].selected = sel.value ? [sel.value] : [];
        autoGenerate();
      });
      card.appendChild(sel);
    } else {
      // card.appendChild(createEl("label", { html: "点击切换选中（多选）" }));
      const list = createEl("div", { class: "check-list" });
      sec.items.forEach(opt => {
        const label = T(opt, uiLang) || opt;
        const isActive = (state[sec.key].selected || []).includes(label);
        const item = createEl("div", { class: "check-item" + (isActive ? " active" : "") });
        const box = createEl("span", { class: "cb-box", html: isActive ? "✓" : "" });
        item.appendChild(box);
        item.appendChild(document.createTextNode(label));
        item.addEventListener("click", () => {
          const sel = state[sec.key].selected;
          if (sel.includes(label)) { state[sec.key].selected = sel.filter(x => x !== label); }
          else { state[sec.key].selected = [...sel, label]; }
          render();
        });
        list.appendChild(item);
      });
      card.appendChild(list);
    }

    if (sec.allowCustom) {
      card.appendChild(createEl("label", { html: "补充输入（可选，和多选并存）" }));
      const custom = createEl("input", { type: "text", placeholder: T(sec.placeholder, uiLang) || "" });
      custom.value = state[sec.key].custom || "";
      custom.addEventListener("input", () => {
        state[sec.key].custom = custom.value;
        autoGenerate();
      });
      card.appendChild(custom);
    }

    formArea.appendChild(card);
  });

  // Auto-generate after every render
  autoGenerate();
}

// ── Toolbar events ──
// document.getElementById("btnGenerate").addEventListener("click", () => {
//   output.value = buildPrompt();
//   setStatus("已生成。");
// });

document.getElementById("btnCopy").addEventListener("click", async () => {
  const text = output.value || buildPrompt();
  output.value = text;
  try {
    await navigator.clipboard.writeText(text);
    setStatus("已复制到剪贴板。");
  } catch (e) {
    output.select();
    document.execCommand("copy");
    setStatus("已复制（fallback）。");
  }
});

document.getElementById("btnReset").addEventListener("click", () => {
  initState(true);
  render();
  setStatus("已重置。");
});

const LS_KEY = "prompt_builder_state_v1";

document.getElementById("btnSave").addEventListener("click", () => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
    setStatus("已保存到本地。");
  } catch (e) {
    setStatus("保存失败。");
  }
});

document.getElementById("btnLoad").addEventListener("click", () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) { setStatus("本地没有保存的数据。"); return; }
    const obj = JSON.parse(raw);
    Object.keys(obj).forEach(k => { if (state[k]) state[k] = obj[k]; });
    render();
    setStatus("已加载。");
  } catch (e) {
    setStatus("加载失败。");
  }
});

// ── Init: load defaults and render (auto-generates on load) ──
initState(true);
render();
