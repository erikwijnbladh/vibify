import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Music, User, LogOut, Home, Sparkles } from "lucide-react";

const Dashboard = () => {
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
    <div className="min-h-screen bg-black text-white p-4 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03)_0%,transparent_60%)]"></div>
      
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8 pt-4 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/@vibify.png" 
              alt="Vibify" 
              className="w-10 h-10 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-white">Vibify Dashboard</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-white/20 text-black hover:bg-white/10 hover:border-white/30"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20 p-2">
            <img 
              src="/@vibify.png" 
              alt="Vibify" 
              className="w-full h-full rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to Vibify!
          </h2>
          {user?.email && (
            <p className="text-sm text-white/60">
              Signed in as: {user.email}
            </p>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center hover:scale-105 transition-all duration-300 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">AI Playlists</h3>
            <p className="text-white/70">
              Create personalized playlists based on your mood and preferences
            </p>
          </Card>

          <Card className="p-6 text-center hover:scale-105 transition-all duration-300 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Smart Curation</h3>
            <p className="text-white/70">
              Our AI understands context and creates perfect soundtracks
            </p>
          </Card>

          <Card className="p-6 text-center hover:scale-105 transition-all duration-300 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Personal Touch</h3>
            <p className="text-white/70">
              Tailored to your unique music taste and listening history
            </p>
          </Card>
        </div>

        {/* Create Playlist Section */}
        <Card className="p-8 text-center bg-white/5 border-white/10 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-50"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 text-white">🎵 Ready to Create?</h3>
            <p className="text-lg text-white/70 mb-6">
              Describe your mood and let our AI create the perfect playlist for you!
            </p>
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-3 transition-all duration-300 hover:scale-105"
              onClick={goToCreatePlaylist}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create AI Playlist
            </Button>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60 mt-6">
              <span>• Natural language prompts</span>
              <span>• AI-powered analysis</span>
              <span>• Smart music curation</span>
              <span>• Direct Spotify integration</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 