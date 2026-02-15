import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import PortfolioPage from './pages/PortfolioPage';
import DashboardPage from './pages/DashboardPage';
import OrderPage from './pages/OrderPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailurePage from './pages/PaymentFailurePage';
import TermsPage from './pages/legal/TermsPage';
import RefundPolicyPage from './pages/legal/RefundPolicyPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import FunnelLandingPage from './pages/funnel/FunnelLandingPage';
import LeadCapturePage from './pages/funnel/LeadCapturePage';
import ThankYouPage from './pages/funnel/ThankYouPage';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: PricingPage,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio',
  component: PortfolioPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order',
  component: OrderPage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccessPage,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailurePage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsPage,
});

const refundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund-policy',
  component: RefundPolicyPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPolicyPage,
});

const funnelLandingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/get-started',
  component: FunnelLandingPage,
});

const leadCaptureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lead-capture',
  component: LeadCapturePage,
});

const thankYouRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/thank-you',
  component: ThankYouPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  pricingRoute,
  portfolioRoute,
  dashboardRoute,
  orderRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  termsRoute,
  refundRoute,
  privacyRoute,
  funnelLandingRoute,
  leadCaptureRoute,
  thankYouRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
