import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageMeta } from '../hooks/usePageMeta';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetDashboard, useIsStripeConfigured } from '../hooks/useQueries';
import { useCreateCheckoutSession } from '../hooks/useStripeCheckout';
import { Check, Crown } from 'lucide-react';
import { toast } from 'sonner';
import FreeTrialClaimCard from '../components/trial/FreeTrialClaimCard';
import ManualPaymentInfo from '../components/payments/ManualPaymentInfo';
import RequireAuth from '../components/auth/RequireAuth';

function PricingContent() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: dashboard } = useGetDashboard();
  const { data: isStripeConfigured } = useIsStripeConfigured();
  const createCheckout = useCreateCheckoutSession();

  const handleCheckout = async (packageType: 'standard' | 'premium') => {
    if (!isStripeConfigured) {
      toast.error('Payment system is not configured. Please contact support.');
      return;
    }

    try {
      const items = [
        {
          productName: packageType === 'standard' ? 'Standard Website Package' : 'Premium Website Package',
          productDescription: packageType === 'standard' 
            ? 'Up to 5 pages, mobile responsive, basic SEO, 2-day delivery'
            : 'Up to 10 pages, premium UI/UX, advanced SEO, all premium features',
          priceInCents: BigInt(packageType === 'standard' ? 19900 : 30000),
          currency: 'USD',
          quantity: BigInt(1),
        },
      ];

      const session = await createCheckout.mutateAsync(items);
      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }
      window.location.href = session.url;
    } catch (error) {
      toast.error('Failed to create checkout session');
      console.error(error);
    }
  };

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect package for your business
        </p>
      </div>

      {identity && dashboard && (
        <div className="max-w-md mx-auto mb-12">
          <FreeTrialClaimCard alreadyClaimed={dashboard.freeTrialClaimed} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        {/* Standard Package */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Standard Website Package</CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground">
              $199
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {[
                'Up to 5 pages',
                'Mobile responsive',
                'Basic SEO',
                '2-Day delivery',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-chart-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              size="lg"
              onClick={() => handleCheckout('standard')}
              disabled={createCheckout.isPending || !isStripeConfigured}
            >
              {createCheckout.isPending ? 'Processing...' : 'Get Started'}
            </Button>
          </CardContent>
        </Card>

        {/* Premium Package */}
        <Card className="border-chart-1 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-chart-1 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Crown className="h-4 w-4" />
            Most Recommended
          </div>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              Premium Website Package
              <Crown className="h-6 w-6 text-chart-1" />
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground">
              $300
            </CardDescription>
            <p className="text-sm text-chart-1 font-semibold">⭐ Best Value</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {[
                'Up to 10 pages',
                'Premium UI/UX',
                'Advanced SEO',
                'Speed optimization',
                'Contact form',
                'Social media integration',
                'Premium animations',
                'Priority support',
                '2-Day fast delivery',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-chart-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              size="lg"
              onClick={() => handleCheckout('premium')}
              disabled={createCheckout.isPending || !isStripeConfigured}
            >
              {createCheckout.isPending ? 'Processing...' : 'Get Premium'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-md mx-auto">
        <ManualPaymentInfo />
      </div>
    </div>
  );
}

export default function PricingPage() {
  usePageMeta('Pricing', 'Affordable pricing plans for professional website design and development services.');
  
  return <PricingContent />;
}
