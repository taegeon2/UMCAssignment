import { useState, useEffect } from "react";
import type { ReactNode, MouseEvent, ComponentType } from "react";

let currentPath = window.location.pathname;
let listeners: (() => void)[] = [];

export const useCurrentPath = () => {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const listener = () => setPath(currentPath);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return path;
};

export const Link = ({ to, children }: { to: string; children: ReactNode }) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, "", to);
    currentPath = to;
    listeners.forEach((listener) => listener());
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export const Route = ({
  path,
  component: Component,
}: {
  path: string;
  component: ComponentType;
}) => {
  const current = useCurrentPath();
  return current === path ? <Component /> : null;
};

export const Routes = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const handlePopState = () => {
      currentPath = window.location.pathname;
      listeners.forEach((listener) => listener());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return <>{children}</>;
};
