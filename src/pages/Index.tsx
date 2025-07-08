
import { HeroSection } from "@/components/HeroSection";
import { PipelineSection } from "@/components/PipelineSection";
import { ExamplesSection } from "@/components/ExamplesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PricingSection } from "@/components/PricingSection";
import { Pricing } from "@/components/ui/pricing";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Mail } from "lucide-react";

const vibifyPlans = [
  {
    name: "FREE",
    price: "0",
    period: "month",
    features: [
      "5 playlist generations per month",
      "Basic mood analysis",
      "Spotify export",
      "Community sharing",
      "Standard recommendations",
    ],
    description: "Perfect for casual listeners exploring new music",
    buttonText: "Start Free",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "VIBE PRO",
    price: "9",
    period: "month",
    features: [
      "Unlimited playlist generations",
      "Advanced mood intelligence",
      "Priority song selection",
      "Custom vibe profiles",
      "Collaborative playlists",
      "Offline sync",
      "Premium recommendations",
    ],
    description: "Ideal for music lovers and active playlist creators",
    buttonText: "Get Pro",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "VIBE FAMILY",
    price: "19",
    period: "month",
    features: [
      "Everything in Pro",
      "Up to 6 family members",
      "Individual profiles",
      "Parental controls",
      "Shared family playlists",
      "Concert recommendations",
      "Priority support",
      "Early feature access",
    ],
    description: "For families who want to share the perfect vibes together",
    buttonText: "Start Family Plan",
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
        plans={vibifyPlans}
        title="Choose Your Vibify Plan"
        description="Transform your music discovery with AI-powered playlist generation. All plans include our core mood intelligence and continuous music updates."
      />
      
      {/* CTA Section */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Transform Your Music Experience?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join music lovers who are already discovering their perfect soundtrack with AI-powered playlist generation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg group">
              Start Vibing Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              Explore Playlists
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            No credit card required • 5 free playlists • Upgrade anytime
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Vibify</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                AI-powered playlist generator that transforms your mood and moments into the perfect soundtrack for every occasion.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Vibe Gallery</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Spotify Connect</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Music Tips</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Vibify. All rights reserved. Music made personal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
