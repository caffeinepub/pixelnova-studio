import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useSubmitFormLead } from '../../hooks/useQueries';
import { toast } from 'sonner';

export default function LeadCapturePage() {
  usePageMeta('Get Your Free Demo', 'Submit your information to receive your free website demo.');
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const submitLead = useSubmitFormLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await submitLead.mutateAsync({ name, email, phone });
      navigate({ to: '/thank-you' });
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Get Your Free Website Demo</CardTitle>
          <CardDescription>
            Fill in your details and we'll create a demo website for you within 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={submitLead.isPending}
            >
              {submitLead.isPending ? 'Submitting...' : 'Get My Free Demo'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
