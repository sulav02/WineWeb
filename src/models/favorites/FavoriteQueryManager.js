import { LINK_MODEL, MEMBER_MODEL } from "../../constant/constant.js";

export const FavoritesQueryManager = {
  createFavouriteTableQuery: `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS favorites (
      _id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      member_id UUID REFERENCES ${MEMBER_MODEL}(_id) ON DELETE CASCADE,
      link_id UUID REFERENCES ${LINK_MODEL}(_id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (member_id, link_id)  -- so a user can't favorite the same link twice
    );
  `
};
