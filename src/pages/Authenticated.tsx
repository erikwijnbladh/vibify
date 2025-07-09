import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Music, User, LogOut, Home, Sparkles } from "lucide-react";

const Authenticated = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const goHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8 pt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">Vibify</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={goHome}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Vibify!
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            You're successfully connected to Spotify
          </p>
          {user?.email && (
            <p className="text-sm text-muted-foreground">
              Signed in as: {user.email}
            </p>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Playlists</h3>
            <p className="text-muted-foreground">
              Create personalized playlists based on your mood and preferences
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Curation</h3>
            <p className="text-muted-foreground">
              Our AI understands context and creates perfect soundtracks
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personal Touch</h3>
            <p className="text-muted-foreground">
              Tailored to your unique music taste and listening history
            </p>
          </Card>
        </div>

        {/* Create Playlist Section */}
        <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
          <h3 className="text-2xl font-bold mb-4">🎵 Ready to Create?</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Describe your mood and let our AI create the perfect playlist for you!
          </p>
          <Button 
            size="lg" 
            className="bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold px-8 py-3"
            onClick={() => navigate('/create-playlist')}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Create AI Playlist
          </Button>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mt-6">
            <span>• Natural language prompts</span>
            <span>• AI-powered analysis</span>
            <span>• Smart music curation</span>
            <span>• Direct Spotify integration</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Authenticated; 