
import { RATING_MODEL, MEMBER_MODEL, LINK_MODEL } from "../../constant/constant.js";

export const RatingQueryManager = {
    createRatingTableQuery: `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS ${RATING_MODEL} (
      _id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      member_id UUID REFERENCES ${MEMBER_MODEL}(_id) ON DELETE CASCADE, -- Foreign key to Member
      link_id UUID REFERENCES ${LINK_MODEL}(_id) ON DELETE CASCADE,   -- Foreign key to Link
      rating NUMERIC CHECK (rating >= 0.5 AND rating <= 5),              -- Rating value
      review text not null,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP                 -- Timestamp when the rating was given
    );
  `
};
