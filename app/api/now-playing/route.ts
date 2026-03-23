const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const client_id = process.env.SPOTIFY_CLIENT_ID ?? "";
const client_secret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

async function getAccessToken() {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString(
    "base64"
  );

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return res.json();
}

export async function GET() {
  if (!client_id || !client_secret || !refresh_token) {
    return Response.json({ isPlaying: false });
  }

  try {
    const { access_token } = await getAccessToken();

    // Try currently playing first
    const nowRes = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (nowRes.status === 200) {
      const data = await nowRes.json();
      if (data.is_playing && data.item) {
        return Response.json({
          isPlaying: true,
          title: data.item.name,
          artist: data.item.artists
            .map((a: { name: string }) => a.name)
            .join(", "),
          albumArt: data.item.album.images?.[0]?.url ?? "",
          songUrl: data.item.external_urls.spotify,
        });
      }
    }

    // Fall back to recently played
    const recentRes = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (recentRes.status === 200) {
      const data = await recentRes.json();
      const track = data.items?.[0]?.track;
      if (track) {
        return Response.json({
          isPlaying: false,
          title: track.name,
          artist: track.artists
            .map((a: { name: string }) => a.name)
            .join(", "),
          albumArt: track.album.images?.[0]?.url ?? "",
          songUrl: track.external_urls.spotify,
        });
      }
    }

    return Response.json({ isPlaying: false });
  } catch {
    return Response.json({ isPlaying: false });
  }
}
