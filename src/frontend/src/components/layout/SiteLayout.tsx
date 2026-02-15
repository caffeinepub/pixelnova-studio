import { Outlet } from '@tanstack/react-router';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import ChatbotWidget from '../chatbot/ChatbotWidget';

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <ChatbotWidget />
    </div>
  );
}
