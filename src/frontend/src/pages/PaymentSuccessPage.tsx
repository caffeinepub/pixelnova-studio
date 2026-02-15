import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

export default function PaymentSuccessPage() {
  usePageMeta('Payment Successful', 'Your payment has been processed successfully.');
  const navigate = useNavigate();

  return (
    <div className="container py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Your payment has been processed successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Thank you for your order! We will begin working on your project immediately and deliver it within 2 days.
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate({ to: '/dashboard' })}>
              View Dashboard
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
