
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ExamplesSection = () => {
  const examples = [
    {
      name: "Cozy Rainy Day",
      description: "Perfect for lazy Sunday mornings with coffee and books",
      colors: ["#8B7355", "#A0522D", "#DEB887", "#F5DEB3"],
      preview: "Feeling cozy at home while it's raining outside",
      tracks: ["Bon Iver", "Norah Jones", "Kings of Convenience"],
    },
    {
      name: "Late Night Drive",
      description: "Atmospheric beats for midnight city cruising",
      colors: ["#1E1E2E", "#6B46C1", "#3B82F6", "#06B6D4"],
      preview: "Driving through the city at 2am with neon lights",
      tracks: ["The Midnight", "Kavinsky", "Perturbator"],
    },
    {
      name: "Summer Vibes",
      description: "Upbeat tracks for beach days and good times",
      colors: ["#FBBF24", "#F59E0B", "#EF4444", "#EC4899"],
      preview: "Perfect sunny day at the beach with friends",
      tracks: ["Tame Impala", "Mac Miller", "Anderson .Paak"],
    },
    {
      name: "Focus Flow",
      description: "Minimal beats for deep work and concentration",
      colors: ["#6B7280", "#9CA3AF", "#D1D5DB", "#F3F4F6"],
      preview: "Need to get into deep focus mode for important work",
      tracks: ["Ólafur Arnalds", "Max Richter", "GoGo Penguin"],
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Vibe Examples
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get inspired by these mood-based playlists, or describe your own unique feeling in natural language.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {examples.map((example, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="mb-4">
                <div className="flex gap-2 mb-4">
                  {example.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {example.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {example.description}
                </p>
                
                <div className="bg-muted rounded-lg p-3 text-sm text-muted-foreground italic mb-4">
                  "{example.preview}"
                </div>
                
                <div className="text-xs text-muted-foreground mb-4">
                  Featured artists: {example.tracks.join(" • ")}
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-primary/5 group-hover:border-primary/30 transition-colors"
              >
                Create This Vibe
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Create Your Vibe
            </h3>
            <p className="text-muted-foreground mb-6">
              Describe any mood or moment in natural language and watch AI craft the perfect soundtrack for your life.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              Start Vibing
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
