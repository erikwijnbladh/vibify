import { Card } from "@/components/ui/card";
import { MessageSquare, Music, Sparkles, ExternalLink } from "lucide-react";

export const PipelineSection = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Describe Your Mood",
      description: "Tell us what you're feeling in natural language",
      example: "Chill Sunday morning vibes"
    },
    {
      icon: Sparkles,
      title: "AI Analysis",
      description: "Our AI understands your emotional context",
      example: "Tempo, energy, genre matching"
    },
    {
      icon: Music,
      title: "Curated Playlist",
      description: "Perfect songs with smart transitions",
      example: "20-50 tracks, seamless flow"
    },
    {
      icon: ExternalLink,
      title: "Spotify Export",
      description: "Instantly save to your account",
      example: "One-click integration"
    }
  ];

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From mood to music in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="p-6 text-center hover:shadow-hover transition-all duration-300 border-border/50 relative group"
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-warm rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground shadow-soft">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">
                {step.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {step.description}
              </p>
              
              <div className="text-xs bg-muted rounded-lg p-3 font-medium text-muted-foreground">
                {step.example}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};