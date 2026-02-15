import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageMeta } from '../../hooks/usePageMeta';
import { AlertCircle } from 'lucide-react';

export default function RefundPolicyPage() {
  usePageMeta('Refund Policy', 'Refund policy for PixelNova Studio services.');

  return (
    <div className="container py-16 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Refund Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-foreground font-semibold">
              No refunds once design work has started.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. General Policy</h2>
          <p className="text-muted-foreground mb-4">
            Due to the nature of digital design services, refunds are only available under specific circumstances outlined below.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Before Work Begins</h2>
          <p className="text-muted-foreground mb-4">
            If you cancel your order before we begin working on your project, you are eligible for a full refund minus any payment processing fees.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. After Work Has Started</h2>
          <p className="text-muted-foreground mb-4">
            Once design work has commenced, no refunds will be issued. This policy is in place because our designers invest significant time and creative effort into each project.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Non-Delivery</h2>
          <p className="text-muted-foreground mb-4">
            If we fail to deliver your project within the agreed timeframe and cannot provide a satisfactory explanation, you may be eligible for a partial or full refund.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Quality Issues</h2>
          <p className="text-muted-foreground mb-4">
            If the delivered work does not meet the specifications outlined in your order, we will work with you to revise the design at no additional cost. Refunds for quality issues are evaluated on a case-by-case basis.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Free Trial</h2>
          <p className="text-muted-foreground mb-4">
            The free website trial is provided as-is with no refund applicable, as it is a complimentary service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Requesting a Refund</h2>
          <p className="text-muted-foreground mb-4">
            To request a refund, please contact us with your order details and reason for the refund request. All refund requests will be reviewed within 5-7 business days.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
