import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Users, Music, BarChart3, Calendar, Shield, Crown } from "lucide-react";
import { format } from "date-fns";

interface AdminStats {
  totalUsers: number;
  totalPlaylists: number;
  playlistsToday: number;
  playlistsThisWeek: number;
}

interface RecentPlaylist {
  id: string;
  prompt: string;
  playlist_name: string;
  track_count: number;
  created_at: string;
  user_email: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalPlaylists: 0,
    playlistsToday: 0,
    playlistsThisWeek: 0
  });
  const [recentPlaylists, setRecentPlaylists] = useState<RecentPlaylist[]>([]);

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      setUser(user);

      // Check if user is admin
      const { data: profile, error } = await (supabase as any)
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (error || !profile?.is_admin) {
        navigate('/dashboard');
        return;
      }

      setIsAdmin(true);
      await loadAdminData();
      setLoading(false);
    };

    checkAdminAccess();
  }, [navigate]);

  const loadAdminData = async () => {
    try {
      // Load stats
      const [usersResponse, playlistsResponse] = await Promise.all([
        (supabase as any).from('profiles').select('id', { count: 'exact' }),
        (supabase as any).from('playlists').select('created_at', { count: 'exact' })
      ]);

      const totalUsers = usersResponse.count || 0;
      const totalPlaylists = playlistsResponse.count || 0;

      // Calculate playlists today and this week
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);

      const [todayResponse, weekResponse] = await Promise.all([
        (supabase as any)
          .from('playlists')
          .select('id', { count: 'exact' })
          .gte('created_at', today.toISOString()),
        (supabase as any)
          .from('playlists')
          .select('id', { count: 'exact' })
          .gte('created_at', weekAgo.toISOString())
      ]);

      setStats({
        totalUsers,
        totalPlaylists,
        playlistsToday: todayResponse.count || 0,
        playlistsThisWeek: weekResponse.count || 0
      });

      // Load recent playlists with user emails
      const { data: playlists, error: playlistsError } = await (supabase as any)
        .from('playlists')
        .select(`
          id,
          prompt,
          playlist_name,
          track_count,
          created_at,
          profiles!inner(email)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (playlistsError) {
        console.error('Error loading recent playlists:', playlistsError);
        return;
      }

      const formattedPlaylists = playlists?.map((playlist: any) => ({
        id: playlist.id,
        prompt: playlist.prompt,
        playlist_name: playlist.playlist_name,
        track_count: playlist.track_count,
        created_at: playlist.created_at,
        user_email: playlist.profiles.email
      })) || [];

      setRecentPlaylists(formattedPlaylists);
    } catch (error) {
      console.error('Error loading admin data:', error);
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
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Admin Access
                </p>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-hover transition-all duration-300 border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-hover transition-all duration-300 border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Playlists</p>
                <p className="text-2xl font-bold">{stats.totalPlaylists}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-hover transition-all duration-300 border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">{stats.playlistsToday}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-hover transition-all duration-300 border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">{stats.playlistsThisWeek}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Playlists Table */}
        <Card className="p-6 border-border/50">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" />
            Recent Playlists
          </h3>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead>Playlist Name</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Prompt</TableHead>
                  <TableHead>Tracks</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPlaylists.map((playlist) => (
                  <TableRow key={playlist.id} className="border-border hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {playlist.playlist_name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {playlist.user_email}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-xs truncate">
                      "{playlist.prompt}"
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {playlist.track_count}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(playlist.created_at), 'MMM d, HH:mm')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {recentPlaylists.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No playlists found</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;