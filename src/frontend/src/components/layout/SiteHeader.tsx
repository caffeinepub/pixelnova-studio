import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/assets/generated/pixelnova-logo.dim_512x512.png" alt="PixelNova Studio" className="h-8 w-auto" />
          <span className="text-xl font-bold text-foreground">PixelNova Studio</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/services" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Services
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/portfolio" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Portfolio
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            onClick={handleAuth}
            disabled={isLoggingIn}
            variant={isAuthenticated ? 'outline' : 'default'}
            size="sm"
            className="hidden md:inline-flex"
          >
            {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Sign Out' : 'Sign In'}
          </Button>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="container flex flex-col space-y-4 py-4">
            <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Services
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/portfolio" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Portfolio
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Dashboard
              </Link>
            )}
            <Button
              onClick={handleAuth}
              disabled={isLoggingIn}
              variant={isAuthenticated ? 'outline' : 'default'}
              size="sm"
              className="w-full"
            >
              {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Sign Out' : 'Sign In'}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
