import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, DollarSign, Palette, Smartphone, Star } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

export default function HomePage() {
  usePageMeta('Home', 'Premium Business Websites Delivered in Just 2 Days. Modern, Affordable, and Designed to Grow Your Brand.');
  const navigate = useNavigate();

  const reviews = [
    { name: 'Sarah Johnson', rating: 5, text: 'Amazing work! My website was delivered in 2 days and looks stunning.' },
    { name: 'Michael Chen', rating: 5, text: 'Professional service and great communication. Highly recommend!' },
    { name: 'Emily Rodriguez', rating: 5, text: 'The logo design exceeded my expectations. Worth every penny!' },
    { name: 'David Kim', rating: 5, text: 'Fast turnaround and beautiful design. Will definitely use again.' },
    { name: 'Lisa Thompson', rating: 5, text: 'Premium quality at an affordable price. Very satisfied!' },
    { name: 'James Wilson', rating: 5, text: 'Excellent customer service and stunning final product.' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Premium Business Websites Delivered in Just 2 Days.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Modern, Affordable, and Designed to Grow Your Brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/get-started' })}
                className="text-lg px-8 py-6"
              >
                Start My Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/portfolio' })}
                className="text-lg px-8 py-6"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-card">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-chart-1 mb-2" />
                <CardTitle>2-Day Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Lightning-fast turnaround without compromising quality</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <DollarSign className="h-10 w-10 text-chart-1 mb-2" />
                <CardTitle>Affordable Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Premium quality at prices that fit your budget</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Palette className="h-10 w-10 text-chart-1 mb-2" />
                <CardTitle>Modern Creative Designs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Cutting-edge designs that make your brand stand out</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Smartphone className="h-10 w-10 text-chart-1 mb-2" />
                <CardTitle>Fully Responsive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Perfect on all devices - mobile, tablet, and desktop</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Website Design', price: 'From $199', icon: 0 },
              { name: 'Logo Design', price: '$10', icon: 1 },
              { name: 'Presentation Design', price: '$5', icon: 2 },
              { name: 'Business Card Design', price: '$10', icon: 3 },
            ].map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-16 w-16 mx-auto mb-4">
                    <img
                      src="/assets/generated/service-icons-sprite.dim_1024x256.png"
                      alt={service.name}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: `${service.icon * -256}px 0`,
                      }}
                    />
                  </div>
                  <CardTitle className="text-center">{service.name}</CardTitle>
                  <CardDescription className="text-center text-lg font-semibold text-chart-1">
                    {service.price}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" onClick={() => navigate({ to: '/services' })}>
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-2xl font-bold ml-2">4.9/5 Rating</span>
            </div>
            <p className="text-xl text-muted-foreground">120+ Happy Clients</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-chart-1/20 to-chart-2/20">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Launch Your Business in Just 2 Days?
          </h2>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/get-started' })}
            className="text-lg px-8 py-6"
          >
            🔥 Start My Project Now
          </Button>
        </div>
      </section>
    </div>
  );
}
