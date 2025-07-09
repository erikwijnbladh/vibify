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
        // Store the playlist in the database
        const { error: dbError } = await (supabase as any)
          .from('playlists')
          .insert({
            user_id: session.user.id,
            prompt: prompt.trim(),
            playlist_name: data.playlist.name,
            playlist_description: data.playlist.description || '',
            spotify_playlist_id: data.playlist.id,
            track_count: data.playlist.trackCount || 0,
            spotify_url: `https://open.spotify.com/playlist/${data.playlist.id}`
          });

        if (dbError) {
          console.error('Error saving playlist to database:', dbError);
          // Still show success to user, but log the error
        }

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
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03)_0%,transparent_60%)]"></div>
      
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8 pt-4 relative z-10">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goBack}
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <img 
              src="/@vibify.png" 
              alt="Vibify" 
              className="w-10 h-10 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-white">Create AI Playlist</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto relative z-10">
        <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20 p-2">
              <img 
                src="/@vibify.png" 
                alt="Vibify" 
                className="w-full h-full rounded-full"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Describe Your Vibe
            </h2>
            <p className="text-white/70">
              Tell us what kind of music you're in the mood for, and our AI will create the perfect public playlist for you to follow
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Textarea
                placeholder="e.g., 'chill indie songs for a rainy Sunday morning' or 'upbeat pop for working out' or 'melancholic folk for late night coding'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] text-lg bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
                disabled={loading}
              />
            </div>

            <Button 
              onClick={handleCreatePlaylist}
              disabled={!prompt.trim() || loading}
              className="w-full bg-white text-black hover:bg-white/90 font-semibold py-3 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
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
              <Card className={`p-6 ${result.success ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'} backdrop-blur-sm`}>
                {result.success ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                      <Music className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-green-300 mb-2">
                      Playlist Created! 🎉
                    </h3>
                    <p className="text-green-200 mb-4">
                      "{result.playlist.name}" with {result.playlist.trackCount} tracks
                    </p>
                    <p className="text-sm text-green-300/80 mb-4">
                      Created by @VibifyMusic • {result.playlist.description}
                    </p>
                    <Button 
                      className="bg-green-500 hover:bg-green-400 text-black font-semibold transition-all duration-300 hover:scale-105"
                      onClick={() => window.open(`https://open.spotify.com/playlist/${result.playlist.id}`, '_blank')}
                    >
                      Open in Spotify
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-red-300 mb-2">
                      Failed to Create Playlist
                    </h3>
                    <p className="text-red-200">
                      {result.error}
                    </p>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Examples */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-sm font-semibold text-white/60 mb-4">✨ Get creative with your prompts:</h4>
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-medium">🏃‍♂️</span>
                <span className="text-white/70">"High-energy EDM and rock for crushing my morning workout"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-medium">🔥</span>
                <span className="text-white/70">"Cozy indie folk and jazz for a rainy Sunday with coffee and books"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400 font-medium">🌙</span>
                <span className="text-white/70">"Melancholic lo-fi and ambient tracks for 3am coding sessions"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 font-medium">🚗</span>
                <span className="text-white/70">"Classic rock and 90s hits for an epic cross-country road trip"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pink-400 font-medium">💕</span>
                <span className="text-white/70">"Romantic ballads and smooth R&B for a dinner date at home"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-medium">🎨</span>
                <span className="text-white/70">"Experimental electronic and post-rock for creative inspiration"</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white/60">
                💡 <strong className="text-white/80">Tip:</strong> Be specific about mood, activity, genre, or even time of day. Our AI understands context and creates playlists that perfectly match your vibe!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreatePlaylist; 