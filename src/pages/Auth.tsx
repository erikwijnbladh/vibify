import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Music, Sparkles } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        navigate('/authenticated');
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          navigate('/authenticated');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSpotifyAuth = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
          scopes: 'playlist-modify-private playlist-modify-public user-read-private user-read-email',
          redirectTo: `${window.location.origin}/authenticated`
        }
      });

      if (error) {
        alert(`Authentication failed: ${error.message}`);
      }
    } catch (error) {
      alert(`Something went wrong: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Connect to Spotify
          </h1>
          <p className="text-muted-foreground">
            Sign in with your Spotify account to start creating personalized playlists
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Create unlimited playlists</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI-powered mood matching</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Seamless Spotify integration</span>
          </div>
        </div>

        <Button 
          onClick={handleSpotifyAuth}
          disabled={loading}
          className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold py-3"
          size="lg"
        >
          {loading ? "Connecting..." : "Continue with Spotify"}
        </Button>

        <p className="text-xs text-muted-foreground mt-4">
          By continuing, you agree to our terms of service and privacy policy
        </p>
      </Card>
    </div>
  );
};

export default Auth; 