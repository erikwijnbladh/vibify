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
        navigate('/');
        return;
      }
      
      setUser(user);
      await loadPlaylists();
    };

    checkUserAndLoadPlaylists();
  }, [navigate]);

  const loadPlaylists = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await (supabase as any)
        .from('playlists')
        .select('*')
        .eq('user_id', user.id)
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your playlists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={goBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-warm rounded-lg flex items-center justify-center">
                <Music className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-bold">My Playlists</h1>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {playlists.length === 0 ? (
          <Card className="p-12 text-center shadow-hover border-border/50 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Music className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No Playlists Yet</h3>
            <p className="text-muted-foreground mb-8">
              You haven't created any AI playlists yet. Start by describing your vibe!
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/create-playlist')}
              className="shadow-soft hover:shadow-hover"
            >
              Create Your First Playlist
            </Button>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="text-center mb-8 animate-in">
              <h2 className="text-4xl font-bold mb-2">
                Your Collection
              </h2>
              <p className="text-muted-foreground">
                {playlists.length} playlist{playlists.length !== 1 ? 's' : ''} created
              </p>
            </div>

            <div className="grid gap-6">
              {playlists.map((playlist) => (
                <Card 
                  key={playlist.id} 
                  className="p-6 hover:shadow-hover transition-all duration-300 border-border/50"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-warm rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                          <Music className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold mb-1 truncate">
                            {playlist.playlist_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {playlist.playlist_description}
                          </p>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-4 border border-border">
                        <p className="text-sm leading-relaxed">
                          <span className="text-muted-foreground font-medium">Prompt:</span> "{playlist.prompt}"
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Hash className="w-4 h-4" />
                          <span>{playlist.track_count} tracks</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(playlist.created_at), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-right flex-shrink-0">
                      <Button 
                        onClick={() => window.open(playlist.spotify_url, '_blank')}
                        className="shadow-soft hover:shadow-hover w-full lg:w-auto"
                        size="lg"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open in Spotify
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlaylists;