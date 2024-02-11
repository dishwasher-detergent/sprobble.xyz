import { Client, Databases, Query } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  const body = JSON.parse(req.body)

  if(!body?.collection) {
    res.send("No collection sepcified.");
  }

  const database = new Databases(client);

  let response;

  const queries = [Query.limit(25)];
  let cursor = null;

  do {
    const newQueries = [...queries];

    if (cursor) {
      newQueries.push(Query.cursorAfter(cursor));
    }

    response = await database.listDocuments(
      '645c032960cb9f95212b',
      body?.collection,
      newQueries
    );

    cursor = response.documents[response.documents.length - 1].$id;

    await Promise.all(
      response.documents.map((document) => {
        let data = null;
        let collection = null;
      
        switch (body?.collection) {
          case 'album':
            collection = 'album_minified';
            data = {
              name: document.name,
              number_of_plays: document.plays.length,
              number_of_songs: document.track.length,
              images: document.images,
              artist: JSON.stringify(
                document.artist.map((x) => ({ id: x.$id, name: x.name, href: x.href }))
              ),
            };
            break;
          case 'artist':
            collection = 'artist_minified';
            data = {
              name: document.name,
              number_of_plays: document.plays.length,
              number_of_songs: document.track.length,
              number_of_albums: document.album.length,
            };
            break;
          case 'track':
            collection = 'track_minified';
            data = {
              name: document.name,
              artist: JSON.stringify(
                document.artist.map((x) => ({ id: x.$id, name: x.name, href: x.href }))
              ),
              album_id: document.album.$id,
              album_name: document.album.name,
              images: document.album.images,
              number_of_plays: document.plays.length,
            };
            break;
          case 'plays':
            collection = 'plays_minified';
            data = {
              track_name: document.track.name,
              track_href: document.track.href,
              track_id: document.track.$id,
              album_image: document.album.images[0],
              album_name: document.album.name,
              album_id: document.album.$id,
              artist: JSON.stringify(
                document.artist.map((x) => ({ id: x.$id, name: x.name, href: x.href }))
              ),
              user_name: document?.user?.name,
              user_avatar: document?.user?.avatar,
              user_id: document?.user?.$id,
              played_at: document.played_at,
            };
            break;
        }

        database.createDocument(
          '645c032960cb9f95212b',
          collection,
          document.$id,
          data
        )
      }
      )
    );
  } while (response.documents.length >= 25);

  return res.send('Complete!');
};
