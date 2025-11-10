import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Music2, Sparkles, ArrowLeft, Loader2, Check, ExternalLink, Brain, Search, Headphones, Wand2, Sparkle } from "lucide-react";
import { toast } from "sonner";

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const loadingMessages = [
    { text: "Analyzing your vibe...", icon: Brain },
    { text: "Curating perfect tracks...", icon: Search },
    { text: "Fine-tuning the mood...", icon: Wand2 },
    { text: "Adding magical touches...", icon: Sparkle },
    { text: "Almost there...", icon: Headphones },
  ];

  useEffect(() => {
    // Check auth
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  // Simulate progress during generation
  useEffect(() => {
    if (loading) {
      setProgress(0);
      setLoadingMessageIndex(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Rotate through loading messages
  useEffect(() => {
    if (loading && progress > 0) {
      const messageInterval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
      return () => clearInterval(messageInterval);
    }
  }, [loading, progress]);

  const handleCreatePlaylist = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe your vibe first");
      return;
    }
    
    setLoading(true);
    setResult(null);
    setProgress(0);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        throw new Error('Please sign in to create playlists');
      }

      const { data, error } = await supabase.functions.invoke('prompt_to_playlist', {
        body: { prompt: prompt.trim() }
      });

      if (error) throw new Error(error.message || 'Failed to create playlist');

      if (data.success) {
        setProgress(100);
        
        // Store in database
        await (supabase as any)
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

        setResult({
          success: true,
          playlist: data.playlist
        });
        
        toast.success("Playlist created successfully!");
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }

    } catch (error: any) {
      console.error('Error creating playlist:', error);
      setResult({
        success: false,
        error: error.message || 'Failed to create playlist'
      });
      toast.error(error.message || 'Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  const examplePrompts = [
    { emoji: "🏃‍♂️", text: "High-energy EDM for crushing my morning workout" },
    { emoji: "☕", text: "Cozy indie folk for a rainy Sunday with coffee" },
    { emoji: "🌙", text: "Melancholic lo-fi for 3am coding sessions" },
    { emoji: "🚗", text: "Classic rock for an epic road trip" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-warm rounded-lg flex items-center justify-center">
                <Music2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Create Playlist</span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 space-y-3 animate-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            Describe Your Vibe
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us what you're in the mood for, and our AI will curate the perfect playlist
          </p>
        </div>

        <Card className="p-8 shadow-hover border-border/50 mb-8">
          <div className="space-y-6">
            <div>
              <Textarea
                placeholder="e.g., 'chill indie songs for a rainy Sunday morning' or 'upbeat pop for working out'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[140px] text-lg resize-none"
                disabled={loading}
                aria-label="Playlist mood description"
              />
            </div>

            {/* Loading Progress */}
            {loading && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 animate-in">
                  {(() => {
                    const CurrentIcon = loadingMessages[loadingMessageIndex].icon;
                    return <CurrentIcon className="w-5 h-5 text-primary animate-pulse" />;
                  })()}
                  <span className="text-sm font-medium text-foreground">
                    {loadingMessages[loadingMessageIndex].text}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-primary">{progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-warm transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <Button 
              onClick={handleCreatePlaylist}
              disabled={!prompt.trim() || loading}
              className="w-full h-12 text-base shadow-soft hover:shadow-hover"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Playlist...
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
              <Card className={`p-6 animate-in ${result.success ? 'border-primary/30 bg-primary/5' : 'border-destructive/30 bg-destructive/5'}`}>
                {result.success ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        Playlist Created! 🎉
                      </h3>
                      <p className="text-lg font-medium text-primary mb-1">
                        "{result.playlist.name}"
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {result.playlist.trackCount} tracks • Created by @VibifyMusic
                      </p>
                      {result.playlist.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {result.playlist.description}
                        </p>
                      )}
                    </div>
                    <Button 
                      className="shadow-soft hover:shadow-hover"
                      onClick={() => window.open(`https://open.spotify.com/playlist/${result.playlist.id}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Spotify
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-destructive mb-2">
                      Failed to Create Playlist
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {result.error}
                    </p>
                  </div>
                )}
              </Card>
            )}
          </div>
        </Card>

        {/* Examples */}
        <Card className="p-6 border-border/50">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Try these prompts
          </h4>
          <div className="grid gap-3">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example.text)}
                disabled={loading}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-2xl" role="img" aria-label="Emoji">{example.emoji}</span>
                <span className="text-sm text-muted-foreground flex-1">{example.text}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 flex items-start gap-2">
            <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span>Be specific about mood, activity, genre, or time of day for best results</span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default CreatePlaylist;
