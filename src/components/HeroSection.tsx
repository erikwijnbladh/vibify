import { LavaLamp } from "@/components/ui/fluid-blob";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const HeroSection = () => {
  const navigate = useNavigate();

  const handleCreatePlaylist = () => {
    navigate('/auth');
  };

  return <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <LavaLamp />
      <div className="flex flex-col items-center gap-6">
        <img 
          src="/@vibify.png" 
          alt="Vibify" 
          className="w-32 h-32 md:w-40 md:h-40 mix-blend-exclusion"
        />
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mix-blend-exclusion text-white whitespace-nowrap">
          Vibify
        </h1>
      </div>
      <p className="text-lg md:text-xl text-center text-white mix-blend-exclusion max-w-2xl leading-relaxed mt-6">
        Transform your mood into the perfect playlist. Just describe what you're feeling and let AI curate your soundtrack.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
        <Button 
          size="lg" 
          className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 text-lg group mix-blend-exclusion"
          onClick={handleCreatePlaylist}
        >
          Create Playlist
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        
      </div>
      
      <div className="mt-16 text-white/60 text-sm mix-blend-exclusion">
        
      </div>
    </div>;
};