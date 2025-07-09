import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Music, Sparkles } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Don't auto-redirect - let user choose to continue or switch accounts
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          navigate('/dashboard');
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async () => {
    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Check your email for the confirmation link!");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      alert(`Sign out failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03)_0%,transparent_60%)]"></div>
      
      <Card className="w-full max-w-md p-8 text-center bg-white/5 border-white/10 backdrop-blur-sm relative z-10">
        <div className="mb-6">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
            <Music className="w-10 h-10 text-white" />
          </div>
          {user ? (
            <>
              <h1 className="text-3xl font-bold text-white mb-2">
                Already Signed In
              </h1>
              <p className="text-white/70 mb-4">
                You're currently signed in as <strong className="text-white">{user.email}</strong>
              </p>
              <p className="text-sm text-white/60">
                Continue to your dashboard or sign out to use a different account
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to Vibify
              </h1>
              <p className="text-white/70">
                Sign in to start creating personalized playlists with AI
              </p>
            </>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Sparkles className="w-4 h-4 text-white" />
            <span>Create unlimited playlists</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Sparkles className="w-4 h-4 text-white" />
            <span>AI-powered mood matching</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Sparkles className="w-4 h-4 text-white" />
            <span>Seamless Spotify integration</span>
          </div>
        </div>

        {user ? (
          <div className="space-y-3">
            <Button 
              onClick={handleContinue}
              disabled={loading}
              className="w-full bg-white text-black hover:bg-white/90 font-semibold py-3 transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
              size="lg"
            >
              Continue to Dashboard
            </Button>
            <Button 
              onClick={handleSignOut}
              disabled={loading}
              variant="outline"
              className="w-full border-white/20 text-black hover:bg-white/10 hover:border-white/30"
              size="lg"
            >
              {loading ? "Signing out..." : "Sign Out & Use Different Account"}
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 border-white/10">
              <TabsTrigger value="signin" className="text-white data-[state=active]:bg-white/10 data-[state=active]:text-white">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/10 data-[state=active]:text-white">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
                />
              </div>
              <Button 
                onClick={handleSignIn}
                disabled={loading}
                className="w-full bg-white text-black hover:bg-white/90 font-semibold py-3 transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                size="lg"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </TabsContent>
            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
                />
              </div>
              <Button 
                onClick={handleSignUp}
                disabled={loading}
                className="w-full bg-white text-black hover:bg-white/90 font-semibold py-3 transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                size="lg"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </TabsContent>
            {message && (
              <div className={`text-sm mt-4 ${message.includes('Check your email') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </div>
            )}
          </Tabs>
        )}

        <p className="text-xs text-white/50 mt-4">
          By continuing, you agree to our terms of service and privacy policy
        </p>
      </Card>
    </div>
  );
};

export default Auth; 