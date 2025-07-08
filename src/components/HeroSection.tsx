
import { LavaLamp } from "@/components/ui/fluid-blob";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <LavaLamp/>
      <h1 className="text-6xl md:text-8xl font-bold tracking-tight mix-blend-exclusion text-white whitespace-nowrap">
        Vibify
      </h1>
      <p className="text-lg md:text-xl text-center text-white mix-blend-exclusion max-w-2xl leading-relaxed mt-6">
        Transform your mood into the perfect playlist. Just describe what you're feeling and let AI curate your soundtrack.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
        <Button 
          size="lg" 
          className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 text-lg group mix-blend-exclusion"
        >
          Create Playlist
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
          style={{ mixBlendMode: 'exclusion' }}
        >
          Browse Vibes
        </Button>
      </div>
      
      <div className="mt-16 text-white/60 text-sm mix-blend-exclusion">
        <p>Free tier: 5 playlists • Pro: Unlimited + Spotify sync • No credit card required</p>
      </div>
    </div>
  );
};
