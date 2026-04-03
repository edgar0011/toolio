import createElement from "lucide/dist/esm/createElement.js";
import Rocket from "lucide/dist/esm/icons/rocket.js";
import Users from "lucide/dist/esm/icons/users.js";
import TrendingUp from "lucide/dist/esm/icons/trending-up.js";
import Zap from "lucide/dist/esm/icons/zap.js";
import ChartBar from "lucide/dist/esm/icons/chart-bar.js";
import Shield from "lucide/dist/esm/icons/shield.js";
import LayoutDashboard from "lucide/dist/esm/icons/layout-dashboard.js";
import Clock from "lucide/dist/esm/icons/clock.js";
import Plug from "lucide/dist/esm/icons/plug.js";
import FileText from "lucide/dist/esm/icons/file-text.js";
import Bot from "lucide/dist/esm/icons/bot.js";
import Code from "lucide/dist/esm/icons/code.js";
import Link from "lucide/dist/esm/icons/link.js";
import Settings from "lucide/dist/esm/icons/settings.js";
import MessageCircle from "lucide/dist/esm/icons/message-circle.js";
import Repeat from "lucide/dist/esm/icons/repeat.js";
import ChartLine from "lucide/dist/esm/icons/chart-line.js";
import RefreshCw from "lucide/dist/esm/icons/refresh-cw.js";
import Sparkles from "lucide/dist/esm/icons/sparkles.js";
import Building from "lucide/dist/esm/icons/building.js";
import Crown from "lucide/dist/esm/icons/crown.js";
import Package from "lucide/dist/esm/icons/package.js";
import Heart from "lucide/dist/esm/icons/heart.js";
import Quote from "lucide/dist/esm/icons/quote.js";
import Play from "lucide/dist/esm/icons/play.js";
import Video from "lucide/dist/esm/icons/video.js";
import BookOpen from "lucide/dist/esm/icons/book-open.js";
import MessageSquare from "lucide/dist/esm/icons/message-square.js";
import PenTool from "lucide/dist/esm/icons/pen-tool.js";
import Mail from "lucide/dist/esm/icons/mail.js";
import Target from "lucide/dist/esm/icons/target.js";
import Calendar from "lucide/dist/esm/icons/calendar.js";
import Globe from "lucide/dist/esm/icons/globe.js";
import GitFork from "lucide/dist/esm/icons/git-fork.js";
import Banknote from "lucide/dist/esm/icons/banknote.js";
import Bell from "lucide/dist/esm/icons/bell.js";
import Terminal from "lucide/dist/esm/icons/terminal.js";
import ClipboardList from "lucide/dist/esm/icons/clipboard-list.js";

type IconNode = [string, Record<string, string | number>, unknown[]?][];

const ICONS: Record<string, IconNode> = {
  rocket: Rocket,
  users: Users,
  "trending-up": TrendingUp,
  zap: Zap,
  "chart-bar": ChartBar,
  shield: Shield,
  "layout-dashboard": LayoutDashboard,
  clock: Clock,
  plug: Plug,
  "file-text": FileText,
  bot: Bot,
  code: Code,
  link: Link,
  settings: Settings,
  "message-circle": MessageCircle,
  repeat: Repeat,
  "chart-line": ChartLine,
  "refresh-cw": RefreshCw,
  sparkles: Sparkles,
  building: Building,
  crown: Crown,
  package: Package,
  heart: Heart,
  quote: Quote,
  play: Play,
  video: Video,
  "book-open": BookOpen,
  "message-square": MessageSquare,
  "pen-tool": PenTool,
  mail: Mail,
  target: Target,
  calendar: Calendar,
  globe: Globe,
  "git-fork": GitFork,
  banknote: Banknote,
  bell: Bell,
  terminal: Terminal,
  "clipboard-list": ClipboardList,
};

class ContentSquare extends HTMLElement {
  connectedCallback() {
    const heading = this.getAttribute("heading") ?? "";
    const text = this.getAttribute("text") ?? "";
    const iconName = this.getAttribute("icon") ?? "";
    const sectionIndex = parseInt(
      this.closest("content-section")?.getAttribute("section-index") ?? "0",
    );

    const isDarkSection = sectionIndex % 2 === 1;
    const iconColorClass = isDarkSection ? "text-[#6db0e0]" : "text-toolio-dark";
    const cardClasses = isDarkSection
      ? "bg-white/[0.08] border border-white/[0.12] shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
      : "bg-white shadow-[0_1px_3px_rgba(0,51,102,0.08),0_1px_2px_rgba(0,51,102,0.06)]";
    const headingColor = isDarkSection ? "text-white" : "text-toolio-dark";
    const textColor = isDarkSection ? "text-toolio-200" : "text-toolio-500";

    this.innerHTML = `
      <div class="rounded-2xl flex flex-col justify-start p-[clamp(1.25rem,2.5dvw,2.5rem)] min-h-[clamp(160px,22dvh,260px)] opacity-0 -translate-y-5 transition-all duration-500 ease-out ${cardClasses}" data-card>
        ${iconName ? `<div class="mb-4 ${iconColorClass}" data-icon-slot></div>` : ""}
        <h3 class="font-semibold ${headingColor} text-[clamp(1rem,1.8dvw,1.25rem)] mb-3">${heading}</h3>
        <p class="${textColor} leading-relaxed text-[clamp(0.8rem,1.3dvw,0.95rem)]">${text}</p>
      </div>
    `;

    if (iconName) {
      const iconNode = ICONS[iconName];
      if (iconNode) {
        const iconEl = createElement(iconNode, {
          width: 28,
          height: 28,
          "stroke-width": 1.5,
        });
        this.querySelector("[data-icon-slot]")?.appendChild(iconEl);
      }
    }

    const card = this.querySelector("[data-card]") as HTMLElement;
    const restShadow = isDarkSection
      ? "0 1px 3px rgba(0,0,0,0.2)"
      : "0 1px 3px rgba(0,51,102,0.08), 0 1px 2px rgba(0,51,102,0.06)";
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
      card.style.boxShadow =
        "0 8px 24px rgba(0,51,102,0.15), 0 4px 8px rgba(0,51,102,0.1)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = restShadow;
    });
  }
}

customElements.define("content-square", ContentSquare);
