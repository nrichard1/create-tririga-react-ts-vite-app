import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-12 bg-[#001529]">
        <Link to="/" className="no-underline flex items-center gap-2">
          <span className="font-semibold text-white/65 text-sm">TRIRIGA</span>
          <span className="text-white text-sm">React App</span>
        </Link>

        <TooltipProvider>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/85 hover:text-white hover:bg-white/10 h-8 w-8">
                  <Avatar className="h-6 w-6 bg-transparent">
                    <AvatarFallback className="bg-transparent text-white/85 text-xs">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{userName}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/85 hover:text-white hover:bg-white/10 h-8 w-8"
                  onClick={() => AuthService.logout()}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sign out</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </header>

      <main className="flex-1 p-6 bg-background min-h-[calc(100vh-48px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
