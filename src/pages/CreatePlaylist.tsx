import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Music, Sparkles, ArrowLeft, Loader2 } from "lucide-react";

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCreatePlaylist = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResult(null);

    try {
      // Verify user is authenticated (for tracking/rate limiting)
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        throw new Error('Please sign in to create playlists.');
      }

      // Call the Supabase Edge Function for AI-powered playlist creation
      // (Uses Vibify Spotify account on backend, not user's account)
      const { data, error } = await supabase.functions.invoke('prompt_to_playlist', {
        body: { 
          prompt: prompt.trim()
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to create playlist');
      }

      if (data.success) {
        setResult({
          success: true,
          playlist: data.playlist
        });
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }

    } catch (error) {
      console.error('Error creating playlist:', error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create playlist'
      });
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate('/authenticated');
  };

  return (
    <div className="min-h-screen animated-gradient p-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8 pt-4">
        <div className="glass-card rounded-2xl p-6 transition-smooth">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={goBack}
              className="glass-card text-white border-white/20 hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Create AI Playlist</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        <Card className="glass-card p-10 shadow-glow">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Describe Your Vibe
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Tell us what kind of music you're in the mood for, and our AI will create a public playlist that you can instantly follow on Spotify
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Textarea
                placeholder="e.g., 'chill indie songs for a rainy Sunday morning' or 'upbeat pop for working out' or 'melancholic folk for late night coding'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[140px] text-lg glass-card text-white placeholder:text-white/60 border-white/20 focus:border-white/40 resize-none"
                disabled={loading}
              />
            </div>

            <Button 
              onClick={handleCreatePlaylist}
              disabled={!prompt.trim() || loading}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-4 text-lg rounded-2xl backdrop-blur-sm border border-white/20 transition-smooth shadow-elegant"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Creating Your Playlist...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 mr-3" />
                  Generate Playlist
                </>
              )}
            </Button>

            {/* Result Display */}
            {result && (
              <Card className={`glass-card p-8 ${result.success ? 'border-green-400/30 bg-green-500/10' : 'border-red-400/30 bg-red-500/10'} shadow-glow`}>
                {result.success ? (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-400/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Music className="w-10 h-10 text-green-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Playlist Created! 🎉
                    </h3>
                    <p className="text-white/90 mb-4 text-lg">
                      "{result.playlist.name}" with {result.playlist.trackCount} tracks
                    </p>
                    <p className="text-white/70 mb-6">
                      Created by @VibifyMusic • {result.playlist.description}
                    </p>
                    <Button 
                      className="bg-green-500/30 hover:bg-green-500/40 text-white border border-green-400/30 backdrop-blur-sm transition-smooth px-8 py-3 rounded-xl"
                      onClick={() => window.open(`https://open.spotify.com/playlist/${result.playlist.id}`, '_blank')}
                    >
                      Open in Spotify
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Music className="w-8 h-8 text-red-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Failed to Create Playlist
                    </h3>
                    <p className="text-white/80">
                      {result.error}
                    </p>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Examples */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <h4 className="text-lg font-semibold text-white mb-6">✨ Get creative with your prompts:</h4>
            <div className="grid gap-4">
              <div className="flex items-start gap-3 glass-card p-4 rounded-xl">
                <span className="text-2xl">🏃‍♂️</span>
                <span className="text-white/80">"High-energy EDM and rock for crushing my morning workout"</span>
              </div>
              <div className="flex items-start gap-3 glass-card p-4 rounded-xl">
                <span className="text-2xl">🔥</span>
                <span className="text-white/80">"Cozy indie folk and jazz for a rainy Sunday with coffee and books"</span>
              </div>
              <div className="flex items-start gap-3 glass-card p-4 rounded-xl">
                <span className="text-2xl">🌙</span>
                <span className="text-white/80">"Melancholic lo-fi and ambient tracks for 3am coding sessions"</span>
              </div>
              <div className="flex items-start gap-3 glass-card p-4 rounded-xl">
                <span className="text-2xl">🚗</span>
                <span className="text-white/80">"Classic rock and 90s hits for an epic cross-country road trip"</span>
              </div>
              <div className="flex items-start gap-3 glass-card p-4 rounded-xl">
                <span className="text-2xl">💕</span>
                <span className="text-white/80">"Romantic ballads and smooth R&B for a dinner date at home"</span>
              </div>
              <div className="flex items-start gap-3 glass-card p-4 rounded-xl">
                <span className="text-2xl">🎨</span>
                <span className="text-white/80">"Experimental electronic and post-rock for creative inspiration"</span>
              </div>
            </div>
            <div className="mt-6 glass-card p-5 rounded-2xl">
              <p className="text-white/70 leading-relaxed">
                💡 <strong className="text-white">Tip:</strong> Be specific about mood, activity, genre, or even time of day. Our AI understands context and creates playlists that perfectly match your vibe!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreatePlaylist; 