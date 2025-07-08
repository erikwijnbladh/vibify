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
  return;
};