import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function TermsPage() {
  usePageMeta('Terms & Conditions', 'Terms and conditions for using PixelNova Studio services.');

  return (
    <div className="container py-16 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Services</h2>
          <p className="text-muted-foreground mb-4">
            PixelNova Studio provides professional design services including website design, logo design, presentation design, and business card design. All services are delivered digitally within the specified timeframe.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Payment Terms</h2>
          <p className="text-muted-foreground mb-4">
            Payment must be completed before work begins. We accept payments via Stripe (credit/debit cards) and manual payment methods (UPI). All prices are listed in USD.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Delivery</h2>
          <p className="text-muted-foreground mb-4">
            Standard delivery time is 2 days for website projects and 1 day for other design services. Delivery times begin after payment confirmation and receipt of all required project materials.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Revisions</h2>
          <p className="text-muted-foreground mb-4">
            Each package includes a specified number of revision rounds. Additional revisions may be subject to extra charges.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
          <p className="text-muted-foreground mb-4">
            Upon full payment, all rights to the final delivered design are transferred to the client. PixelNova Studio retains the right to showcase completed work in our portfolio.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="text-muted-foreground mb-4">
            PixelNova Studio is not liable for any indirect, incidental, or consequential damages arising from the use of our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
          <p className="text-muted-foreground mb-4">
            For questions about these terms, please contact us through our website.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
