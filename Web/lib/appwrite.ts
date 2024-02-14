import { DATABASE_ID, DOMAIN, ENDPOINT, PROJECT_ID } from "@/lib/constants";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Models,
  Storage,
} from "appwrite";
import { generateQueryList } from "./utils";

const appwriteClientSingleton = () => {
  const client = new Client();
  client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

  return client;
};

declare global {
  var client: undefined | ReturnType<typeof appwriteClientSingleton>;
}

const client = globalThis.client ?? appwriteClientSingleton();

export default client;

const database = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);
const avatars = new Avatars(client);

export const auth_service = {
  /**
   * Creates a phone session for the given phone number.
   * @param phone The phone number for the user.
   */
  async createPhoneSession(phone: string) {
    return await account.createPhoneSession(ID.unique(), phone);
  },

  /**
   * Creates a Spotify session.
   */
  createSpotifySession() {
    return account.createOAuth2Session(
      "spotify",
      `${DOMAIN}/setup`,
      `${DOMAIN}`,
      [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-email",
        "user-read-private",
      ],
    );
  },

  /**
   * Signs out the current user by deleting the current session.
   */
  async signOut() {
    await account.deleteSession("current");
  },

  /**
   * Retrieves the account information.
   * @returns {Promise<any>} The response from the account API.
   */
  async getAccount() {
    return await account.get<any>();
  },

  /**
   * Retrieves the current session.
   * @returns {Promise<Models.Session>} The response from the account API.
   */
  async getSession() {
    return await account.getSession("current");
  },

  /**
   * Retrieves the account picture for a given name.
   * @param name - The name used to generate the account picture.
   * @returns The URL of the account picture.
   */
  getAccountPicture(name: string) {
    return avatars.getInitials(name, 256, 256).toString();
  },

  /**
   * Retrieves the preferences of the current user.
   * @returns {Promise<Models.Preferences>} A promise that resolves with the user's preferences.
   */
  async getPrefs() {
    return await account.getPrefs();
  },

  /**
   * Updates the preferences with the provided object.
   * @param prefs - The preferences object to update.
   * @returns A promise that resolves with the updated preferences.
   */
  async updatePrefs(prefs: Object) {
    return await account.updatePrefs(prefs);
  },

  /**
   * Sets the session hash for authentication.
   * @param hash - The session hash to set.
   */
  setSession(hash: string) {
    const authCookies: any = {};
    authCookies["a_session_" + PROJECT_ID] = hash;
    client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies);
  },
};

export const database_service = {
  /**
   * Retrieves information from the database based on the provided document ID and collection ID.
   *
   * @template {T} - The type of the document to retrieve.
   * @param {string} collectionId - The ID of the collection where the document is stored.
   * @param {string} id - The ID of the document to retrieve.
   * @returns A promise that resolves to the retrieved document.
   */
  async get<T extends Models.Document>(collectionId: string, id: string) {
    const response = await database.getDocument<T>(
      DATABASE_ID,
      collectionId,
      id,
    );

    return response;
  },

  /**
   * Retrieves a list of documents from a specific collection.
   *
   * @template {T} - The type of the documents to retrieve.
   * @param {string} collectionId - The ID of the collection to retrieve documents from.
   * @returns A promise that resolves to an array of documents of type T.
   */
  async list<T extends Models.Document>(
    collectionId: string,
    queries: string[] = [],
  ) {
    const response = await database.listDocuments<T>(
      DATABASE_ID,
      collectionId,
      queries,
    );

    return response;
  },

  /**
   * Creates a new document in the specified collection.
   *
   * @template {T} - The type of the document.
   * @param {string} collectionId - The ID of the collection.
   * @param {T} data - The data of the document.
   * @param {string} [id=ID.unique()] - The ID of the document (optional).
   * @returns A promise that resolves to the created document.
   */
  async create<T extends Models.Document>(
    collectionId: string,
    data: Omit<T, keyof Models.Document>,
    id: string = ID.unique(),
    permissions: string[] = [],
  ) {
    const response = await database.createDocument<T>(
      DATABASE_ID,
      collectionId,
      id,
      data,
      permissions,
    );

    return response;
  },

  /**
   * Updates the information of a document in a collection.
   *
   * @template {T} - The type of the document.
   * @param {string} collectionId - The ID of the collection.
   * @param {T} data - The updated data for the document.
   * @param {string} [id=data.$id] - The ID of the document. Defaults to the ID specified in the data object.
   * @returns A promise that resolves to the updated document.
   */
  async update<T extends Models.Document>(
    collectionId: string,
    data: Omit<T, keyof Models.Document>,
    id: string,
  ) {
    const response = await database.updateDocument<T>(
      DATABASE_ID,
      collectionId,
      id,
      data,
    );

    return response;
  },

  /**
   * Deletes a document from a collection.
   *
   * @param {string} collectionId - The ID of the collection.
   * @param {string} id - The ID of the document to delete.
   * @returns A promise that resolves to the deleted document.
   */
  async delete(collectionId: string, id: string) {
    const response = await database.deleteDocument(
      DATABASE_ID,
      collectionId,
      id,
    );

    return response;
  },
};

export const storage_service = {
  /**
   * Retrieves a file from the specified storage bucket.
   *
   * @param {string} bucketId - The ID of the bucket where the file is stored.
   * @param {string} id - The ID of the file to retrieve.
   * @returns A promise that resolves to the retrieved file.
   */
  async get(bucketId: string, id: string) {
    const response = await storage.getFile(bucketId, id);

    return response;
  },

  /**
   * Retrieves a list of files from the specified storage bucket.
   *
   * @param {string} bucketId - The ID of the bucket to retrieve files from.
   * @returns A promise that resolves to an array of files.
   */
  async list(bucketId: string) {
    const response = await storage.listFiles(bucketId);

    return response;
  },

  /**
   * Uploads a file to the specified bucket.
   *
   * @param {string} bucketId - The ID of the bucket to upload the file to.
   * @param {File} file - The file to upload.
   * @param {string} [id] - The ID to assign to the uploaded file. If not provided, a unique ID will be generated.
   * @returns A promise that resolves to the response from the server.
   */
  async upload(bucketId: string, file: File, id: string = ID.unique()) {
    const response = await storage.createFile(bucketId, id, file);

    return response;
  },

  /**
   * Deletes a file from the specified storage bucket.
   *
   * @param {string} bucketId - The ID of the bucket where the file is stored.
   * @param {string} id - The ID of the file to delete.
   * @returns A promise that resolves to the deleted file.
   */
  async delete(bucketId: string, id: string) {
    const response = await storage.deleteFile(bucketId, id);

    return response;
  },
};

export const rest_service = {
  /**
   * Retrieves information from the database based on the provided document ID and collection ID.
   *
   * @template {T} - The type of the document to retrieve.
   * @param {string} collectionId - The ID of the collection where the document is stored.
   * @param {string} id - The ID of the document to retrieve.
   * @returns A promise that resolves to the retrieved document.
   */
  async get<T extends Models.Document>(collectionId: string, id: string) {
    const url = `${ENDPOINT}/databases/${DATABASE_ID}/collections/${collectionId}/documents/${id}`;

    const response = await fetch(url, {
      headers: {
        "x-appwrite-project": PROJECT_ID,
      },
    });

    const result: T = await response.json();

    return result;
  },

  /**
   * Retrieves a list of documents from a specific collection.
   *
   * @template {T} - The type of the documents to retrieve.
   * @param {string} collectionId - The ID of the collection to retrieve documents from.
   * @returns A promise that resolves to an array of documents of type T.
   */
  async list<T extends Models.Document>(
    collectionId: string,
    queries: string[] = [],
  ) {
    const queryList = generateQueryList(queries);

    const url = `${ENDPOINT}/databases/${DATABASE_ID}/collections/${collectionId}/documents${queries.length > 0 ? `?${queryList.toString()}` : ""}`;

    const response = await fetch(url, {
      headers: {
        "x-appwrite-project": PROJECT_ID,
      },
    });

    const result: T = await response.json();

    return result;
  },
};
