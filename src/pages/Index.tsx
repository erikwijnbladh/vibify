
import { HeroSection } from "@/components/HeroSection";
import { PipelineSection } from "@/components/PipelineSection";
import { ExamplesSection } from "@/components/ExamplesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PricingSection } from "@/components/PricingSection";
import { Pricing } from "@/components/ui/pricing";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Mail } from "lucide-react";

const reformiQPlans = [
  {
    name: "STARTER",
    price: "29",
    period: "month",
    features: [
      "5 design system generations",
      "Basic component library",
      "Email support",
      "Standard templates",
      "Export to React/Vue",
    ],
    description: "Perfect for individual designers and small projects",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "79",
    period: "month",
    features: [
      "Unlimited design generations",
      "Advanced AI customization",
      "Priority support",
      "Custom brand integration",
      "Team collaboration",
      "Advanced export options",
      "Version control",
    ],
    description: "Ideal for design teams and growing businesses",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "199",
    period: "month",
    features: [
      "Everything in Professional",
      "Custom AI training",
      "Dedicated account manager",
      "White-label solutions",
      "SSO authentication",
      "Advanced analytics",
      "Custom integrations",
      "SLA guarantee",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PipelineSection />
      <ExamplesSection />
      <FeaturesSection />
      <Pricing 
        plans={reformiQPlans}
        title="Choose Your ReformiQ Plan"
        description="Transform your design workflow with AI-powered component generation. All plans include our core design system tools and continuous updates."
      />
      
      {/* CTA Section */}
      <section className="py-24 bg-white border-t">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Design Process?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join developers and designers who are already creating beautiful, systematic design systems with AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg group">
              Start Creating Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              View Documentation
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            No credit card required • 5 free generations • Upgrade anytime
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">ReformiQ</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                AI-powered design system generator that transforms natural language aesthetic descriptions into production-ready component libraries.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ReformiQ. All rights reserved. Built with AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
