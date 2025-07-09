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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const goToCreatePlaylist = () => {
    navigate('/create-playlist');
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
    <div className="min-h-screen animated-gradient p-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8 pt-4">
        <div className="glass-card rounded-2xl p-6 transition-smooth">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Vibify Dashboard</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="glass-card text-white border-white/30 hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-24 h-24 glass-card rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
            Welcome to Vibify!
          </h2>
          {user?.email && (
            <p className="text-lg text-white/80 backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 inline-block">
              {user.email}
            </p>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card p-8 text-center hover:bg-white/20 transition-smooth shadow-elegant group">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-smooth">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">AI Playlists</h3>
            <p className="text-white/80 leading-relaxed">
              Create personalized playlists based on your mood and preferences
            </p>
          </Card>

          <Card className="glass-card p-8 text-center hover:bg-white/20 transition-smooth shadow-elegant group">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-smooth">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Smart Curation</h3>
            <p className="text-white/80 leading-relaxed">
              Our AI understands context and creates perfect soundtracks
            </p>
          </Card>

          <Card className="glass-card p-8 text-center hover:bg-white/20 transition-smooth shadow-elegant group md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-smooth">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Personal Touch</h3>
            <p className="text-white/80 leading-relaxed">
              Tailored to your unique music taste and listening history
            </p>
          </Card>
        </div>

        {/* Create Playlist Section */}
        <Card className="glass-card p-10 text-center shadow-glow hover:bg-white/20 transition-smooth">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-white">Ready to Create?</h3>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Describe your mood and let our AI create the perfect playlist for you!
          </p>
          <Button 
            size="lg" 
            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-10 py-4 text-lg rounded-2xl backdrop-blur-sm border border-white/20 transition-smooth shadow-elegant"
            onClick={goToCreatePlaylist}
          >
            <Sparkles className="w-6 h-6 mr-3" />
            Create AI Playlist
          </Button>
          <div className="flex flex-wrap justify-center gap-6 text-white/70 mt-8">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/50"></div>
              Natural language prompts
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/50"></div>
              AI-powered analysis
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/50"></div>
              Smart music curation
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/50"></div>
              Instant playlist following
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Authenticated; 