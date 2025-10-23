'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';
import { MOCK_DATA } from '@/lib/mock-data';
import { useState } from 'react';
import { MobileSidebar } from './mobile-sidebar';

export function TopBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = MOCK_DATA.currentUser;

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
      {/* Mobile Menu Button - Touch-friendly */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden min-h-touch min-w-touch"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Spacer for desktop */}
      <div className="hidden md:block" />

      {/* Right Side - Responsive spacing */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Theme Toggle - Touch-friendly */}
        <div className="min-h-touch min-w-touch flex items-center justify-center">
          <ThemeToggle />
        </div>

        {/* User Menu - Touch-friendly */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 min-h-touch min-w-touch rounded-full"
            >
              <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground leading-none">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="min-h-touch cursor-pointer">
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem className="min-h-touch cursor-pointer">
              Einstellungen
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="min-h-touch cursor-pointer">
              Abmelden
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
