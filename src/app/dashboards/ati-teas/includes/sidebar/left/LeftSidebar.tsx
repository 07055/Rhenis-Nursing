"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  X,
  ChevronDown,
  ChevronRight,
  BookOpen,
  FolderTree,
  GraduationCap,
  BarChart3,
  Receipt,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { useLeftSidebar } from "@/lib/contexts/panel/layout/includes/sidebar/LeftSidebarContext";
import { useThemeContext } from "@/lib/contexts/panel/layout/theme/PanelThemeContext";
import { useEffect, useState } from "react";
import { useSidebarAutoScroll } from "@/lib/hooks/nexus/includes/sidebars/useSidebarAutoScroll";

import LeftSidebarProgramHierarchyOutline from "../partials/left/vista/outline/VistaHierarchyProgramOutline";

import LeftSidebarProgress from "../partials/left/elements/Progress";
import LeftSidebarReports from "../partials/left/elements/Reports";
import LeftSidebarSubscriptionPackages from "../partials/left/elements/SubscriptionPackages";
import LeftSidebarSubscriptionItems from "../partials/left/elements/SubscriptionItems";
import LeftSidebarContact from "../partials/left/elements/Contact";
import LeftSidebarSupport from "../partials/left/elements/Support";
import LeftSidebarTerms from "../partials/left/elements/Terms";
import LeftSidebarAbout from "../partials/left/elements/About";

import { Tooltip } from "@/components/dashboards/includes/sidebar/tooltips/SidebarTooltip";
import { APP_TITLE, APP_ACRONYM } from "@/lib/config/config";

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

const PANEL = "ati-teas";
const VISTA = `/dashboards/${PANEL}/vista`;

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Small accordion group wrapper
function AccordionGroup({
  id,
  icon: Icon,
  label,
  isOpened,
  isActive,
  onToggle,
  hoveredItem,
  handleItemHover,
  handleMouseLeave,
  tooltipPosition,
  children,
}: {
  id: string;
  icon: LucideIcon;
  label: string;
  isOpened: boolean;
  isActive: boolean;
  onToggle: (id: string) => void;
  hoveredItem: string | null;
  handleItemHover: (item: string, e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
  tooltipPosition: { x: number; y: number };
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Group header */}
      <div
        target-scroll-item-accordion-key={id}
        onClick={() => onToggle(id)}
        onMouseEnter={(e) => handleItemHover(id, e)}
        onMouseLeave={handleMouseLeave}
        className={`relative flex items-center py-2 px-1 rounded-lg transition cursor-pointer
          border border-transparent hover:border-[var(--text-color)]/40 select-none
          ${isOpened ? "justify-between" : "justify-center"}`}
      >
        <div className="flex items-center min-w-0">
          <Icon className="w-5 h-5 shrink-0" />
          {isOpened && (
            <span className="ml-3 text-sm font-bold truncate">{label}</span>
          )}
        </div>

        {isOpened &&
          (isActive ? (
            <ChevronDown className="w-4 h-4 shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 shrink-0" />
          ))}

        {!isOpened && hoveredItem === id && (
          <Tooltip x={tooltipPosition.x} y={tooltipPosition.y}>
            {label}
          </Tooltip>
        )}
      </div>

      {/* Group content */}
      {isOpened && isActive && (
        <div className="ml-3 pl-3 mt-1 space-y-1 border-l border-[var(--text-color)]/15">
          {children}
        </div>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Simple nav link (used for flat items inside an accordion group)
function NavItem({
  href,
  label,
  isOpened,
  isCollapsed,
  hoveredItem,
  handleItemHover,
  handleMouseLeave,
  tooltipPosition,
  handleItemClick,
}: {
  href: string;
  label: string;
  isOpened: boolean;
  isCollapsed: boolean;
  hoveredItem: string | null;
  handleItemHover: (item: string, e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
  tooltipPosition: { x: number; y: number };
  handleItemClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname?.startsWith(href);

  return (
    <Link href={href}>
      <div
        onClick={handleItemClick}
        onMouseEnter={(e) => handleItemHover(label, e)}
        onMouseLeave={handleMouseLeave}
        className={`relative flex items-center py-1.5 px-1 rounded-lg transition
          border border-transparent select-none
          ${isActive
            ? "bg-[var(--text-color)]/10 border-[var(--text-color)]/40 font-medium"
            : "hover:border-[var(--text-color)]/40"
          }
          ${isOpened ? "justify-start" : "justify-center"}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            isActive ? "bg-indigo-400" : "bg-[var(--text-color)]/40"
          }`}
        />
        {isOpened && <span className="ml-2.5 text-sm truncate">{label}</span>}

        {isCollapsed && hoveredItem === label && (
          <Tooltip x={tooltipPosition.x} y={tooltipPosition.y}>
            {label}
          </Tooltip>
        )}
      </div>
    </Link>
  );
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

export default function LeftSidebar() {
  const DASHBOARD_NAME = "ati-teas";

  const { state, open, close } = useLeftSidebar();

  const isOpened = state === "opened";
  const isCollapsed = state === "collapsed";
  const isClosed = state === "closed";

  const { theme } = useThemeContext();

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("leftSidebarActiveDropdown");
      return saved || "Overview";
    }
    return "Overview";
  });

  const [isMounted, setIsMounted] = useState(false);

  //───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // On Reload Auto Scroll to Active Dropdown (if any)
  useSidebarAutoScroll({
    sidebarScrollContainerSelector: ".left-sidebar-scroll", // or ".right-sidebar-scroll" for right sidebar
    sidebarActiveDropdownKey: activeDropdown,
    sidebarScrollMaxAttempts: 30, // Try for up to 3 seconds (30 * 100ms)
    sidebarScrollRetryDelay: 100, // Check every 100ms
  });

  //───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // 🚨 EARLY RETURN MUST COME AFTER ALL HOOKS
  useEffect(() => setIsMounted(true), []);
  if (!isMounted || isClosed) return null;

  //───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //  THEME + LAYOUT
  const isLightSidebar =
    (theme.leftSidebar === "system" ? theme.global : theme.leftSidebar) === "light";

  const sidebarWidth = isOpened ? "w-64" : "w-20";

  //───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //  HANDLERS
  const toggleDropdown = (key: string) => {
    let newActive: string | null;
    if (!isOpened) {
      open(); // 👈 FORCE OPEN (NOT toggle)
      setTimeout(() => {
        newActive = activeDropdown === key ? null : key;
        setActiveDropdown(newActive);
        if (typeof window !== "undefined") localStorage.setItem("leftSidebarActiveDropdown", newActive || "");
      }, 250);
    } else {
      newActive = activeDropdown === key ? null : key;
      setActiveDropdown(newActive);
      if (typeof window !== "undefined") localStorage.setItem("leftSidebarActiveDropdown", newActive || "");
    }
  };

  const handleItemClick = () => {
    if (isCollapsed) {
      open(); // 👈 FORCE OPEN
    }
  };

  const handleItemHover = (item: string, e: React.MouseEvent) => {
    if (isCollapsed) {
      setHoveredItem(item);
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: rect.right + 8,
        y: rect.top + rect.height / 2,
      });
    }
  };

  const handleMouseLeave = () => setHoveredItem(null);

  // Props shared by every group + item
  const sharedNavProps = {
    isOpened,
    isCollapsed,
    hoveredItem,
    handleItemHover,
    handleMouseLeave,
    tooltipPosition,
    handleItemClick,
  };

  //───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //  RENDER
  return (
    <aside
      className={`fixed top-16 leftSidebar-0 z-40 flex flex-col h-[calc(100vh-64px)]
        ${sidebarWidth}
        transition-all duration-300 ease-in-out
        shadow-md border-r border-[var(--text-color)]/10`}
      style={{
        backgroundColor: "var(--leftSidebar-bg)",
        color: "var(--text-color)",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-b border-[var(--text-color)]/10
          ${isLightSidebar ? "border-gray-200" : ""}`}
      >
        <div className={`flex-1 ${!isOpened && "justify-center flex"}`}>
          <Link
            href={`/dashboards/${DASHBOARD_NAME}`}
            className={`text-lg font-bold ${isLightSidebar
              ? "text-gray-800 hover:text-gray-600"
              : "text-[var(--text-color)]"
              }`}
          >
            {isOpened ? APP_TITLE : APP_ACRONYM}
          </Link>
        </div>

        {isOpened && (
          <button
            onClick={close}
            aria-label="Close sidebar"
            className="p-1 rounded hover:bg-[var(--text-color)]/10"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto space-y-1 p-2 left-sidebar-scroll">
        {/* Overview */}
        <AccordionGroup
          id="Overview"
          icon={LayoutDashboard}
          label="Overview"
          isActive={activeDropdown === "Overview"}
          onToggle={toggleDropdown}
          {...sharedNavProps}
        >
          <NavItem href={`/dashboards/${DASHBOARD_NAME}`} label="My Dashboard" {...sharedNavProps} />
          <NavItem href="/" label="Return Home" {...sharedNavProps} />
        </AccordionGroup>

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}

        {/* Programs */}
        <AccordionGroup
          id="Programs"
          icon={FolderTree}
          label="Programs"
          isActive={activeDropdown === "Programs"}
          onToggle={toggleDropdown}
          {...sharedNavProps}
        >
          <LeftSidebarProgramHierarchyOutline
            {...{
              isOpened,
              activeDropdown,
              toggleDropdown,
              hoveredItem,
              handleItemHover,
              handleMouseLeave,
              tooltipPosition,
              handleItemClick,
            }}
          />
        </AccordionGroup>

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}

        {/* Exams & Assessments */}
        <AccordionGroup
          id="ExamsAssessments"
          icon={BookOpen}
          label="Exams & Assessments"
          isActive={activeDropdown === "ExamsAssessments"}
          onToggle={toggleDropdown}
          {...sharedNavProps}
        >
          <NavItem href={`${VISTA}/assessment/exams/absolute/overview`} label="All Exams" {...sharedNavProps} />
          <NavItem href={`${VISTA}/assessment/exams/distinct/overview`} label="Your Exams" {...sharedNavProps} />
          <NavItem href={`${VISTA}/assessment/assessments/absolute/overview`} label="All Assessments" {...sharedNavProps} />
          <NavItem href={`${VISTA}/assessment/assessments/distinct/overview`} label="Your Assessments" {...sharedNavProps} />
        </AccordionGroup>

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}

        {/* Learning */}
        <AccordionGroup
          id="Learning"
          icon={GraduationCap}
          label="Learning"
          isActive={activeDropdown === "Learning"}
          onToggle={toggleDropdown}
          {...sharedNavProps}
        >
          <NavItem href={`${VISTA}/learning/courses/absolute/overview`} label="Courses" {...sharedNavProps} />
          <NavItem href={`${VISTA}/learning/programs/absolute/overview`} label="Programs" {...sharedNavProps} />
          <NavItem href={`${VISTA}/learning/subjects/absolute/overview`} label="Subjects" {...sharedNavProps} />
        </AccordionGroup>

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}

        {/* Stats */}
        <AccordionGroup
          id="Stats"
          icon={BarChart3}
          label="Stats"
          isActive={activeDropdown === "Stats"}
          onToggle={toggleDropdown}
          {...sharedNavProps}
        >
          <LeftSidebarProgress {...sharedNavProps} />
          <LeftSidebarReports {...sharedNavProps} />
        </AccordionGroup>

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}

        {/* Subscriptions */}
        <AccordionGroup
          id="Subscriptions"
          icon={Receipt}
          label="Subscriptions"
          isActive={activeDropdown === "Subscriptions"}
          onToggle={toggleDropdown}
          {...sharedNavProps}
        >
          <LeftSidebarSubscriptionPackages {...sharedNavProps} />
          <LeftSidebarSubscriptionItems {...sharedNavProps} />
        </AccordionGroup>

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}

        {/* Support */}
        <AccordionGroup
          id="Support"
          icon={LifeBuoy}
          label="Support"
          isActive={activeDropdown === "Support"}
          onToggle={toggleDropdown}
          {...sharedNavProps}
        >
          <LeftSidebarContact {...sharedNavProps} />
          <LeftSidebarSupport {...sharedNavProps} />
          <LeftSidebarTerms {...sharedNavProps} />
          <LeftSidebarAbout {...sharedNavProps} />
        </AccordionGroup>

        {/* ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
      </nav>
    </aside>
  );
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// The End By : B.L.S.M.C ;  -  SkewBlanc - The Winds Chase Us ⚓
// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
