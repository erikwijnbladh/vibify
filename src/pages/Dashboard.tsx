import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Music2, Sparkles, LogOut, Crown, History, Loader2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
      } else {
        setUser(user);
        
        // Check if user is admin
        const { data: profile } = await (supabase as any)
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        
        setIsAdmin(profile?.is_admin || false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-warm rounded-xl flex items-center justify-center">
                <Music2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Vibify</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 space-y-3 animate-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Welcome Back
          </h2>
          {user?.email && (
            <p className="text-muted-foreground">
              {user.email}
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-8 text-center hover:shadow-hover transition-all duration-300 group border-border/50">
            <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-soft">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Create Playlist</h3>
            <p className="text-muted-foreground mb-6">
              Describe your mood and let AI craft the perfect playlist
            </p>
            <Button 
              size="lg" 
              className="shadow-soft hover:shadow-hover"
              onClick={() => navigate('/create-playlist')}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Now
            </Button>
          </Card>

          <Card className="p-8 text-center hover:shadow-hover transition-all duration-300 group border-border/50">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <History className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-2">My Playlists</h3>
            <p className="text-muted-foreground mb-6">
              Browse and revisit your AI-generated collections
            </p>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/my-playlists')}
            >
              <History className="w-4 h-4 mr-2" />
              View Playlists
            </Button>
          </Card>
        </div>

        {/* Admin Access */}
        {isAdmin && (
          <Card className="p-6 text-center border-primary/30 bg-primary/5 animate-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Admin Access</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              View analytics, user data, and system statistics
            </p>
            <Button 
              onClick={() => navigate('/admin')}
              variant="outline"
              className="border-primary/30"
            >
              <Crown className="w-4 h-4 mr-2" />
              Admin Dashboard
            </Button>
          </Card>
        )}

        {/* Features Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mt-12">
          <span>• Natural language prompts</span>
          <span>• AI-powered analysis</span>
          <span>• Smart music curation</span>
          <span>• Direct Spotify integration</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;