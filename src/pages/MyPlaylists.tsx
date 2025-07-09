import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Music, ExternalLink, Calendar, Hash } from "lucide-react";
import { format } from "date-fns";

interface Playlist {
  id: string;
  prompt: string;
  playlist_name: string;
  playlist_description: string;
  spotify_playlist_id: string;
  track_count: number;
  spotify_url: string;
  created_at: string;
}

const MyPlaylists = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUserAndLoadPlaylists = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      
      setUser(user);
      await loadPlaylists();
    };

    checkUserAndLoadPlaylists();
  }, [navigate]);

  const loadPlaylists = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('playlists')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading playlists:', error);
        return;
      }

      setPlaylists(data || []);
    } catch (error) {
      console.error('Error loading playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80">Loading your playlists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary text-white p-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8 pt-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goBack}
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <img 
              src="/@vibify.png" 
              alt="Vibify" 
              className="w-10 h-10 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-white">My Playlists</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {playlists.length === 0 ? (
          <Card className="p-8 text-center bg-white/10 border-white/20 backdrop-blur-md">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-10 h-10 text-white/70" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Playlists Yet</h3>
            <p className="text-white/70 mb-6">
              You haven't created any AI playlists yet. Start by describing your vibe!
            </p>
            <Button 
              onClick={() => navigate('/create-playlist')}
              className="bg-white text-black hover:bg-white/90 font-semibold"
            >
              Create Your First Playlist
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Your AI-Generated Playlists
              </h2>
              <p className="text-white/70">
                {playlists.length} playlist{playlists.length !== 1 ? 's' : ''} created
              </p>
            </div>

            {playlists.map((playlist) => (
              <Card 
                key={playlist.id} 
                className="p-6 bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {playlist.playlist_name}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {playlist.playlist_description}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3 mb-4 border border-white/10">
                      <p className="text-white/90 text-sm leading-relaxed">
                        <span className="text-white/60">Prompt:</span> "{playlist.prompt}"
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <Hash className="w-4 h-4" />
                        <span>{playlist.track_count} tracks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(playlist.created_at), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <Button 
                      onClick={() => window.open(playlist.spotify_url, '_blank')}
                      className="bg-green-500 hover:bg-green-400 text-black font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Spotify
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlaylists;