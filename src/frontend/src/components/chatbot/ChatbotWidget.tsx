import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, X, Send } from 'lucide-react';
import { chatbotScript, type ChatState } from './chatbotScript';
import { useSubmitChatbotLead } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatState>(chatbotScript.initialState);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: chatbotScript.greeting, isBot: true },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '' });
  const submitLead = useSubmitChatbotLead();

  const addMessage = (text: string, isBot: boolean) => {
    setMessages((prev) => [...prev, { text, isBot }]);
  };

  const handleUserInput = (input: string) => {
    if (!input.trim()) return;

    addMessage(input, false);
    setInputValue('');

    const response = chatbotScript.processInput(chatState, input);
    setChatState(response.nextState);

    setTimeout(() => {
      addMessage(response.message, true);
    }, 500);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leadData.name || !leadData.email || !leadData.phone) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const chatHistory = messages.map((m) => `${m.isBot ? 'Bot' : 'User'}: ${m.text}`);
      await submitLead.mutateAsync({
        ...leadData,
        chatHistory,
      });
      toast.success('Thank you! We will contact you soon.');
      addMessage('Thank you! Your information has been submitted. Our team will contact you shortly.', true);
      setChatState('completed');
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
            <CardTitle className="text-lg">Nova AI Assistant 🤖</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.isBot
                          ? 'bg-muted text-foreground'
                          : 'bg-chart-1 text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {chatState === 'lead_capture' ? (
              <form onSubmit={handleLeadSubmit} className="p-4 border-t space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="chat-name" className="text-xs">Name</Label>
                  <Input
                    id="chat-name"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    placeholder="Your name"
                    size={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chat-email" className="text-xs">Email</Label>
                  <Input
                    id="chat-email"
                    type="email"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    placeholder="your@email.com"
                    size={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chat-phone" className="text-xs">Phone</Label>
                  <Input
                    id="chat-phone"
                    type="tel"
                    value={leadData.phone}
                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                    size={1}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitLead.isPending}>
                  {submitLead.isPending ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            ) : chatState !== 'completed' ? (
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUserInput(inputValue)}
                    placeholder="Type your message..."
                  />
                  <Button
                    size="icon"
                    onClick={() => handleUserInput(inputValue)}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </>
  );
}
