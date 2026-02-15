export type ChatState = 
  | 'greeting'
  | 'business_type'
  | 'budget'
  | 'package_suggestion'
  | 'free_trial_offer'
  | 'payment_reminder'
  | 'lead_capture'
  | 'completed';

interface ChatResponse {
  message: string;
  nextState: ChatState;
}

export const chatbotScript = {
  greeting: "Hi 👋 I'm Nova. Want a premium website in 2 days?",
  initialState: 'greeting' as ChatState,

  processInput(currentState: ChatState, input: string): ChatResponse {
    const lowerInput = input.toLowerCase();

    switch (currentState) {
      case 'greeting':
        return {
          message: "Great! Let me help you find the perfect package. What type of business do you have?",
          nextState: 'business_type',
        };

      case 'business_type':
        return {
          message: "Perfect! Now, what's your budget range for the website? (Please mention in dollars, e.g., $150, $250, $350)",
          nextState: 'budget',
        };

      case 'budget':
        const budget = this.extractBudget(input);
        const suggestion = this.suggestPackage(budget);
        return {
          message: suggestion,
          nextState: 'package_suggestion',
        };

      case 'package_suggestion':
        return {
          message: "Would you like to try our free demo website first? It's a great way to see our quality!",
          nextState: 'free_trial_offer',
        };

      case 'free_trial_offer':
        if (lowerInput.includes('yes') || lowerInput.includes('sure') || lowerInput.includes('ok')) {
          return {
            message: "Excellent! You can claim your free trial from our Pricing page. To start your full project, please complete payment to 9911553387 and upload the screenshot.",
            nextState: 'payment_reminder',
          };
        }
        return {
          message: "No problem! To start your project, please complete payment to 9911553387 and upload the screenshot when placing your order.",
          nextState: 'payment_reminder',
        };

      case 'payment_reminder':
        return {
          message: "Before we proceed, I'd love to collect your contact information so our team can reach out to you. May I have your details?",
          nextState: 'lead_capture',
        };

      default:
        return {
          message: "Thank you for chatting with me! Feel free to explore our services.",
          nextState: 'completed',
        };
    }
  },

  extractBudget(input: string): number {
    const match = input.match(/\$?(\d+)/);
    return match ? parseInt(match[1]) : 250;
  },

  suggestPackage(budget: number): string {
    if (budget < 200) {
      return `Based on your budget of $${budget}, I recommend our Standard Package at $199. It includes up to 5 pages, mobile responsive design, basic SEO, and 2-day delivery. Perfect for getting started!`;
    } else if (budget >= 300) {
      return `With a budget of $${budget}, our Premium Package at $300 is perfect for you! 👑 It includes up to 10 pages, premium UI/UX, advanced SEO, speed optimization, contact forms, social media integration, premium animations, and priority support. This is our most recommended package!`;
    } else {
      return `With your budget of $${budget}, you have options! Our Standard Package is $199 (5 pages, basic features) or you could stretch to our Premium Package at $300 (10 pages, all premium features). The Premium is our best value and most popular choice!`;
    }
  },
};
