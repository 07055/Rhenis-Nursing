"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type SidebarState = "opened" | "collapsed" | "closed";

interface LeftSidebarContextProps {
  state: SidebarState;
  isOpened: boolean;
  isCollapsed: boolean;
  isClosed: boolean;
  open: () => void;
  collapse: () => void;
  close: () => void;
  toggle: () => void;
}

const LeftSidebarContext = createContext<LeftSidebarContextProps | null>(null);

export const LeftSidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<SidebarState>("opened");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (e.matches) {
        setState("closed");
        localStorage.setItem("leftSidebarState", "closed");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Load state from localStorage on mount
  useEffect(() => {
    if (isMobile) {
      setState("closed");
      return;
    }
    const saved = localStorage.getItem("leftSidebarState") as SidebarState;
    if (saved === "opened" || saved === "collapsed" || saved === "closed") {
      setState(saved);
    }
  }, [isMobile]);

  // Save state whenever it changes
  useEffect(() => {
    localStorage.setItem("leftSidebarState", state);
  }, [state]);

  const open = () => setState("opened");
  const collapse = () => setState("collapsed");
  const close = () => setState("closed");

  // 3-step toggle: opened → collapsed → closed → opened
  const toggle = () => {
    setState(prev => {
      if (prev === "opened") return "collapsed";
      if (prev === "collapsed") return "closed";
      return "opened"; // closed
    });
  };

  return (
    <LeftSidebarContext.Provider
      value={{
        state,
        isOpened: state === "opened",
        isCollapsed: state === "collapsed",
        isClosed: state === "closed",
        open,
        collapse,
        close,
        toggle,
      }}
    >
      {children}
    </LeftSidebarContext.Provider>
  );
};

export const useLeftSidebar = () => {
  const context = useContext(LeftSidebarContext);
  if (!context) throw new Error("useLeftSidebar must be used inside LeftSidebarProvider");
  return context;
};
