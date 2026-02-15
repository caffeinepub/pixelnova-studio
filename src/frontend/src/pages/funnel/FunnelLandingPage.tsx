import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function FunnelLandingPage() {
  usePageMeta('Get Started', 'Get your free website demo and start your project today.');
  const navigate = useNavigate();

  return (
    <div className="container py-24">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold">
          Get Your Website in 2 Days
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Professional, modern websites delivered fast at affordable prices
        </p>
        <div className="bg-gradient-to-r from-chart-1/20 to-chart-2/20 rounded-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold">🆓 Get Free Website Demo</h2>
          <p className="text-lg text-muted-foreground">
            See our quality before you commit. Get a free demo website delivered in 24 hours!
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/lead-capture' })}
            className="text-lg px-8 py-6"
          >
            Claim Your Free Demo
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="p-6 bg-card rounded-lg">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast Delivery</h3>
            <p className="text-muted-foreground">Your website ready in just 2 days</p>
          </div>
          <div className="p-6 bg-card rounded-lg">
            <h3 className="text-xl font-semibold mb-2">💰 Affordable</h3>
            <p className="text-muted-foreground">Premium quality at budget-friendly prices</p>
          </div>
          <div className="p-6 bg-card rounded-lg">
            <h3 className="text-xl font-semibold mb-2">🎨 Professional</h3>
            <p className="text-muted-foreground">Modern designs that stand out</p>
          </div>
        </div>
      </div>
    </div>
  );
}
