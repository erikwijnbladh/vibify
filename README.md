# 🎵 Vibify

**Transform your mood into the perfect playlist with AI-powered music curation**

Vibify is an innovative web application that uses artificial intelligence to generate personalized Spotify playlists based on natural language descriptions of your mood, activity, or desired vibe.

![Vibify Logo](public/@vibify.png)

## ✨ Features

### 🤖 **AI-Powered Playlist Generation**
- Describe any mood or scenario in natural language
- Advanced prompt processing with context understanding
- Smart music curation based on your description
- Supports complex, detailed prompts for precise results

### 🎨 **Beautiful, Modern UI**
- Sleek black and white aesthetic with organic design elements
- Fluid lava lamp background animations
- Glass-morphism design with backdrop blur effects
- Fully responsive mobile-first design
- Smooth hover animations and micro-interactions

### 🎧 **Seamless Spotify Integration**
- Direct playlist creation in Spotify
- Public playlists created by @VibifyMusic account
- No need for users to connect their Spotify accounts
- Instant playlist sharing and following

### 🔐 **User Authentication**
- Secure email/password authentication via Supabase
- Rate limiting and usage tracking
- Custom branded confirmation emails
- Session management and protection

## 🏗️ Architecture

Vibify uses a **hybrid approach** for Spotify integration:

- **User Authentication**: Handled via Supabase Auth for tracking and rate limiting
- **Playlist Creation**: Uses a dedicated Vibify Spotify account to create public playlists
- **No User Spotify Auth Required**: Users can immediately start creating playlists without OAuth flows

### Why This Approach?

1. **Simplified UX**: No complex Spotify OAuth for users
2. **Developer Friendly**: Bypasses Spotify's organization requirements for individual developers
3. **Public Discovery**: All playlists are public and discoverable
4. **Scalable**: Centralized playlist management and branding

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Three.js & React Three Fiber** for 3D background effects

### Backend
- **Supabase** for authentication and database
- **Supabase Edge Functions** for serverless API endpoints
- **PostgreSQL** database
- **Row Level Security (RLS)** for data protection

### External APIs
- **Spotify Web API** for playlist creation and music data
- **OpenAI GPT** for prompt processing and music recommendation

### UI Components
- **Radix UI** for accessible component primitives
- **Custom UI components** built with Tailwind
- **Responsive design** with mobile-first approach

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun package manager
- Supabase account
- Spotify Developer account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vibify-mvp.git
   cd vibify-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Supabase Setup**
   
   Set up your Supabase project with the required environment variables:
   ```bash
   # In your Supabase dashboard, add these secrets:
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_ACCESS_TOKEN=your_vibify_account_access_token
   SPOTIFY_REFRESH_TOKEN=your_vibify_account_refresh_token
   OPENAI_API_KEY=your_openai_api_key
   ```

5. **Deploy Edge Function**
   ```bash
   supabase functions deploy prompt_to_playlist
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

## 🎯 Usage Examples

### Basic Prompts
```
"Chill indie songs for a rainy Sunday morning"
"High-energy EDM for my workout"
"Melancholic folk for late night coding"
```

### Advanced Prompts
```
"Create a nostalgic 90s rock playlist with some alternative and grunge, perfect for a road trip through the mountains"

"I want atmospheric electronic music mixed with post-rock instrumentals for deep focus work sessions"

"Romantic jazz and neo-soul for a candlelit dinner date at home"
```

## 📁 Project Structure

```
vibify-mvp/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── HeroSection.tsx # Landing page hero
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Landing page
│   │   ├── Auth.tsx        # Authentication
│   │   ├── CreatePlaylist.tsx
│   │   └── Authenticated.tsx
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # External service integrations
│   │   └── supabase/       # Supabase client & types
│   └── lib/                # Utility functions
├── supabase/
│   └── functions/
│       └── prompt_to_playlist/  # Edge function for AI playlist generation
├── public/                 # Static assets
└── ...config files
```

## 🔧 Configuration

### Spotify Setup

1. **Create Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Note your Client ID and Client Secret

2. **Get Vibify Account Tokens**
   - Create a dedicated Spotify account for Vibify
   - Use Spotify OAuth to get access and refresh tokens
   - Add tokens to Supabase secrets

### OpenAI Setup

1. **Get API Key**
   - Sign up at [OpenAI Platform](https://platform.openai.com)
   - Generate an API key
   - Add to Supabase secrets as `OPENAI_API_KEY`

### Supabase Configuration

1. **Authentication Settings**
   - Enable email/password authentication
   - Configure email templates (see email template files)
   - Set up redirect URLs

2. **Database Setup**
   - User tables are automatically managed by Supabase Auth
   - No additional tables required for MVP

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel --prod
   ```

2. **Environment Variables**
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

3. **Custom Domain** (Optional)
   - Configure your domain in Vercel dashboard
   - Update Supabase redirect URLs

### Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**
   - Add all required environment variables

## 🎨 Customization

### Design System

The app uses a cohesive design system based on:
- **Colors**: Black/white with subtle opacity variations
- **Typography**: System fonts with careful hierarchy
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions and hover effects

### Theming

All styling is managed through Tailwind CSS classes:
```css
/* Primary colors */
bg-black text-white

/* Translucent elements */
bg-white/5 border-white/10

/* Interactive states */
hover:scale-105 transition-all duration-300
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for type safety
- Follow the existing component structure
- Add proper error handling
- Test across different devices and browsers
- Maintain the consistent design system

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spotify Web API** for music data and playlist management
- **OpenAI** for AI-powered prompt processing
- **Supabase** for backend infrastructure
- **Radix UI** for accessible component primitives
- **Three.js** for beautiful 3D background effects

## 📞 Support

- **Email**: support@vibify.com
- **Documentation**: [docs.vibify.com](https://docs.vibify.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/vibify-mvp/issues)

---

**Made with ❤️ for music lovers everywhere**

*Transform your mood into the perfect playlist.*
