
import { Card } from "@/components/ui/card";
import { Brain, Music, Zap, Users, Share, Repeat } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Mood Intelligence",
      description: "Advanced AI that understands emotional context, time of day, weather, and activities to suggest perfect music.",
    },
    {
      icon: Music,
      title: "Genre Diversity",
      description: "Access to millions of tracks across all genres, from mainstream hits to underground gems and indie discoveries.",
    },
    {
      icon: Zap,
      title: "Instant Creation",
      description: "Generate personalized playlists in seconds with smart song transitions and perfect flow progression.",
    },
    {
      icon: Users,
      title: "Social Sharing",
      description: "Share your vibes with friends, discover new music through community playlists, and build musical connections.",
    },
    {
      icon: Share,
      title: "Spotify Integration",
      description: "Seamless sync with your Spotify account, automatic playlist creation, and offline listening capabilities.",
    },
    {
      icon: Repeat,
      title: "Smart Learning",
      description: "AI learns from your feedback and listening patterns to continuously improve your personalized recommendations.",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From mood to music, we provide all the tools you need to discover, create, and share the perfect soundtrack for every moment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
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
