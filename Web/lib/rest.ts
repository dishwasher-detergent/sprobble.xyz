import { DATABASE_ID, ENDPOINT, PROJECT_ID } from "@/lib/constants";
import { generateQueryList } from "@/lib/utils";
import { Models } from "appwrite";

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

    console.log("test");

    const response = await fetch(url, {
      headers: {
        "x-appwrite-project": PROJECT_ID,
        "x-appwrite-response-format": "1.4"
      },
      cache: "no-store",
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
        "x-appwrite-response-format": "1.4"
      },
      cache: "no-store",
    });

    const result: T = await response.json();

    return result;
  },
};
