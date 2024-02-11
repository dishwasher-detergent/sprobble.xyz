import { Client, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  const database = new Databases(client);
  const reqData = req.body;
  let data = null;
  let collection = null;

  switch (reqData.$collectionId) {
    case 'album':
      collection = 'album_minified';
      data = {
        name: reqData.name,
        number_of_plays: reqData.plays.length,
        number_of_songs: reqData.track.length,
        images: reqData.images,
        artist: JSON.stringify(
          reqData.artist.map((x) => ({ id: x.$id, name: x.name, href: x.href }))
        ),
      };
      break;
    case 'artist':
      collection = 'artist_minified';
      data = {
        name: reqData.name,
        number_of_plays: reqData.plays.length,
        number_of_songs: reqData.track.length,
        number_of_albums: reqData.album.length,
      };
      break;
    case 'track':
      collection = 'track_minified';
      data = {
        name: reqData.name,
        artist: JSON.stringify(
          reqData.artist.map((x) => ({ id: x.$id, name: x.name, href: x.href }))
        ),
        album_id: reqData.album.$id,
        album_name: reqData.album.name,
        images: reqData.album.images,
        number_of_plays: reqData.plays.length,
      };
      break;
    case 'plays':
      collection = 'plays_minified';
      data = {
        track_name: reqData.track.name,
        track_href: reqData.track.href,
        track_id: reqData.track.$id,
        album_image: reqData.album.images[0],
        album_name: reqData.album.name,
        album_id: reqData.album.$id,
        artist: JSON.stringify(
          reqData.artist.map((x) => ({ id: x.$id, name: x.name, href: x.href }))
        ),
        user_name: reqData?.user?.name,
        user_avatar: reqData?.user?.avatar,
        user_id: reqData?.user?.$id,
        played_at: reqData.played_at,
      };
      break;
  }

  if (data && collection) {
    await database
      .getDocument(reqData.$databaseId, collection, reqData.$id)
      .then(
        async () => {
          log('Updating: ', reqData.$id);
          await database.updateDocument(
            reqData.$databaseId,
            collection,
            reqData.$id,
            data
          );
        },
        async () => {
          log('Creating: ', reqData.$id);
          await database.createDocument(
            reqData.$databaseId,
            collection,
            reqData.$id,
            data
          );
        }
      );
  }

  return res.json('Complete!');
};
