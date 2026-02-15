import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'pixelnova-studio');

  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">PixelNova Studio</h3>
            <p className="text-sm text-muted-foreground">
              Fast. Affordable. Professional.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground transition-colors">Website Design</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Logo Design</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Presentations</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Business Cards</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            © {currentYear} PixelNova Studio. Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
