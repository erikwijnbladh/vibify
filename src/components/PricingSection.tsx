
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, Zap } from "lucide-react";

export const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for trying out the concept",
      features: [
        "5 AI generations per month",
        "Basic component exports",
        "Community support",
        "shadcn/ui compatible code",
      ],
      cta: "Start Free",
      popular: false,
      icon: Sparkles,
    },
    {
      name: "Pro",
      price: "19",
      period: "month",
      description: "For developers and small teams",
      features: [
        "Unlimited AI generations",
        "Advanced component exports",
        "Priority support",
        "GitHub integration",
        "Figma sync (coming soon)",
        "Custom design tokens",
        "Team collaboration",
      ],
      cta: "Go Pro",
      popular: true,
      icon: Zap,
    },
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, no complex tiers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`p-8 relative ${plan.popular ? 'border-2 border-blue-500 bg-white' : 'bg-white'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                
                <p className="text-gray-600">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                size="lg"
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            All plans include core features. Upgrade or downgrade anytime. No questions asked 30-day refund policy.
          </p>
        </div>
      </div>
    </section>
  );
};
