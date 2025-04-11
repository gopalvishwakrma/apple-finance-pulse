
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  PieChart,
  TrendingUp,
  User,
  ShieldCheck,
  PanelLeft,
  Menu,
  Search,
  Bell,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  icon: React.ElementType;
  href: string;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const NavItem = ({ icon: Icon, href, label, active, collapsed }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
        "transition-all duration-200 group relative",
        active
          ? "bg-primary/10 text-primary"
          : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
      )}
    >
      <Icon size={20} className={active ? "text-primary" : "text-foreground/60 group-hover:text-foreground"} />
      {!collapsed && <span>{label}</span>}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-popover rounded-md text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          {label}
        </div>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return <MobileNav />;
  }

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-gradient flex items-center justify-center">
              <PieChart size={16} className="text-white" />
            </div>
            <span className="font-semibold text-lg">Finance Pulse</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 mx-auto rounded-full bg-primary-gradient flex items-center justify-center">
            <PieChart size={16} className="text-white" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "ml-auto rounded-full p-0 h-8 w-8",
            collapsed && "mx-auto mt-4"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          <PanelLeft size={18} className={collapsed ? "rotate-180" : ""} />
        </Button>
      </div>

      <div className="flex-1 py-4 px-2 space-y-1.5 overflow-y-auto">
        <NavItem
          icon={Home}
          href="/"
          label="Dashboard"
          active={location.pathname === "/"}
          collapsed={collapsed}
        />
        <NavItem
          icon={PieChart}
          href="/portfolio"
          label="Portfolio"
          active={location.pathname.startsWith("/portfolio")}
          collapsed={collapsed}
        />
        <NavItem
          icon={TrendingUp}
          href="/stocks"
          label="Stocks"
          active={location.pathname.startsWith("/stocks")}
          collapsed={collapsed}
        />
        <NavItem
          icon={ShieldCheck}
          href="/insights"
          label="Insights"
          active={location.pathname.startsWith("/insights")}
          collapsed={collapsed}
        />
        <NavItem
          icon={User}
          href="/profile"
          label="Profile"
          active={location.pathname.startsWith("/profile")}
          collapsed={collapsed}
        />
      </div>

      <div className="p-2 border-t">
        <NavItem
          icon={Settings}
          href="/settings"
          label="Settings"
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
};

const MobileNav = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex items-center justify-around px-4 z-50">
      <Link to="/" className={cn("flex flex-col items-center", location.pathname === "/" ? "text-primary" : "text-muted-foreground")}>
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/portfolio" className={cn("flex flex-col items-center", location.pathname.startsWith("/portfolio") ? "text-primary" : "text-muted-foreground")}>
        <PieChart size={20} />
        <span className="text-xs mt-1">Portfolio</span>
      </Link>
      <Link to="/stocks" className={cn("flex flex-col items-center", location.pathname.startsWith("/stocks") ? "text-primary" : "text-muted-foreground")}>
        <TrendingUp size={20} />
        <span className="text-xs mt-1">Stocks</span>
      </Link>
      <Link to="/insights" className={cn("flex flex-col items-center", location.pathname.startsWith("/insights") ? "text-primary" : "text-muted-foreground")}>
        <ShieldCheck size={20} />
        <span className="text-xs mt-1">Insights</span>
      </Link>
      <Link to="/profile" className={cn("flex flex-col items-center", location.pathname.startsWith("/profile") ? "text-primary" : "text-muted-foreground")}>
        <User size={20} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default Sidebar;
