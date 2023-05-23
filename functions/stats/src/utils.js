const getPlays = async (database) => {
  const plays = await database.listDocuments("645c032960cb9f95212b", "plays", [
    sdk.Query.equal("user_id", user),
  ]);
};
