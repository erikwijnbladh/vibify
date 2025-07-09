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
      // Get current user session to access Spotify tokens
      const { data: { session } } = await supabase.auth.getSession();
      
      // Check for tokens in different possible locations
      const spotifyToken = session?.provider_token || 
                          session?.user?.user_metadata?.provider_token ||
                          session?.user?.app_metadata?.provider_token;
      
      if (!spotifyToken) {
        throw new Error('No Spotify access token found. Please re-authenticate with Spotify.');
      }

      // Call the Supabase Edge Function for AI-powered playlist creation
      const { data, error } = await supabase.functions.invoke('prompt_to_playlist', {
        body: { 
          prompt: prompt.trim(),
          spotify_token: spotifyToken
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
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8 pt-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={goBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">Create AI Playlist</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Describe Your Vibe
            </h2>
            <p className="text-muted-foreground">
              Tell us what kind of music you're in the mood for, and our AI will create the perfect playlist
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Textarea
                placeholder="e.g., 'chill indie songs for a rainy Sunday morning' or 'upbeat pop for working out' or 'melancholic folk for late night coding'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] text-lg"
                disabled={loading}
              />
            </div>

            <Button 
              onClick={handleCreatePlaylist}
              disabled={!prompt.trim() || loading}
              className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold py-3"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Your Playlist...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Playlist
                </>
              )}
            </Button>

            {/* Result Display */}
            {result && (
              <Card className={`p-6 ${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                {result.success ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Music className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      Playlist Created! 🎉
                    </h3>
                    <p className="text-green-700 mb-4">
                      "{result.playlist.name}" with {result.playlist.trackCount} tracks
                    </p>
                    <p className="text-sm text-green-600 mb-4">
                      {result.playlist.description}
                    </p>
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.open(`https://open.spotify.com/playlist/${result.playlist.id}`, '_blank')}
                    >
                      Open in Spotify
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-red-800 mb-2">
                      Failed to Create Playlist
                    </h3>
                    <p className="text-red-700">
                      {result.error}
                    </p>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Examples */}
          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4">✨ Get creative with your prompts:</h4>
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-500 font-medium">🏃‍♂️</span>
                <span className="text-muted-foreground">"High-energy EDM and rock for crushing my morning workout"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 font-medium">🔥</span>
                <span className="text-muted-foreground">"Cozy indie folk and jazz for a rainy Sunday with coffee and books"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-500 font-medium">🌙</span>
                <span className="text-muted-foreground">"Melancholic lo-fi and ambient tracks for 3am coding sessions"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-medium">🚗</span>
                <span className="text-muted-foreground">"Classic rock and 90s hits for an epic cross-country road trip"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pink-500 font-medium">💕</span>
                <span className="text-muted-foreground">"Romantic ballads and smooth R&B for a dinner date at home"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500 font-medium">🎨</span>
                <span className="text-muted-foreground">"Experimental electronic and post-rock for creative inspiration"</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary/5 rounded-lg">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Tip:</strong> Be specific about mood, activity, genre, or even time of day. Our AI understands context and creates playlists that perfectly match your vibe!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreatePlaylist; 