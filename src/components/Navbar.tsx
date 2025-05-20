import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logonav from './pics/logonav.png';

const Navbar = () => {
  const { user,  signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClasses = (path: string) => {
    return `px-3 py-2 text-sm font-medium transition-colors ${
      isActive(path)
        ? 'text-keysai-accent border-b-2 border-keysai-accent'
        : 'text-keysai-textBody hover:text-keysai-accent'
    }`;
  };

  const mobileLinkClasses = (path: string) => {
    return `block px-4 py-2 text-base font-medium transition-colors ${
      isActive(path)
        ? 'text-keysai-accent bg-gray-50'
        : 'text-keysai-textBody hover:bg-gray-50'
    }`;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src={logonav} alt="Keys-AI Logo" className="h-10" />
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/" className={linkClasses('/')}>
                Home
              </Link>
              <Link to="/agents" className={linkClasses('/agents')}>
                Agents
              </Link>
              <Link to="/pricing" className={linkClasses('/pricing')}>
                Pricing
              </Link>
              <Link to="/about" className={linkClasses('/about')}>
                About
              </Link>
              <Link to="/contact" className={linkClasses('/contact')}>
                Contact
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:flex sm:items-center">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className={`mr-2 ${isActive('/dashboard') ? 'border-keysai-accent text-keysai-accent' : ''}`}>
                    Dashboard
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-keysai-accent text-white">
                          {user.user_metadata?.first_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className={`flex items-center ${isActive('/profile') ? 'text-keysai-accent' : ''}`}>
                        <Avatar className="h-4 w-4 mr-2">
                          <AvatarFallback className="bg-keysai-accent text-white text-xs">
                            {user.user_metadata?.first_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className={`flex items-center ${isActive('/settings') ? 'text-keysai-accent' : ''}`}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut} className="flex items-center text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className={`mr-2 ${isActive('/login') ? 'border-keysai-accent text-keysai-accent' : ''}`}>
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-keysai-accent hover:bg-blue-600">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-keysai-textBody hover:text-keysai-accent focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white pt-2 pb-4 space-y-1 border-t">
          <Link 
            to="/" 
            className={mobileLinkClasses('/')}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/agents" 
            className={mobileLinkClasses('/agents')}
            onClick={() => setMobileMenuOpen(false)}
          >
            Agents
          </Link>
          <Link 
            to="/pricing" 
            className={mobileLinkClasses('/pricing')}
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link 
            to="/about" 
            className={mobileLinkClasses('/about')}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={mobileLinkClasses('/contact')}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={mobileLinkClasses('/dashboard')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              
              <Link 
                to="/profile" 
                className={mobileLinkClasses('/profile')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link 
                to="/settings" 
                className={mobileLinkClasses('/settings')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={mobileLinkClasses('/login')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className={mobileLinkClasses('/signup')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
