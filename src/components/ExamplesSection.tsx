import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export const ExamplesSection = () => {
  const examples = [{
    name: "Cozy Rainy Day",
    description: "Perfect for lazy Sunday mornings with coffee and books",
    colors: ["#8B7355", "#A0522D", "#DEB887", "#F5DEB3"],
    preview: "Feeling cozy at home while it's raining outside",
    tracks: ["Bon Iver", "Norah Jones", "Kings of Convenience"]
  }, {
    name: "Late Night Drive",
    description: "Atmospheric beats for midnight city cruising",
    colors: ["#1E1E2E", "#6B46C1", "#3B82F6", "#06B6D4"],
    preview: "Driving through the city at 2am with neon lights",
    tracks: ["The Midnight", "Kavinsky", "Perturbator"]
  }, {
    name: "Summer Vibes",
    description: "Upbeat tracks for beach days and good times",
    colors: ["#FBBF24", "#F59E0B", "#EF4444", "#EC4899"],
    preview: "Perfect sunny day at the beach with friends",
    tracks: ["Tame Impala", "Mac Miller", "Anderson .Paak"]
  }, {
    name: "Focus Flow",
    description: "Minimal beats for deep work and concentration",
    colors: ["#6B7280", "#9CA3AF", "#D1D5DB", "#F3F4F6"],
    preview: "Need to get into deep focus mode for important work",
    tracks: ["Ólafur Arnalds", "Max Richter", "GoGo Penguin"]
  }];

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Mood to Music Examples
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how your feelings transform into the perfect soundtrack
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {examples.map((example, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div 
                className="h-32 relative"
                style={{
                  background: `linear-gradient(135deg, ${example.colors[0]}, ${example.colors[1]}, ${example.colors[2]}, ${example.colors[3]})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{example.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-4">{example.description}</p>
                
                <div className="text-sm bg-muted rounded-lg p-3 mb-4 italic">
                  "{example.preview}"
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Featured Artists:</p>
                  <div className="flex flex-wrap gap-2">
                    {example.tracks.map((artist, artistIndex) => (
                      <span key={artistIndex} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {artist}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full mt-4 group-hover:bg-primary/90" size="sm">
                  Try This Vibe
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};