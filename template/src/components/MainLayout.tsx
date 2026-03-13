import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { User, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AuthService } from '../services/AuthService';

const MainLayout: React.FC = () => {
  const userName = 'User';
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      const isDarkMode = document.documentElement.classList.toggle('dark');
      setIsDark(isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      return;
    }
    document.startViewTransition(() => {
      const isDarkMode = document.documentElement.classList.toggle('dark');
      setIsDark(isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-12 bg-[#161616]">
        <Link to="/" className="no-underline flex items-center gap-2">
          <span className="font-semibold text-white/65 text-base">TRIRIGA</span>
          <span className="text-white text-base truncate max-w-[200px] sm:max-w-none">React App</span>
        </Link>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center gap-1">
          <TooltipProvider delayDuration={200}>
            {/* Theme Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/85 hover:text-white hover:bg-white/10 h-10 w-10" onClick={toggleTheme}>
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {isDark ? "Toggle Light Mode" : "Toggle Dark Mode"}
              </TooltipContent>
            </Tooltip>

            {/* User Avatar */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/85 hover:text-white hover:bg-white/10 h-10 w-10 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{userName}</TooltipContent>
            </Tooltip>

            {/* Logout */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/85 hover:text-white hover:bg-white/10 h-10 w-10"
                  onClick={() => AuthService.logout()}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="end">Sign out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/85 hover:text-white hover:bg-white/10 h-10 w-10" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden sticky top-12 z-40 w-full bg-[#161616] border-b border-t border-white/10 flex flex-col p-2 shadow-xl shadow-black/50">
          <Button variant="ghost" className="justify-start text-white/85 hover:text-white hover:bg-white/10 w-full h-12" onClick={toggleTheme}>
            {isDark ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </Button>
          <Button variant="ghost" className="justify-start text-white/85 hover:text-white hover:bg-white/10 w-full h-12">
            <User className="h-5 w-5 mr-3" />
            {userName}
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-red-400 hover:text-red-300 hover:bg-white/10 w-full h-12"
            onClick={() => { setIsMobileMenuOpen(false); AuthService.logout(); }}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign out
          </Button>
        </div>
      )}

      <main className="flex-1 p-4 sm:p-6 bg-background min-h-[calc(100vh-48px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
