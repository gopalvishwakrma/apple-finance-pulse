
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Don't render with SSR to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 px-4 md:px-6 py-6 pb-20 md:pb-6 overflow-auto">
          <div className="flex justify-end mb-4">
            <Toggle
              pressed={theme === "dark"}
              onPressedChange={toggleTheme}
              aria-label="Toggle dark mode"
              className="premium-shadow-sm"
            >
              {theme === "light" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Toggle>
          </div>
          <main className="animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
