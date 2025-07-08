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
  return;
};