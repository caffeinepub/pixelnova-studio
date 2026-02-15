import { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePageMeta } from '../hooks/usePageMeta';
import { useSubmitOrder } from '../hooks/useQueries';
import { PackageType } from '../backend';
import { toast } from 'sonner';
import RequireAuth from '../components/auth/RequireAuth';
import ManualPaymentInfo from '../components/payments/ManualPaymentInfo';

function OrderForm() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { service?: string };
  const [packageType, setPackageType] = useState<'standard' | 'premium' | 'custom'>('standard');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'manual'>('stripe');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const submitOrder = useSubmitOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'manual' && !screenshotFile) {
      toast.error('Please upload payment screenshot for manual payment');
      return;
    }

    try {
      const pkgType: PackageType = 
        packageType === 'standard' ? PackageType.standard :
        packageType === 'premium' ? PackageType.premium :
        PackageType.custom;

      await submitOrder.mutateAsync({
        packageType: pkgType,
        notes: `${search.service ? `Service: ${search.service}\n` : ''}${notes}`,
        productPaid: false,
        packagePaid: paymentMethod === 'manual',
      });

      toast.success('Order submitted successfully!');
      navigate({ to: '/dashboard' });
    } catch (error) {
      toast.error('Failed to submit order');
      console.error(error);
    }
  };

  return (
    <div className="container py-16 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Place Your Order</CardTitle>
          <CardDescription>
            {search.service ? `Service: ${search.service}` : 'Fill in the details below'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="package">Package Type</Label>
              <Select value={packageType} onValueChange={(v: any) => setPackageType(v)}>
                <SelectTrigger id="package">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard ($199)</SelectItem>
                  <SelectItem value="premium">Premium ($300)</SelectItem>
                  <SelectItem value="custom">Custom (Contact for pricing)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Project Details</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe your project requirements..."
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={(v: any) => setPaymentMethod(v)}>
                <SelectTrigger id="payment">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe (Credit/Debit Card)</SelectItem>
                  <SelectItem value="manual">Manual Payment (UPI)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === 'manual' && (
              <>
                <ManualPaymentInfo />
                <div className="space-y-2">
                  <Label htmlFor="screenshot">Payment Screenshot *</Label>
                  <Input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload a screenshot of your payment confirmation
                  </p>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={submitOrder.isPending}
            >
              {submitOrder.isPending ? 'Submitting...' : 'Submit Order'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function OrderPage() {
  usePageMeta('Place Order', 'Submit your project order and requirements.');
  
  return (
    <RequireAuth>
      <OrderForm />
    </RequireAuth>
  );
}
