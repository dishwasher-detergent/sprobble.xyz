const spotify = {
  topTracks: async (token: string) => {
    const data = await fetch("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.json();
  },
};

export default spotify;