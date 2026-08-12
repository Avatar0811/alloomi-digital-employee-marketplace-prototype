import { useEffect, useMemo, useRef, useState } from "react";
import addLine from "remixicon/icons/System/add-line.svg?raw";
import arrowDownSLine from "remixicon/icons/Arrows/arrow-down-s-line.svg?raw";
import bubbleChartFill from "remixicon/icons/Business/bubble-chart-fill.svg?raw";
import building2Line from "remixicon/icons/Buildings/building-2-line.svg?raw";
import calendar2Fill from "remixicon/icons/Business/calendar-2-fill.svg?raw";
import checkLine from "remixicon/icons/System/check-line.svg?raw";
import checkboxBlankCircleLine from "remixicon/icons/System/checkbox-blank-circle-line.svg?raw";
import checkboxCircleFill from "remixicon/icons/System/checkbox-circle-fill.svg?raw";
import closeCircleFill from "remixicon/icons/System/close-circle-fill.svg?raw";
import closeLine from "remixicon/icons/System/close-line.svg?raw";
import customerService2Fill from "remixicon/icons/Business/customer-service-2-fill.svg?raw";
import driveFill from "remixicon/icons/Logos/drive-fill.svg?raw";
import equalizer2Line from "remixicon/icons/Media/equalizer-2-line.svg?raw";
import fileWord2Fill from "remixicon/icons/Document/file-word-2-fill.svg?raw";
import globalLine from "remixicon/icons/Business/global-line.svg?raw";
import googleFill from "remixicon/icons/Logos/google-fill.svg?raw";
import historyLine from "remixicon/icons/System/history-line.svg?raw";
import inbox2Line from "remixicon/icons/Business/inbox-2-line.svg?raw";
import informationFill from "remixicon/icons/System/information-fill.svg?raw";
import linkedinBoxFill from "remixicon/icons/Logos/linkedin-box-fill.svg?raw";
import listCheck3 from "remixicon/icons/Editor/list-check-3.svg?raw";
import notionFill from "remixicon/icons/Logos/notion-fill.svg?raw";
import searchEyeLine from "remixicon/icons/System/search-eye-line.svg?raw";
import searchLine from "remixicon/icons/System/search-line.svg?raw";
import settings3Line from "remixicon/icons/System/settings-3-line.svg?raw";
import shieldCheckFill from "remixicon/icons/System/shield-check-fill.svg?raw";
import shieldCheckLine from "remixicon/icons/System/shield-check-line.svg?raw";
import slackFill from "remixicon/icons/Logos/slack-fill.svg?raw";
import sparkling2Fill from "remixicon/icons/Weather/sparkling-2-fill.svg?raw";
import store3Line from "remixicon/icons/Buildings/store-3-line.svg?raw";
import table2 from "remixicon/icons/Editor/table-2.svg?raw";
import userStarFill from "remixicon/icons/User & Faces/user-star-fill.svg?raw";
import verifiedBadgeFill from "remixicon/icons/Business/verified-badge-fill.svg?raw";

const iconByName = {
  "ri-add-line": addLine,
  "ri-arrow-down-s-line": arrowDownSLine,
  "ri-bubble-chart-fill": bubbleChartFill,
  "ri-building-2-line": building2Line,
  "ri-calendar-2-fill": calendar2Fill,
  "ri-check-line": checkLine,
  "ri-checkbox-blank-circle-line": checkboxBlankCircleLine,
  "ri-checkbox-circle-fill": checkboxCircleFill,
  "ri-close-circle-fill": closeCircleFill,
  "ri-close-line": closeLine,
  "ri-customer-service-2-fill": customerService2Fill,
  "ri-drive-fill": driveFill,
  "ri-equalizer-2-line": equalizer2Line,
  "ri-file-word-2-fill": fileWord2Fill,
  "ri-global-line": globalLine,
  "ri-google-fill": googleFill,
  "ri-history-line": historyLine,
  "ri-inbox-2-line": inbox2Line,
  "ri-information-fill": informationFill,
  "ri-linkedin-box-fill": linkedinBoxFill,
  "ri-list-check-3": listCheck3,
  "ri-notion-fill": notionFill,
  "ri-search-eye-line": searchEyeLine,
  "ri-search-line": searchLine,
  "ri-settings-3-line": settings3Line,
  "ri-shield-check-fill": shieldCheckFill,
  "ri-shield-check-line": shieldCheckLine,
  "ri-slack-fill": slackFill,
  "ri-sparkling-2-fill": sparkling2Fill,
  "ri-store-3-line": store3Line,
  "ri-table-2": table2,
  "ri-user-star-fill": userStarFill,
  "ri-verified-badge-fill": verifiedBadgeFill,
};

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const industries = ["SaaS", "营销科技", "金融科技", "法律服务", "咨询服务", "其他"];
const audiences = ["中小型企业", "初创企业", "专业个人用户", "大型企业", "政府机构", "其他"];

const connectorOptions = [
  { id: "gmail", name: "Gmail", icon: "ri-google-fill", description: "读取邮件上下文并生成可直接发送的回复。", tone: "google" },
  { id: "calendar", name: "Google Calendar", icon: "ri-calendar-2-fill", description: "理解日程安排并为会议做好准备。", tone: "calendar" },
  { id: "hubspot", name: "HubSpot", icon: "ri-bubble-chart-fill", description: "把客户上下文带入销售工作流。", tone: "hubspot" },
  { id: "notion", name: "Notion", icon: "ri-notion-fill", description: "搜索并整理企业知识。", tone: "notion" },
  { id: "slack", name: "Slack", icon: "ri-slack-fill", description: "捕获团队上下文并发送进展。", tone: "slack" },
  { id: "linkedin", name: "LinkedIn", icon: "ri-linkedin-box-fill", description: "支持客户拓展与招聘工作流。", tone: "linkedin" },
];

const extraConnectorOptions = [
  { id: "drive", name: "Google Drive", icon: "ri-drive-fill", description: "读取授权文件和共享资料。", tone: "drive" },
  { id: "microsoft", name: "Microsoft 365", icon: "ri-file-word-2-fill", description: "处理文档、邮件和办公内容。", tone: "microsoft" },
  { id: "intercom", name: "Intercom", icon: "ri-customer-service-2-fill", description: "读取客户会话并同步服务进展。", tone: "intercom" },
  { id: "web", name: "Web", icon: "ri-global-line", description: "检索公开信息并保留来源。", tone: "web" },
  { id: "sheets", name: "Google Sheets", icon: "ri-table-2", description: "读取并整理结构化业务数据。", tone: "sheets" },
];

const configurationDefaults = {
  mia: { industry: "SaaS", audience: "中小型企业", cadence: "周", count: 20, action: "条高潜销售线索，并推动 5 个商机进入下一阶段" },
  lexi: { industry: "法律服务", audience: "中小型企业", cadence: "周", count: 10, action: "份合同审阅，清零高风险待确认事项" },
  nora: { industry: "咨询服务", audience: "大型企业", cadence: "周", count: 8, action: "场会议行动项梳理，并推动关键事项按时闭环" },
  avery: { industry: "SaaS", audience: "中小型企业", cadence: "周", count: 15, action: "个客户健康度检查，并输出续约风险建议" },
  owen: { industry: "咨询服务", audience: "大型企业", cadence: "周", count: 5, action: "份运营简报，定位关键异常并给出行动建议" },
  iris: { industry: "营销科技", audience: "初创企业", cadence: "周", count: 3, action: "份行业洞察报告，并附完整证据来源" },
};

const allConnectorOptions = [...connectorOptions, ...extraConnectorOptions];
const extraConnectorIds = new Set(extraConnectorOptions.map((item) => item.id));
const connectorIdByName = Object.fromEntries(allConnectorOptions.map((item) => [item.name, item.id]));

const employees = [
  {
    id: "mia",
    name: "Mia",
    role: "Revenue Partner",
    category: "销售",
    outcome: "持续发现并推进高质量销售机会",
    portrait: assetUrl("assets/mia.png"),
    workflows: ["线索识别", "跟进建议", "CRM 更新"],
    connectors: [
      ["ri-google-fill", "Gmail"],
      ["ri-bubble-chart-fill", "HubSpot"],
    ],
    permission: "需确认写入",
    autonomy: "propose",
    compatibility: "可立即雇佣",
    entitlement: "套餐内含",
    deliverables: ["机会优先级清单", "个性化跟进建议", "待确认的 CRM 更新"],
    description:
      "持续扫描已授权的 Gmail 与 HubSpot 数据，识别高价值机会，生成个性化跟进建议，并在你确认后更新 CRM。",
  },
  {
    id: "lexi",
    name: "Lexi",
    role: "AI Paralegal",
    category: "法务",
    outcome: "高效完成合同审查与风险识别",
    portrait: assetUrl("assets/lexi.png"),
    workflows: ["条款提取", "风险标注", "审查摘要"],
    connectors: [
      ["ri-drive-fill", "Google Drive"],
      ["ri-file-word-2-fill", "Microsoft 365"],
    ],
    permission: "私有只读",
    autonomy: "propose",
    compatibility: "需补充 1 项",
    entitlement: "套餐内含",
    deliverables: ["合同风险清单", "条款差异摘要", "可追溯审查意见"],
    description:
      "读取你授权的合同文档，提取关键条款与异常风险，输出带证据定位的审查摘要。",
  },
  {
    id: "nora",
    name: "Nora",
    role: "Meeting Operator",
    category: "会议与运营",
    outcome: "推动会议行动项按时落地",
    portrait: assetUrl("assets/nora.png"),
    workflows: ["会议提炼", "任务分配", "进度追踪"],
    connectors: [
      ["ri-calendar-2-fill", "Google Calendar"],
      ["ri-slack-fill", "Slack"],
    ],
    permission: "需确认写入",
    autonomy: "propose",
    compatibility: "可立即雇佣",
    entitlement: "套餐内含",
    deliverables: ["会议结论摘要", "责任清晰的行动项", "逾期风险提醒"],
    description:
      "把会议结论转化为明确行动项，持续追踪负责人、截止时间与阻塞，并生成进度回顾。",
  },
  {
    id: "avery",
    name: "Avery",
    role: "Customer Success",
    category: "客户成功",
    outcome: "识别客户风险并提升续约质量",
    portrait: assetUrl("assets/avery.png"),
    workflows: ["健康评分", "风险识别", "续约建议"],
    connectors: [
      ["ri-customer-service-2-fill", "Intercom"],
      ["ri-bubble-chart-fill", "HubSpot"],
    ],
    permission: "私有只读",
    autonomy: "observe",
    compatibility: "需补充 1 项",
    entitlement: "套餐内含",
    deliverables: ["客户健康清单", "流失风险原因", "续约行动建议"],
    description:
      "持续识别使用下降、反馈异常与续约风险，输出可解释的客户健康判断与行动建议。",
  },
  {
    id: "owen",
    name: "Owen",
    role: "Operations Partner",
    category: "会议与运营",
    outcome: "持续整理运营信息与异常",
    portrait: assetUrl("assets/owen.png"),
    workflows: ["信息汇总", "异常诊断", "运营简报"],
    connectors: [
      ["ri-table-2", "Google Sheets"],
      ["ri-notion-fill", "Notion"],
    ],
    permission: "私有只读",
    autonomy: "observe",
    compatibility: "可立即雇佣",
    entitlement: "套餐内含",
    deliverables: ["运营指标摘要", "异常事项清单", "每日决策简报"],
    description:
      "从运营表格和知识库中持续整理关键信息，发现异常变化，并生成面向决策的简报。",
  },
  {
    id: "iris",
    name: "Iris",
    role: "Research Analyst",
    category: "会议与运营",
    outcome: "提供有依据的行业与竞争洞察",
    portrait: assetUrl("assets/iris.png"),
    workflows: ["公开研究", "证据整理", "洞察报告"],
    connectors: [
      ["ri-global-line", "Web"],
      ["ri-drive-fill", "知识库"],
    ],
    permission: "公开信息",
    autonomy: "act",
    compatibility: "可立即雇佣",
    entitlement: "Beta",
    deliverables: ["行业动态摘要", "竞争情报卡片", "证据来源清单"],
    description:
      "基于公开来源和已授权知识库完成研究，输出结构化洞察，并保留每项结论的来源证据。",
  },
];

const categories = ["全部", "销售", "法务", "客户成功", "会议与运营"];

function Icon({ name, className = "" }) {
  return <i aria-hidden="true" className={`app-icon ${className}`} dangerouslySetInnerHTML={{ __html: iconByName[name] || "" }} />;
}

function Sidebar({ activeEmployees, currentEmployee, currentView, onChooseEmployee, onOpenMarket, onToast }) {
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const hasEmployees = activeEmployees.length > 0;

  const chooseEmployee = (employee) => {
    setSwitcherOpen(false);
    onChooseEmployee(employee);
  };

  return (
    <aside className="sidebar" aria-label="主导航">
      <button
        className={`employee-switcher ${switcherOpen ? "open" : ""}`}
        aria-expanded={switcherOpen}
        aria-haspopup="menu"
        onClick={() => {
          if (!hasEmployees) {
            onOpenMarket();
            onToast("聘用一位数字员工后，可在这里切换工作区");
            return;
          }
          setSwitcherOpen((current) => !current);
        }}
      >
        <span className="switcher-label">我的员工</span>
        <Icon name="ri-arrow-down-s-line" className="switcher-chevron" />
        <span className="switcher-row">
          {currentEmployee ? <img src={currentEmployee.portrait} alt={`${currentEmployee.name} 头像`} /> : <span className="switcher-empty-avatar"><Icon name="ri-user-star-fill" /></span>}
          <span>
            <strong>{currentEmployee ? currentEmployee.name : "暂未聘用员工"}</strong>
            <small>{currentEmployee ? currentEmployee.role : "前往人才市场聘用"}</small>
          </span>
          <Icon name="ri-equalizer-2-line" />
        </span>
      </button>

      {switcherOpen && hasEmployees && (
        <div className="employee-switch-menu" role="menu" aria-label="切换数字员工">
          <span className="switch-menu-title">在职员工</span>
          {activeEmployees.map((employee) => (
            <button
              type="button"
              role="menuitem"
              key={employee.id}
              className={currentEmployee?.id === employee.id && currentView === "workspace" ? "selected" : ""}
              onClick={() => chooseEmployee(employee)}
            >
              <img src={employee.portrait} alt="" />
              <span><strong>{employee.name}</strong><small>{employee.role}</small></span>
              {currentEmployee?.id === employee.id && currentView === "workspace" && <Icon name="ri-check-line" />}
            </button>
          ))}
          <button type="button" className="switch-menu-market" onClick={() => { setSwitcherOpen(false); onOpenMarket(); }}>
            <Icon name="ri-store-3-line" />浏览人才市场
          </button>
        </div>
      )}

      <nav className="side-nav">
        {[
          ["ri-inbox-2-line", "今日事项"],
          ["ri-list-check-3", "自动任务"],
          ["ri-history-line", "历史事项"],
          ["ri-building-2-line", "办公室"],
          ["ri-store-3-line", "人才市场"],
        ].map(([icon, label]) => (
          <button
            key={label}
            className={label === "人才市场" && currentView === "marketplace" ? "active" : ""}
            aria-current={label === "人才市场" && currentView === "marketplace" ? "page" : undefined}
            onClick={() => label === "人才市场" ? onOpenMarket() : onToast(`${label} 为演示导航`) }
          >
            <Icon name={icon} /><span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-user">
        <img src={assetUrl("assets/owen.png")} alt="Leo Zu" />
        <span><strong>Leo Zu</strong><small>免费版</small></span>
        <button aria-label="设置" onClick={() => onToast("设置为演示入口") }><Icon name="ri-settings-3-line" /></button>
      </div>
    </aside>
  );
}

function EmploymentStatus({ status, compact = false }) {
  if (!status) return null;
  return <span className={`employment-status ${status === "active" ? "active" : "suspended"} ${compact ? "compact" : ""}`}><span aria-hidden="true" />{status === "active" ? "在职中" : "停职中"}</span>;
}

function EmployeeCard({ employee, status, expanded, onEnter, onLeave, onDetails, onPrimaryAction }) {
  const isActive = status === "active";
  const isSuspended = status === "suspended";
  const primaryLabel = isActive ? "暂停聘用" : "立即聘用";
  const compatibility = isActive ? "正在主动工作" : isSuspended ? "自动任务已暂停，不产生 token 消耗" : employee.compatibility;

  return (
    <article
      className={`employee-card ${expanded ? "is-expanded" : ""} ${status ? `is-${status}` : ""}`}
      tabIndex="0"
      aria-label={`${employee.name} ${employee.role}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onLeave();
      }}
    >
      <EmploymentStatus status={status} />
      <span className="limited-free-badge" aria-label="限时免费">限免</span>
      <div className="employee-card-core">
        <img className="employee-portrait" src={employee.portrait} alt={`${employee.name} 头像`} />
        <div className="employee-card-copy">
          <h2>{employee.name}</h2>
          <p className="employee-role">{employee.role}</p>
          <p className="employee-outcome">{employee.outcome}</p>
          <span className="verified-pill"><Icon name="ri-verified-badge-fill" /> Alloomi Verified</span>
        </div>
      </div>

      <div className="hover-details" aria-hidden={!expanded}>
        <div className="detail-row"><strong>核心工作流：</strong><span>{employee.workflows.join(" / ")}</span></div>
        <div className="detail-row"><strong>推荐：</strong><span>{employee.connectors.map((item) => item[1]).join(" + ")}</span></div>
        <div className={`compatibility ${isSuspended ? "paused" : compatibility.includes("立即") || isActive ? "ready" : "action"}`}>
          <Icon name={isSuspended ? "ri-information-fill" : compatibility.includes("立即") || isActive ? "ri-checkbox-circle-fill" : "ri-information-fill"} />
          {compatibility}
        </div>
        <div className="card-footer">
          <div className="card-badges"><span>Alloomi Verified</span><span>{employee.entitlement}</span></div>
          <div className="card-actions">
            <button className="button secondary small" onClick={(event) => { event.stopPropagation(); onDetails(employee); }}>查看详情</button>
            <button className={`button ${isActive ? "warning" : "primary"} small`} onClick={(event) => { event.stopPropagation(); onPrimaryAction(employee); }}>{primaryLabel}</button>
          </div>
        </div>
      </div>
    </article>
  );
}

function DetailDrawer({ employee, status, onClose, onPrimaryAction, onDismiss }) {
  const [expandedWorkflow, setExpandedWorkflow] = useState(0);
  if (!employee) return null;
  const isActive = status === "active";
  const isSuspended = status === "suspended";
  const primaryLabel = isActive ? "暂停聘用" : "立即聘用";
  return (
    <div className="overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="detail-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <header className="drawer-header">
          <button className="icon-button" aria-label="关闭详情" onClick={onClose}><Icon name="ri-close-line" /></button>
          <span className="drawer-eyebrow">数字员工档案</span>
          <div className="drawer-identity">
            <img src={employee.portrait} alt={`${employee.name} 头像`} />
            <div><h2 id="drawer-title">{employee.name}</h2><p>{employee.role}</p></div>
          </div>
          <div className="drawer-badges"><span className="verified-pill"><Icon name="ri-verified-badge-fill" /> Alloomi Verified</span><EmploymentStatus status={status} compact /></div>
        </header>

        <div className="drawer-scroll">
          <section className="drawer-section result-contract">
            <span>管理的结果</span>
            <h3>{employee.outcome}</h3>
            <p>{employee.description}</p>
          </section>

          <section className="drawer-section">
            <h3>典型工作流</h3>
            <div className="workflow-list">
              {employee.workflows.map((item, index) => (
                <button key={item} className={expandedWorkflow === index ? "open" : ""} onClick={() => setExpandedWorkflow(index)}>
                  <span className="workflow-index">0{index + 1}</span><strong>{item}</strong><Icon name="ri-arrow-down-s-line" />
                  {expandedWorkflow === index && <small>读取授权范围内的上下文，生成可核验建议；涉及写入或外发时等待你的确认。</small>}
                </button>
              ))}
            </div>
          </section>

          <section className="compat-card">
            <div><Icon name={isSuspended ? "ri-information-fill" : "ri-shield-check-fill"} /><span><strong>{isActive ? "正在为你工作" : isSuspended ? "任务已暂停" : employee.compatibility}</strong><small>{isActive ? "主动式任务与有效自动任务正在运行" : isSuspended ? "不再主动工作，自动任务也不会产生 token 消耗" : "将使用当前连接器与权限范围进入员工配置"}</small></span></div>
            {!isActive && !isSuspended && <button className="text-button" onClick={() => onPrimaryAction(employee)}>开始配置</button>}
          </section>

          {(isActive || isSuspended) && <section className="drawer-section lifecycle-notice"><h3>员工状态说明</h3><p>{isActive ? "当前员工已在 Alloomi 首页左上角展示。你可切换进入该员工对应的工作区。" : "该员工暂不在首页员工列表中展示；重新聘用后，主动式任务和有效期内的自动任务将恢复。"}</p></section>}
        </div>

        <footer className="drawer-actions">
          <button className="button secondary" onClick={onClose}>返回市场</button>
          {(isActive || isSuspended) && <button className="button danger-secondary" onClick={() => onDismiss(employee)}>立即解聘</button>}
          <button className={`button ${isActive ? "warning" : "primary"}`} onClick={() => onPrimaryAction(employee)}>{primaryLabel}</button>
        </footer>
      </section>
    </div>
  );
}

function HireFlow({ employee, onClose, onComplete }) {
  const initialConfiguration = configurationDefaults[employee?.id] || configurationDefaults.mia;
  const [phase, setPhase] = useState("configure");
  const [name, setName] = useState(employee ? employee.name : "");
  const [industry, setIndustry] = useState(initialConfiguration.industry);
  const [audience, setAudience] = useState(initialConfiguration.audience);
  const [goalCadence, setGoalCadence] = useState(initialConfiguration.cadence);
  const [goalCount, setGoalCount] = useState(initialConfiguration.count);
  const [goalAction, setGoalAction] = useState(initialConfiguration.action);
  const [selectedConnectorIds, setSelectedConnectorIds] = useState(["gmail", "hubspot"]);
  const [showMoreConnectors, setShowMoreConnectors] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(employee?.portrait || "");
  const [progress, setProgress] = useState(8);
  const modalRef = useRef(null);

  useEffect(() => {
    const defaults = configurationDefaults[employee?.id] || configurationDefaults.mia;
    const employeeConnectorIds = (employee?.connectors || []).map((item) => connectorIdByName[item[1]]).filter(Boolean);
    setPhase("configure");
    setName(employee?.name || "");
    setIndustry(defaults.industry);
    setAudience(defaults.audience);
    setGoalCadence(defaults.cadence);
    setGoalCount(defaults.count);
    setGoalAction(defaults.action);
    setSelectedConnectorIds(employeeConnectorIds.length ? employeeConnectorIds : ["gmail", "hubspot"]);
    setShowMoreConnectors(employeeConnectorIds.some((id) => extraConnectorIds.has(id)));
    setAvatarPreview(employee?.portrait || "");
    setProgress(8);
  }, [employee]);

  useEffect(() => {
    if (phase !== "initializing") return undefined;
    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + 12);
        if (next >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setPhase("success"), 350);
        }
        return next;
      });
    }, 320);
    return () => window.clearInterval(timer);
  }, [phase]);

  if (!employee) return null;

  const visibleConnectorOptions = showMoreConnectors ? allConnectorOptions : connectorOptions;
  const selectedConnectorNames = allConnectorOptions.filter((item) => selectedConnectorIds.includes(item.id)).map((item) => item.name);
  const goalSummary = `每${goalCadence}完成 ${goalCount || 0} ${goalAction}`;
  const toggleConnector = (connectorId) => {
    setSelectedConnectorIds((current) => current.includes(connectorId) ? current.filter((item) => item !== connectorId) : [...current, connectorId]);
  };
  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(String(reader.result || employee.portrait));
    reader.readAsDataURL(file);
  };

  const titles = {
    configure: "配置你的数字员工",
    review: "确认雇佣信息",
    initializing: "正在创建并初始化",
    success: "数字员工已准备好",
  };

  return (
    <div className="overlay strong" role="presentation">
      <section ref={modalRef} className={`hire-modal ${phase === "configure" ? "wide" : ""}`} role="dialog" aria-modal="true" aria-labelledby="hire-title">
        <header className="hire-header">
          <div className="hire-identity"><img src={avatarPreview || employee.portrait} alt="" /><span><small>正在雇佣</small><strong>{employee.name} · {employee.role}</strong></span></div>
          <button className="icon-button" aria-label="关闭雇佣流程" onClick={onClose}><Icon name="ri-close-line" /></button>
        </header>

        <div className="hire-body">
          <div className="progress-steps" aria-label="雇佣步骤">
            {["配置员工", "确认创建"].map((step, index) => {
              const activeIndex = phase === "configure" ? 0 : 1;
              return <span key={step} className={index <= activeIndex ? "active" : ""}><b>{index < activeIndex ? <Icon name="ri-check-line" /> : index + 1}</b>{step}</span>;
            })}
          </div>

          <div className="hire-title-block">
            <h2 id="hire-title">{titles[phase]}</h2>
            <p>{phase === "configure" ? "完善员工资料、业务目标和推荐连接器。" : phase === "review" ? "创建后将开始同步最小必要上下文并生成首份工作计划。" : phase === "initializing" ? "你可以安全离开，后台会继续完成初始化。" : "首份工作计划已经生成，可以进入员工工作区。"}</p>
          </div>

          {phase === "configure" && (
            <form className="configuration-form" onSubmit={(event) => { event.preventDefault(); setPhase("review"); }}>
              <div className="configuration-profile-grid">
                <div className="configuration-profile-fields">
                  <label className="employee-name-field">
                    <span>AI 员工名称 <em>*</em></span>
                    <input value={name} onChange={(event) => setName(event.target.value)} aria-label="AI 员工名称" />
                  </label>

                  <fieldset className="choice-field">
                    <legend>行业</legend>
                    <div className="choice-chips" aria-label="行业">
                      {industries.map((item) => <button type="button" aria-pressed={industry === item} className={industry === item ? "selected" : ""} key={item} onClick={() => setIndustry(item)}>{item}</button>)}
                    </div>
                  </fieldset>

                  <fieldset className="choice-field">
                    <legend>目标客户群体</legend>
                    <div className="choice-chips" aria-label="目标客户群体">
                      {audiences.map((item) => <button type="button" aria-pressed={audience === item} className={audience === item ? "selected" : ""} key={item} onClick={() => setAudience(item)}>{item}</button>)}
                    </div>
                  </fieldset>
                </div>

                <label className="employee-avatar-field">
                  <span className="employee-avatar-label">AI 员工头像</span>
                  <input className="sr-only" type="file" accept="image/*" aria-label="更换AI员工头像" onChange={handleAvatarChange} />
                  <span className="employee-avatar-card">
                    <span className="employee-avatar-image">
                      <img src={avatarPreview || employee.portrait} alt={`${name || employee.name} AI员工头像`} />
                      <span className="avatar-change-prompt">点击更换头像</span>
                    </span>
                    <strong>{name || employee.name}</strong>
                    <small>{employee.role}</small>
                  </span>
                </label>
              </div>

              <fieldset className="goal-field">
                <legend>设定目标 <em>*</em></legend>
                <div className="goal-composer">
                  <label className="goal-period">
                    <span className="sr-only">目标周期</span>
                    <select value={goalCadence} onChange={(event) => setGoalCadence(event.target.value)} aria-label="目标周期">
                      <option value="日">日</option>
                      <option value="周">周</option>
                      <option value="月">月</option>
                    </select>
                  </label>
                  <span>完成</span>
                  <input className="goal-count" type="number" min="1" value={goalCount} onChange={(event) => setGoalCount(Number(event.target.value))} aria-label="目标数量" />
                  <input className="goal-action" value={goalAction} onChange={(event) => setGoalAction(event.target.value)} aria-label="目标描述" />
                </div>
              </fieldset>

              <fieldset className="recommended-connectors-field">
                <legend>推荐连接器</legend>
                <p className="field-hint">根据员工目标推荐，可按需增减。</p>
                <div className="recommended-connectors">
                  {visibleConnectorOptions.map((connector) => {
                    const selected = selectedConnectorIds.includes(connector.id);
                    return (
                      <button type="button" className={`recommended-connector ${selected ? "selected" : ""}`} aria-pressed={selected} key={connector.id} onClick={() => toggleConnector(connector.id)}>
                        <span className={`connector-logo ${connector.tone}`}><Icon name={connector.icon} /></span>
                        <span className="connector-copy"><strong>{connector.name}</strong><small>{connector.description}</small></span>
                        <span className="connector-toggle"><Icon name={selected ? "ri-check-line" : "ri-add-line"} /></span>
                      </button>
                    );
                  })}
                </div>
                <button type="button" className="more-connectors" onClick={() => setShowMoreConnectors((current) => !current)}>
                  <span className="connector-stack"><Icon name="ri-linkedin-box-fill" /><Icon name="ri-notion-fill" /><Icon name="ri-slack-fill" /></span>
                  {showMoreConnectors ? "收起更多连接器" : "更多连接器"}
                  <Icon name="ri-arrow-down-s-line" className={showMoreConnectors ? "rotate" : ""} />
                </button>
              </fieldset>
              <button className="sr-submit" type="submit">继续</button>
            </form>
          )}

          {phase === "review" && (
            <div className="review-card">
              <div className="review-avatar"><span>AI 员工头像</span><strong><img src={avatarPreview || employee.portrait} alt="" />{name}</strong></div>
              <div><span>员工</span><strong>{name} · {employee.role}</strong></div>
              <div><span>行业</span><strong>{industry}</strong></div>
              <div><span>目标客户群体</span><strong>{audience}</strong></div>
              <div><span>设定目标</span><strong>{goalSummary}</strong></div>
              <div><span>推荐连接器</span><strong>{selectedConnectorNames.join(" + ")}</strong></div>
              <div><span>套餐影响</span><strong>套餐内含 · 占用 1 个员工额度</strong></div>
            </div>
          )}

          {phase === "initializing" && (
            <div className="initialization-state">
              <div className="initialization-progress" aria-label={`初始化进度 ${progress}%`}>
                <div className="initialization-progress-heading"><strong>初始化进度</strong><span>{progress}%</span></div>
                <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
                <small>正在安全同步最小必要上下文</small>
              </div>
              <div className="initialization-copy">
                {["创建员工实例", "同步连接器范围", "诊断数据准备度", "生成首份工作计划"].map((item, index) => {
                  const threshold = [20, 45, 70, 95][index];
                  return <div key={item} className={progress >= threshold ? "complete" : progress + 18 >= threshold ? "current" : ""}><Icon name={progress >= threshold ? "ri-checkbox-circle-fill" : "ri-checkbox-blank-circle-line"} />{item}</div>;
                })}
              </div>
            </div>
          )}

          {phase === "success" && (
            <div className="success-state">
              <span><Icon name="ri-user-star-fill" /></span>
              <h3>{name} 已加入你的工作区</h3>
              <p>已生成首份工作计划，所有高风险动作仍需你的确认。</p>
              <div className="first-plan"><Icon name="ri-sparkling-2-fill" /><span><strong>首份工作计划</strong><small>识别本周最值得跟进的销售机会，并准备 3 条个性化建议。</small></span></div>
            </div>
          )}
        </div>

        <footer className="hire-actions">
          {phase === "configure" && <><button className="button secondary" onClick={onClose}>取消</button><button className="button primary" disabled={!goalAction.trim() || !name.trim() || !industry || !audience || selectedConnectorIds.length === 0} onClick={() => setPhase("review")}>继续确认</button></>}
          {phase === "review" && <><button className="button secondary" onClick={() => setPhase("configure")}>返回修改</button><button className="button primary" onClick={() => setPhase("initializing")}>确认雇佣</button></>}
          {phase === "success" && <button className="button primary full" onClick={() => onComplete({ ...employee, name: name.trim() || employee.name })}>进入员工工作区</button>}
        </footer>
      </section>
    </div>
  );
}

function LifecycleConfirm({ type, employee, onClose, onConfirm }) {
  if (!type || !employee) return null;
  const isPause = type === "pause";
  const title = isPause ? `暂停聘用 ${employee.name}？` : `立即解聘 ${employee.name}？`;
  const description = isPause
    ? `暂停聘用后，${employee.name} 将不再主动工作，你可以随时聘用 ${employee.name}。`
    : `解聘后，${employee.name} 的记忆不会丢失，但自动任务等配置信息将恢复初始状态。`;
  const details = isPause
    ? ["主动式任务将停止", "该员工下的自动任务将自动暂停", "暂停期间不产生 token 消耗", "重新聘用后，有效期内的自动任务会恢复"]
    : ["生成一份交接文档（handoff）并保存为记忆", "自动任务与员工配置恢复为初始状态", "历史事项中将不再展示该员工的历史任务", "员工卡片恢复为未聘用状态"];
  const icon = isPause ? "ri-history-line" : "ri-close-circle-fill";
  const action = isPause ? "确认暂停聘用" : "确认立即解聘";

  return (
    <div className="overlay strong" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`lifecycle-modal ${isPause ? "pause" : "dismiss"}`} role="dialog" aria-modal="true" aria-labelledby="lifecycle-title">
        <button className="icon-button lifecycle-close" aria-label="关闭确认窗口" onClick={onClose}><Icon name="ri-close-line" /></button>
        <div className="lifecycle-icon"><Icon name={icon} /></div>
        <h2 id="lifecycle-title">{title}</h2>
        <p className="lifecycle-description">{description}</p>
        <div className="lifecycle-impact">
          <span>{isPause ? "暂停后将发生" : "解聘后将发生"}</span>
          <ul>{details.map((item) => <li key={item}><Icon name={isPause ? "ri-checkbox-circle-fill" : "ri-information-fill"} />{item}</li>)}</ul>
        </div>
        <div className="lifecycle-actions">
          <button className="button secondary" onClick={onClose}>取消</button>
          <button className={`button ${isPause ? "warning" : "danger"}`} onClick={onConfirm}>{action}</button>
        </div>
      </section>
    </div>
  );
}

function Workspace({ employee, onBackToMarket, onToast }) {
  if (!employee) return null;
  return (
    <main className="workspace-view">
      <div className="workspace-topbar">
        <button className="workspace-back" onClick={onBackToMarket}><Icon name="ri-store-3-line" />返回人才市场</button>
        <span>当前工作区</span>
      </div>
      <section className="workspace-hero">
        <div className="workspace-identity">
          <img src={employee.portrait} alt={`${employee.name} 头像`} />
          <div><span>数字员工工作区</span><h1>{employee.name}</h1><p>{employee.role} · {employee.outcome}</p></div>
        </div>
        <EmploymentStatus status="active" />
      </section>
      <section className="workspace-grid">
        <article className="workspace-card current-plan"><div className="workspace-card-heading"><span><Icon name="ri-sparkling-2-fill" />本周工作计划</span><button onClick={() => onToast("工作计划详情为演示内容")}>查看全部</button></div><h2>{employee.workflows[0]}</h2><p>正在基于已授权上下文梳理最优先事项，完成后会在今日事项中提醒你确认。</p><div className="workspace-progress"><span style={{ width: "68%" }} /><small>进行中 · 68%</small></div></article>
        <article className="workspace-card"><div className="workspace-card-heading"><span><Icon name="ri-list-check-3" />自动任务</span><button onClick={() => onToast("自动任务为演示入口")}>管理</button></div><strong>3 个任务正常运行</strong><p>所有高风险写入与外发动作均会等待你的确认。</p></article>
        <article className="workspace-card"><div className="workspace-card-heading"><span><Icon name="ri-history-line" />历史事项</span><button onClick={() => onToast("历史事项为演示入口")}>查看</button></div><strong>已保留历史任务与决策记录</strong><p>暂停后仍可进入此处查看历史任务；解聘后历史任务会隐藏，交接文档会保存为记忆。</p></article>
      </section>
    </main>
  );
}

function EmptyState({ query, onClear }) {
  return (
    <div className="empty-state"><Icon name="ri-search-eye-line" /><h2>没有找到匹配的数字员工</h2><p>未找到与“{query}”完全匹配的结果，可以清除条件查看全部员工。</p><button className="button secondary" onClick={onClear}>清除搜索</button></div>
  );
}

export function App() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState("mia");
  const [detailEmployee, setDetailEmployee] = useState(null);
  const [hireEmployee, setHireEmployee] = useState(null);
  const [employment, setEmployment] = useState({});
  const [lifecycleAction, setLifecycleAction] = useState(null);
  const [workspaceEmployee, setWorkspaceEmployee] = useState(null);
  const [view, setView] = useState("marketplace");
  const [toast, setToast] = useState("");

  const activeEmployees = useMemo(() => employees.filter((employee) => employment[employee.id] === "active"), [employment]);
  const currentEmployee = workspaceEmployee && employment[workspaceEmployee.id] === "active" ? workspaceEmployee : activeEmployees[0] || null;

  const filteredEmployees = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return employees.filter((employee) => {
      const categoryMatch = category === "全部" || employee.category === category;
      const text = [employee.name, employee.role, employee.outcome, employee.workflows.join(" "), employee.connectors.map((item) => item[1]).join(" ")].join(" ").toLowerCase();
      return categoryMatch && (!normalized || text.includes(normalized));
    });
  }, [category, query]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!filteredEmployees.some((employee) => employee.id === expandedId)) setExpandedId(null);
  }, [filteredEmployees, expandedId]);

  const openMarket = () => {
    setView("marketplace");
    setDetailEmployee(null);
  };

  const enterWorkspace = (employee) => {
    setWorkspaceEmployee(employee);
    setView("workspace");
  };

  const requestPrimaryAction = (employee) => {
    const status = employment[employee.id];
    if (status === "active") {
      setDetailEmployee(null);
      setLifecycleAction({ type: "pause", employee });
      return;
    }
    if (status === "suspended") {
      setEmployment((current) => ({ ...current, [employee.id]: "active" }));
      setWorkspaceEmployee(employee);
      setDetailEmployee(null);
      setToast(`${employee.name} 已重新聘用，主动式任务与有效自动任务已恢复`);
      return;
    }
    setDetailEmployee(null);
    setHireEmployee(employee);
  };

  const confirmLifecycleAction = () => {
    if (!lifecycleAction) return;
    const { type, employee } = lifecycleAction;
    if (type === "pause") {
      setEmployment((current) => ({ ...current, [employee.id]: "suspended" }));
      if (workspaceEmployee?.id === employee.id) setWorkspaceEmployee(null);
      setView("marketplace");
      setToast(`${employee.name} 已暂停聘用，自动任务已暂停且不再产生 token 消耗`);
    } else {
      setEmployment((current) => {
        const next = { ...current };
        delete next[employee.id];
        return next;
      });
      if (workspaceEmployee?.id === employee.id) setWorkspaceEmployee(null);
      setView("marketplace");
      setToast(`${employee.name} 已解聘，交接文档已保存为记忆`);
    }
    setLifecycleAction(null);
  };

  return (
    <div className="app-shell">
      <Sidebar activeEmployees={activeEmployees} currentEmployee={currentEmployee} currentView={view} onChooseEmployee={enterWorkspace} onOpenMarket={openMarket} onToast={setToast} />
      {view === "workspace" && currentEmployee ? <Workspace employee={currentEmployee} onBackToMarket={openMarket} onToast={setToast} /> : <main className="marketplace">
        <header className="market-header">
          <div><h1>数字员工人才市场</h1><p>选择一位对业务结果负责的 AI 同事</p></div>
          <label className="search-box"><Icon name="ri-search-line" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索数字员工或岗位" aria-label="搜索数字员工或岗位" />{query && <button onClick={() => setQuery("")} aria-label="清除搜索"><Icon name="ri-close-circle-fill" /></button>}</label>
        </header>

        <div className="category-tabs" role="tablist" aria-label="员工分类">
          {categories.map((item) => <button role="tab" aria-selected={category === item} className={category === item ? "active" : ""} key={item} onClick={() => { setCategory(item); setExpandedId(null); }}>{item}</button>)}
        </div>

        {filteredEmployees.length ? (
          <section className="employee-grid" aria-label="数字员工列表">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                status={employment[employee.id]}
                expanded={expandedId === employee.id}
                onEnter={() => setExpandedId(employee.id)}
                onLeave={() => setExpandedId(null)}
                onDetails={setDetailEmployee}
                onPrimaryAction={requestPrimaryAction}
              />
            ))}
          </section>
        ) : <EmptyState query={query || category} onClear={() => { setQuery(""); setCategory("全部"); }} />}
      </main>}

      <DetailDrawer employee={detailEmployee} status={detailEmployee ? employment[detailEmployee.id] : undefined} onClose={() => setDetailEmployee(null)} onPrimaryAction={requestPrimaryAction} onDismiss={(employee) => { setDetailEmployee(null); setLifecycleAction({ type: "dismiss", employee }); }} />
      <HireFlow employee={hireEmployee} onClose={() => setHireEmployee(null)} onComplete={(employee) => { setEmployment((current) => ({ ...current, [employee.id]: "active" })); setHireEmployee(null); enterWorkspace(employee); setToast(`${employee.name} 已加入员工工作区`); }} />
      <LifecycleConfirm type={lifecycleAction?.type} employee={lifecycleAction?.employee} onClose={() => setLifecycleAction(null)} onConfirm={confirmLifecycleAction} />
      <div className={`toast ${toast ? "show" : ""}`} role="status"><Icon name="ri-checkbox-circle-fill" />{toast}</div>
    </div>
  );
}
