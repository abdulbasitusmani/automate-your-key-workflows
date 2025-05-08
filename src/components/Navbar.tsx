
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { user, role, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-keysai-accent text-2xl font-bold">Keys-AI</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/" className="text-keysai-textBody hover:text-keysai-accent px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/agents" className="text-keysai-textBody hover:text-keysai-accent px-3 py-2 text-sm font-medium">
                Agents
              </Link>
              <Link to="/about" className="text-keysai-textBody hover:text-keysai-accent px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="text-keysai-textBody hover:text-keysai-accent px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className="mr-2">
                    Dashboard
                  </Button>
                </Link>
                {role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" className="mr-2">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" onClick={signOut}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">
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
            className="block px-4 py-2 text-base font-medium text-keysai-textBody hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/agents" 
            className="block px-4 py-2 text-base font-medium text-keysai-textBody hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Agents
          </Link>
          <Link 
            to="/about" 
            className="block px-4 py-2 text-base font-medium text-keysai-textBody hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="block px-4 py-2 text-base font-medium text-keysai-textBody hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="block px-4 py-2 text-base font-medium text-keysai-textBody hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              {role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="block px-4 py-2 text-base font-medium text-keysai-textBody hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-keysai-textBody hover:bg-gray-50"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block px-4 py-2 text-base font-medium text-keysai-textBody hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="block px-4 py-2 text-base font-medium text-keysai-textBody hover:bg-gray-50"
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
