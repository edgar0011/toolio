import Activity from 'lucide/dist/esm/icons/activity.js'
import Banknote from 'lucide/dist/esm/icons/banknote.js'
import Bell from 'lucide/dist/esm/icons/bell.js'
import BookOpen from 'lucide/dist/esm/icons/book-open.js'
import Bot from 'lucide/dist/esm/icons/bot.js'
import Box from 'lucide/dist/esm/icons/box.js'
import Building from 'lucide/dist/esm/icons/building.js'
import Calendar from 'lucide/dist/esm/icons/calendar.js'
import ChartBar from 'lucide/dist/esm/icons/chart-bar.js'
import ChartLine from 'lucide/dist/esm/icons/chart-line.js'
import CircleCheck from 'lucide/dist/esm/icons/circle-check.js'
import ClipboardList from 'lucide/dist/esm/icons/clipboard-list.js'
import Clock from 'lucide/dist/esm/icons/clock.js'
import Cloud from 'lucide/dist/esm/icons/cloud.js'
import Code from 'lucide/dist/esm/icons/code.js'
import Command from 'lucide/dist/esm/icons/command.js'
import Crown from 'lucide/dist/esm/icons/crown.js'
import Database from 'lucide/dist/esm/icons/database.js'
import Download from 'lucide/dist/esm/icons/download.js'
import Eye from 'lucide/dist/esm/icons/eye.js'
import FileText from 'lucide/dist/esm/icons/file-text.js'
import GitFork from 'lucide/dist/esm/icons/git-fork.js'
import Globe from 'lucide/dist/esm/icons/globe.js'
import Grid from 'lucide/dist/esm/icons/grid-3x3.js'
import HardDrive from 'lucide/dist/esm/icons/hard-drive.js'
import Heart from 'lucide/dist/esm/icons/heart.js'
import ImageIcon from 'lucide/dist/esm/icons/image.js'
import Key from 'lucide/dist/esm/icons/key.js'
import Layers from 'lucide/dist/esm/icons/layers.js'
import LayoutDashboard from 'lucide/dist/esm/icons/layout-dashboard.js'
import Link from 'lucide/dist/esm/icons/link.js'
import ListFilter from 'lucide/dist/esm/icons/list-filter.js'
import Lock from 'lucide/dist/esm/icons/lock.js'
import Mail from 'lucide/dist/esm/icons/mail.js'
import MessageCircle from 'lucide/dist/esm/icons/message-circle.js'
import MessageSquare from 'lucide/dist/esm/icons/message-square.js'
import Monitor from 'lucide/dist/esm/icons/monitor.js'
import Package from 'lucide/dist/esm/icons/package.js'
import Palette from 'lucide/dist/esm/icons/palette.js'
import PenTool from 'lucide/dist/esm/icons/pen-tool.js'
import Play from 'lucide/dist/esm/icons/play.js'
import Plug from 'lucide/dist/esm/icons/plug.js'
import RefreshCw from 'lucide/dist/esm/icons/refresh-cw.js'
import Repeat from 'lucide/dist/esm/icons/repeat.js'
import Rocket from 'lucide/dist/esm/icons/rocket.js'
import Search from 'lucide/dist/esm/icons/search.js'
import Server from 'lucide/dist/esm/icons/server.js'
import Settings from 'lucide/dist/esm/icons/settings.js'
import Shield from 'lucide/dist/esm/icons/shield.js'
import Sparkles from 'lucide/dist/esm/icons/sparkles.js'
import Star from 'lucide/dist/esm/icons/star.js'
import Target from 'lucide/dist/esm/icons/target.js'
import Terminal from 'lucide/dist/esm/icons/terminal.js'
import Users from 'lucide/dist/esm/icons/users.js'
import Wrench from 'lucide/dist/esm/icons/wrench.js'
import Zap from 'lucide/dist/esm/icons/zap.js'

export type IconNode = [string, Record<string, string | number>, unknown[]?][]

export const ICONS: Record<string, IconNode> = {
  rocket: Rocket,
  users: Users,
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
  play: Play,
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
  layers: Layers,
  database: Database,
  cloud: Cloud,
  key: Key,
  lock: Lock,
  search: Search,
  box: Box,
  wrench: Wrench,
  palette: Palette,
  image: ImageIcon,
  download: Download,
  star: Star,
  command: Command,
  eye: Eye,
  monitor: Monitor,
  server: Server,
  'hard-drive': HardDrive,
  activity: Activity,
  'check-circle': CircleCheck,
  filter: ListFilter,
  grid: Grid,
}

export const COLOR_MAP: Record<string, { icon: string; bg: string; title: string }> = {
  violet: { icon: '#7c3aed', bg: '#ede9fe', title: '#7c3aed' },
  teal: { icon: '#0d9488', bg: '#e0f5f1', title: '#0d9488' },
  blue: { icon: '#2563eb', bg: '#e0ecfc', title: '#2563eb' },
  amber: { icon: '#d97706', bg: '#fef3c7', title: '#d97706' },
  rose: { icon: '#e11d48', bg: '#fce4ec', title: '#e11d48' },
  gray: { icon: '#6b7280', bg: '#f3f4f6', title: '#6b7280' },
}
