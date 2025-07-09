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
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-primary text-white p-4">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 pt-4">
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
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center border border-amber-500/30">
              <Crown className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <div className="px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30">
              <span className="text-amber-300 text-sm font-medium flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Admin Access
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                <Music className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Total Playlists</p>
                <p className="text-2xl font-bold text-white">{stats.totalPlaylists}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Today</p>
                <p className="text-2xl font-bold text-white">{stats.playlistsToday}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
                <BarChart3 className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">This Week</p>
                <p className="text-2xl font-bold text-white">{stats.playlistsThisWeek}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Playlists Table */}
        <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-md">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Music className="w-5 h-5" />
            Recent Playlists
          </h3>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5">
                  <TableHead className="text-white/80">Playlist Name</TableHead>
                  <TableHead className="text-white/80">User</TableHead>
                  <TableHead className="text-white/80">Prompt</TableHead>
                  <TableHead className="text-white/80">Tracks</TableHead>
                  <TableHead className="text-white/80">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPlaylists.map((playlist) => (
                  <TableRow key={playlist.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white font-medium">
                      {playlist.playlist_name}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {playlist.user_email}
                    </TableCell>
                    <TableCell className="text-white/80 max-w-xs truncate">
                      "{playlist.prompt}"
                    </TableCell>
                    <TableCell className="text-white/80">
                      {playlist.track_count}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {format(new Date(playlist.created_at), 'MMM d, HH:mm')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {recentPlaylists.length === 0 && (
            <div className="text-center py-8">
              <p className="text-white/70">No playlists found</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;