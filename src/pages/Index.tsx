import { HeroSection } from "@/components/HeroSection";
import { PipelineSection } from "@/components/PipelineSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Music2 } from "lucide-react";

const year = new Date().getFullYear();

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PipelineSection />
      <FeaturesSection />

      {/* Footer */}
      <footer className="bg-gradient-subtle border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-warm rounded-xl flex items-center justify-center">
                <Music2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Vibify</h3>
                <p className="text-xs text-muted-foreground">
                  AI-powered playlist generation
                </p>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              &copy; {year} Vibify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;