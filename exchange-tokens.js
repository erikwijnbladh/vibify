// exchange-tokens.js
// Run with: node exchange-tokens.js

const https = require('https');
const querystring = require('querystring');

// Replace these with your actual values
const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_SPOTIFY_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/get-vibify-tokens.html'; // Or wherever you hosted the HTML file
const AUTH_CODE = 'PASTE_AUTH_CODE_HERE'; // From the HTML page

const postData = querystring.stringify({
    grant_type: 'authorization_code',
    code: AUTH_CODE,
    redirect_uri: REDIRECT_URI,
});

const options = {
    hostname: 'accounts.spotify.com',
    port: 443,
    path: '/api/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        const response = JSON.parse(data);
        
        if (response.access_token) {
            console.log('✅ SUCCESS! Here are your Vibify Spotify tokens:');
            console.log('');
            console.log('🔑 ACCESS_TOKEN:', response.access_token);
            console.log('🔄 REFRESH_TOKEN:', response.refresh_token);
            console.log('⏰ EXPIRES_IN:', response.expires_in, 'seconds');
            console.log('');
            console.log('📝 Next steps:');
            console.log('1. Go to Supabase Dashboard → Project Settings → Secrets');
            console.log('2. Add these environment variables:');
            console.log('   VIBIFY_SPOTIFY_ACCESS_TOKEN =', response.access_token);
            console.log('   VIBIFY_SPOTIFY_REFRESH_TOKEN =', response.refresh_token);
        } else {
            console.error('❌ Error:', response);
        }
    });
});

req.on('error', (e) => {
    console.error('❌ Request error:', e);
});

req.write(postData);
req.end(); 