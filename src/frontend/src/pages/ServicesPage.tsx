import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageMeta } from '../hooks/usePageMeta';
import { Clock } from 'lucide-react';

export default function ServicesPage() {
  usePageMeta('Services', 'Professional design services including websites, logos, presentations, and business cards.');
  const navigate = useNavigate();

  const services = [
    {
      name: 'Website Design',
      description: 'Professional, responsive websites tailored to your business needs',
      price: 'From $199',
      delivery: '2 days',
      features: ['Up to 10 pages', 'Mobile responsive', 'SEO optimized', 'Modern UI/UX'],
    },
    {
      name: 'Logo Design',
      description: 'Unique, memorable logos that represent your brand identity',
      price: '$10',
      delivery: '1 day',
      features: ['Multiple concepts', 'Vector files', 'Unlimited revisions', 'Brand guidelines'],
    },
    {
      name: 'Presentation Design',
      description: 'Engaging presentations that captivate your audience',
      price: '$5',
      delivery: '1 day',
      features: ['Custom templates', 'Infographics', 'Animations', 'Editable files'],
    },
    {
      name: 'Business Card Design',
      description: 'Professional business cards that make a lasting impression',
      price: '$10',
      delivery: '1 day',
      features: ['Double-sided', 'Print-ready files', 'Multiple formats', 'Premium design'],
    },
  ];

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Professional design services delivered fast at affordable prices
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service, idx) => (
          <Card key={idx} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="h-20 w-20 mx-auto mb-4">
                <img
                  src="/assets/generated/service-icons-sprite.dim_1024x256.png"
                  alt={service.name}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: `${idx * -256}px 0`,
                  }}
                />
              </div>
              <CardTitle className="text-2xl text-center">{service.name}</CardTitle>
              <CardDescription className="text-center text-xl font-bold text-chart-1">
                {service.price}
              </CardDescription>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Delivered in {service.delivery}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-sm">
                    <span className="text-chart-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                size="lg"
                onClick={() => navigate({ to: '/order', search: { service: service.name } })}
              >
                Order Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
