import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PlaylistRequest {
  prompt: string;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  uri: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the user from the request
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { prompt }: PlaylistRequest = await req.json()

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Missing prompt' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get Spotify tokens from user metadata
    const spotifyAccessToken = user.user_metadata?.provider_token
    const spotifyRefreshToken = user.user_metadata?.provider_refresh_token

    if (!spotifyAccessToken) {
      return new Response(
        JSON.stringify({ error: 'No Spotify access token found' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Processing prompt:', prompt)

    // Step 1: AI Analysis of the prompt
    const analysis = await analyzePromptWithAI(prompt)
    console.log('AI Analysis:', analysis)

    // Step 2: Search for tracks based on AI analysis
    const tracks = await searchSpotifyTracks(analysis, spotifyAccessToken)
    console.log('Found tracks:', tracks.length)

    // Step 3: Create playlist
    const playlist = await createSpotifyPlaylist(
      analysis.playlistName,
      analysis.description,
      tracks,
      spotifyAccessToken
    )

    return new Response(
      JSON.stringify({ 
        success: true,
        playlist: {
          id: playlist.id,
          name: playlist.name,
          url: playlist.external_urls.spotify,
          trackCount: tracks.length
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error creating playlist:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function analyzePromptWithAI(prompt: string) {
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
  
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a music expert AI that analyzes user prompts to create perfect Spotify playlists. 
          
          Analyze the user's prompt and return a JSON object with:
          - playlistName: A catchy, descriptive name for the playlist
          - description: A detailed description of the playlist mood/vibe
          - mood: Array of mood descriptors (e.g., ["chill", "relaxed", "contemplative"])
          - genres: Array of specific music genres (e.g., ["indie rock", "indie folk", "alternative"])
          - energy: Energy level from 1-10 (1=very calm, 10=very energetic)
          - tempo: Preferred tempo ("slow", "medium", "fast", "mixed")
          - themes: Array of thematic elements (e.g., ["rainy day", "morning", "introspective"])
          - searchQueries: Array of 8-12 specific search queries to find relevant tracks on Spotify
          
          Make the searchQueries diverse but cohesive - mix popular and lesser-known artists, different eras, and subgenres that fit the mood.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`)
  }

  const data = await response.json()
  return JSON.parse(data.choices[0].message.content)
}

async function searchSpotifyTracks(analysis: any, accessToken: string): Promise<SpotifyTrack[]> {
  const allTracks: SpotifyTrack[] = []
  const seenTrackIds = new Set<string>()

  // Search using each query from AI analysis
  for (const query of analysis.searchQueries) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        const tracks = data.tracks.items
          .filter((track: any) => !seenTrackIds.has(track.id)) // Avoid duplicates
          .slice(0, 3) // Take top 3 from each search
          .map((track: any) => ({
            id: track.id,
            name: track.name,
            artists: track.artists,
            uri: track.uri
          }))

        tracks.forEach((track: SpotifyTrack) => {
          seenTrackIds.add(track.id)
          allTracks.push(track)
        })
      }
    } catch (error) {
      console.error(`Error searching for "${query}":`, error)
    }
  }

  // Shuffle and limit to 25-30 tracks
  const shuffled = allTracks.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(30, shuffled.length))
}

async function createSpotifyPlaylist(
  name: string, 
  description: string, 
  tracks: SpotifyTrack[], 
  accessToken: string
) {
  // Get user profile
  const userResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })

  if (!userResponse.ok) {
    throw new Error('Failed to get user profile')
  }

  const user = await userResponse.json()

  // Create playlist
  const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      description,
      public: false
    })
  })

  if (!playlistResponse.ok) {
    throw new Error('Failed to create playlist')
  }

  const playlist = await playlistResponse.json()

  // Add tracks to playlist
  if (tracks.length > 0) {
    const trackUris = tracks.map(track => track.uri)
    
    await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: trackUris
      })
    })
  }

  return playlist
} 