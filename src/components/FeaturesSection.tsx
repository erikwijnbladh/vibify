import { Card } from "@/components/ui/card";
import { Brain, Music, Zap, Users, Share, Repeat } from "lucide-react";
export const FeaturesSection = () => {
  const features = [{
    icon: Brain,
    title: "Mood Intelligence",
    description: "Advanced AI that understands emotional context, time of day, weather, and activities to suggest perfect music."
  }, {
    icon: Music,
    title: "Genre Diversity",
    description: "Access to millions of tracks across all genres, from mainstream hits to underground gems and indie discoveries."
  }, {
    icon: Zap,
    title: "Instant Creation",
    description: "Generate personalized playlists in seconds with smart song transitions and perfect flow progression."
  }, {
    icon: Users,
    title: "Social Sharing",
    description: "Share your vibes with friends, discover new music through community playlists, and build musical connections."
  }, {
    icon: Share,
    title: "Spotify Integration",
    description: "Seamless sync with your Spotify account, automatic playlist creation, and offline listening capabilities."
  }, {
    icon: Repeat,
    title: "Smart Learning",
    description: "AI learns from your feedback and listening patterns to continuously improve your personalized recommendations."
  }];

  return (
    <section className="py-24 bg-gradient-to-br from-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of music discovery with intelligent features that understand you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-10 h-10 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">
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