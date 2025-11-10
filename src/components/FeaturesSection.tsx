import { Card } from "@/components/ui/card";
import { Brain, Music, Zap } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Mood Intelligence",
      description: "Advanced AI that understands emotional context, time of day, and activities to suggest perfect music."
    },
    {
      icon: Music,
      title: "Genre Diversity",
      description: "Access to millions of tracks across all genres, from mainstream hits to underground gems."
    },
    {
      icon: Zap,
      title: "Instant Creation",
      description: "Generate personalized playlists in seconds with AI-powered curation and smart matching."
    }
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Powered by AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience intelligent features that understand you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 text-center hover:shadow-hover transition-all duration-300 group border-border/50"
            >
              <div className="w-20 h-20 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-soft">
                <feature.icon className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};