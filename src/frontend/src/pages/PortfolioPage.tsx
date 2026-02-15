import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageMeta } from '../hooks/usePageMeta';

type FilterType = 'All' | 'Websites' | 'Logos' | 'Presentations' | 'Business Cards';

export default function PortfolioPage() {
  usePageMeta('Portfolio', 'View our creative work - professional designs delivered fast.');
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('All');

  const portfolioItems = [
    { name: 'Nexora Tech', category: 'Logos' as const },
    { name: 'Velvet Aura', category: 'Logos' as const },
    { name: 'PowerX Gym', category: 'Logos' as const },
    { name: 'Brew Bliss', category: 'Logos' as const },
    { name: 'SkyHaven Realty', category: 'Logos' as const },
    { name: 'PixelNova Studio', category: 'Logos' as const },
    { name: 'Corporate Business Website', category: 'Websites' as const },
    { name: 'Startup Landing Page', category: 'Websites' as const },
    { name: 'E-commerce Platform', category: 'Websites' as const },
    { name: 'Portfolio Website', category: 'Websites' as const },
    { name: 'Business Pitch Deck', category: 'Presentations' as const },
    { name: 'Product Launch Slides', category: 'Presentations' as const },
    { name: 'Executive Business Card', category: 'Business Cards' as const },
    { name: 'Creative Agency Card', category: 'Business Cards' as const },
  ];

  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const filters: FilterType[] = ['All', 'Websites', 'Logos', 'Presentations', 'Business Cards'];

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Creative Work</h1>
        <p className="text-xl text-muted-foreground">
          Professional Designs Delivered Fast
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredItems.map((item, idx) => (
          <Card
            key={idx}
            className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <div className="aspect-video bg-gradient-to-br from-chart-1/20 to-chart-2/20 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl font-bold text-foreground/20">{item.name}</p>
              </div>
              <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  onClick={() => navigate({ to: '/order', search: { service: item.category } })}
                >
                  Get Similar Design
                </Button>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          size="lg"
          onClick={() => navigate({ to: '/order' })}
          className="text-lg px-8 py-6"
        >
          🔵 Order My Design Now
        </Button>
      </div>
    </div>
  );
}
