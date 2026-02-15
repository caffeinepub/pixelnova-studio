import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function PrivacyPolicyPage() {
  usePageMeta('Privacy Policy', 'Privacy policy for PixelNova Studio.');

  return (
    <div className="container py-16 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-4">
            We collect information you provide directly to us, including your name, email address, phone number, and project details when you place an order or submit a lead form.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
            <li>Process and deliver your orders</li>
            <li>Communicate with you about your projects</li>
            <li>Send you updates and promotional materials (with your consent)</li>
            <li>Improve our services</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
          <p className="text-muted-foreground mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our business, subject to confidentiality agreements.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
          <p className="text-muted-foreground mb-4">
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Authentication</h2>
          <p className="text-muted-foreground mb-4">
            We use Internet Identity for authentication. Your authentication data is managed by the Internet Identity service and is not stored on our servers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cookies</h2>
          <p className="text-muted-foreground mb-4">
            We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Rights</h2>
          <p className="text-muted-foreground mb-4">
            You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to This Policy</h2>
          <p className="text-muted-foreground mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p className="text-muted-foreground mb-4">
            If you have questions about this privacy policy, please contact us through our website.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
