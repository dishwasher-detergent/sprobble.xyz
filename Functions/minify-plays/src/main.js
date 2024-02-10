import { Client, Databases, Query } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

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
      'plays',
      newQueries
    );

    cursor = response.documents[response.documents.length - 1].$id;

    await Promise.all(
      response.documents.map((document) =>
        database.createDocument(
          '645c032960cb9f95212b',
          'plays_small',
          document.$id,
          {
            track_name: document.track.name,
            track_href: document.track.href,
            track_id: document.track.$id,
            album_image: document.album.images[0],
            album_name: document.album.name,
            album_id: document.album.$id,
            artist_name: JSON.stringify(
              document.artist.map((y) => ({ name: y.name, href: y.href }))
            ),
            user_name: document?.user?.name,
            user_avatar: document?.user?.avatar,
            user_id: document?.user?.$id,
            played_at: document.played_at,
          }
        )
      )
    );
  } while (response.documents.length >= 25);

  return res.json('Complete!');
};
