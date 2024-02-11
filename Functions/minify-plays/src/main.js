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
      'track',
      newQueries
    );

    cursor = response.documents[response.documents.length - 1].$id;

    await Promise.all(
      response.documents.map((document) =>
        database.createDocument(
          '645c032960cb9f95212b',
          'track_minified',
          document.$id,
          {
            name: document.name,
            artist: JSON.stringify(
              document.artist.map((x) => ({
                id: x.$id,
                name: x.name,
                href: x.href,
              }))
            ),
            album_id: document.album.$id,
            album_name: document.album.name,
            images: document.album.images,
            number_of_plays: document.plays.length,
          }
        )
      )
    );
  } while (response.documents.length >= 25);

  return res.json('Complete!');
};
