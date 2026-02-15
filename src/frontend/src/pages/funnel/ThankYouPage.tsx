import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function ThankYouPage() {
  usePageMeta('Thank You', 'Your information has been received successfully.');
  const navigate = useNavigate();

  return (
    <div className="container py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Thank You!</CardTitle>
          <CardDescription>
            Your information has been received successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We've received your request for a free website demo. Our team will contact you within 24 hours to discuss your project and deliver your demo.
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate({ to: '/pricing' })}>
              View Pricing Plans
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
