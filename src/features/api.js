export const API_KEY = "55b040b168e0e26590aa82ceb5668488";

export const getTrendingTracks = async country => {
  let response;
  if (country !== undefined && country !== null) {
    response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=${API_KEY}&format=json&limit=52`
    );
  } else {
    response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=india&api_key=${API_KEY}&format=json&limit=52`
    );
  }

  const data = response.json();
  return data;
};

export const getTrackInfo = async mbid => {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&mbid=${mbid}&format=json`
  );
  const data = response.json();
  return data;
};

export const getArtistInfo = async mbid => {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=${API_KEY}&mbid=${mbid}&format=json`
  );
  const data = response.json();
  return data;
};
