import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

export default function PaymentFailurePage() {
  usePageMeta('Payment Failed', 'Payment was cancelled or failed.');
  const navigate = useNavigate();

  return (
    <div className="container py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <XCircle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Payment Failed</CardTitle>
          <CardDescription>
            Your payment was cancelled or failed to process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Don't worry! You can try again or choose a different payment method.
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate({ to: '/pricing' })}>
              Try Again
            </Button>
            <Button variant="outline" onClick={() => navigate({ to: '/' })}>
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
