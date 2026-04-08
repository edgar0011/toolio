import Banknote from 'lucide/dist/esm/icons/banknote.js'
import Bell from 'lucide/dist/esm/icons/bell.js'
import BookOpen from 'lucide/dist/esm/icons/book-open.js'
import Bot from 'lucide/dist/esm/icons/bot.js'
import Building from 'lucide/dist/esm/icons/building.js'
import Calendar from 'lucide/dist/esm/icons/calendar.js'
import ChartBar from 'lucide/dist/esm/icons/chart-bar.js'
import ChartLine from 'lucide/dist/esm/icons/chart-line.js'
import ClipboardList from 'lucide/dist/esm/icons/clipboard-list.js'
import Clock from 'lucide/dist/esm/icons/clock.js'
import Code from 'lucide/dist/esm/icons/code.js'
import Crown from 'lucide/dist/esm/icons/crown.js'
import FileText from 'lucide/dist/esm/icons/file-text.js'
import GitFork from 'lucide/dist/esm/icons/git-fork.js'
import Globe from 'lucide/dist/esm/icons/globe.js'
import Heart from 'lucide/dist/esm/icons/heart.js'
import LayoutDashboard from 'lucide/dist/esm/icons/layout-dashboard.js'
import Link from 'lucide/dist/esm/icons/link.js'
import Mail from 'lucide/dist/esm/icons/mail.js'
import MessageCircle from 'lucide/dist/esm/icons/message-circle.js'
import MessageSquare from 'lucide/dist/esm/icons/message-square.js'
import Package from 'lucide/dist/esm/icons/package.js'
import PenTool from 'lucide/dist/esm/icons/pen-tool.js'
import Play from 'lucide/dist/esm/icons/play.js'
import Plug from 'lucide/dist/esm/icons/plug.js'
import Quote from 'lucide/dist/esm/icons/quote.js'
import RefreshCw from 'lucide/dist/esm/icons/refresh-cw.js'
import Repeat from 'lucide/dist/esm/icons/repeat.js'
import Rocket from 'lucide/dist/esm/icons/rocket.js'
import Settings from 'lucide/dist/esm/icons/settings.js'
import Shield from 'lucide/dist/esm/icons/shield.js'
import Sparkles from 'lucide/dist/esm/icons/sparkles.js'
import Target from 'lucide/dist/esm/icons/target.js'
import Terminal from 'lucide/dist/esm/icons/terminal.js'
import TrendingUp from 'lucide/dist/esm/icons/trending-up.js'
import Users from 'lucide/dist/esm/icons/users.js'
import Video from 'lucide/dist/esm/icons/video.js'
import Zap from 'lucide/dist/esm/icons/zap.js'

export type IconNode = [string, Record<string, string | number>, unknown[]?][]

export const ICONS: Record<string, IconNode> = {
  rocket: Rocket,
  users: Users,
  'trending-up': TrendingUp,
  zap: Zap,
  'chart-bar': ChartBar,
  shield: Shield,
  'layout-dashboard': LayoutDashboard,
  clock: Clock,
  plug: Plug,
  'file-text': FileText,
  bot: Bot,
  code: Code,
  link: Link,
  settings: Settings,
  'message-circle': MessageCircle,
  repeat: Repeat,
  'chart-line': ChartLine,
  'refresh-cw': RefreshCw,
  sparkles: Sparkles,
  building: Building,
  crown: Crown,
  package: Package,
  heart: Heart,
  quote: Quote,
  play: Play,
  video: Video,
  'book-open': BookOpen,
  'message-square': MessageSquare,
  'pen-tool': PenTool,
  mail: Mail,
  target: Target,
  calendar: Calendar,
  globe: Globe,
  'git-fork': GitFork,
  banknote: Banknote,
  bell: Bell,
  terminal: Terminal,
  'clipboard-list': ClipboardList,
}

export const COLOR_MAP: Record<string, { icon: string; bg: string; title: string }> = {
  violet: { icon: '#7c3aed', bg: '#ede9fe', title: '#7c3aed' },
  teal: { icon: '#0d9488', bg: '#e0f5f1', title: '#0d9488' },
  blue: { icon: '#2563eb', bg: '#e0ecfc', title: '#2563eb' },
  amber: { icon: '#d97706', bg: '#fef3c7', title: '#d97706' },
  rose: { icon: '#e11d48', bg: '#fce4ec', title: '#e11d48' },
  gray: { icon: '#6b7280', bg: '#f3f4f6', title: '#6b7280' },
}
