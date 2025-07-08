
import { Card } from "@/components/ui/card";
import { MessageSquare, Music, Sparkles, Download } from "lucide-react";

export const PipelineSection = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Describe Your Vibe",
      description: "Tell us your mood, activity, or feeling in natural language",
      example: "\"Chill Sunday morning with coffee and rain\"",
    },
    {
      icon: Sparkles,
      title: "AI Analyzes Your Mood",
      description: "Our AI understands the emotional context and musical preferences from your description",
      example: "Tempo, genre, energy level, instruments",
    },
    {
      icon: Music,
      title: "Playlist Curated",
      description: "Hand-picked songs that perfectly match your vibe, with smart transitions and flow",
      example: "20-50 songs with perfect mood progression",
    },
    {
      icon: Download,
      title: "Export to Spotify",
      description: "Instantly save to your Spotify account or share with friends via playlist links",
      example: "Direct Spotify integration and sharing",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            From Mood to Music
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered music engine transforms your feelings into the perfect soundtrack, understanding context and emotion like never before.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              
              <div className="text-sm font-semibold text-primary mb-2">
                Step {index + 1}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {step.description}
              </p>
              
              <div className="bg-muted rounded-lg p-3 text-sm text-muted-foreground italic">
                {step.example}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Average playlist creation: 15 seconds
          </div>
        </div>
      </div>
    </section>
  );
};
