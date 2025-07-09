import { Card } from "@/components/ui/card";
import { MessageSquare, Music, Sparkles, Download } from "lucide-react";
export const PipelineSection = () => {
  const steps = [{
    icon: MessageSquare,
    title: "Describe Your Vibe",
    description: "Tell us your mood, activity, or feeling in natural language",
    example: "\"Chill Sunday morning with coffee and rain\""
  }, {
    icon: Sparkles,
    title: "AI Analyzes Your Mood",
    description: "Our AI understands the emotional context and musical preferences from your description",
    example: "Tempo, genre, energy level, instruments"
  }, {
    icon: Music,
    title: "Playlist Curated",
    description: "Hand-picked songs that perfectly match your vibe, with smart transitions and flow",
    example: "20-50 songs with perfect mood progression"
  }, {
    icon: Download,
    title: "Export to Spotify",
    description: "Instantly save to your Spotify account or share with friends via playlist links",
    example: "Direct Spotify integration and sharing"
  }];

  return (
    <section className="py-24 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How Vibify Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From your mood to the perfect playlist in seconds
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground mb-4">
                {step.description}
              </p>
              
              <div className="text-sm text-primary bg-primary/5 rounded-lg p-3 italic">
                {step.example}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};