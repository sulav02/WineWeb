import { LINK_MODEL, MEMBER_MODEL } from "../../constant/constant.js";

export const LinkQueryManager = {
  createLinkTableQuery: `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS ${LINK_MODEL} (
      _id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title VARCHAR(255) NOT NULL,                                -- Title of the link
      description TEXT,                                            -- Optional description for the link
      url TEXT NOT NULL,                                            -- URL of the link
      member_id UUID REFERENCES ${MEMBER_MODEL}(_id) ON DELETE CASCADE, -- Foreign key to Member
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,               -- Timestamp when the link was created
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,               -- Timestamp of last update
      hidden BOOLEAN DEFAULT FALSE,                                 -- Whether the link is hidden
      average_rating NUMERIC DEFAULT 0,                             -- Average rating score for sorting
      CONSTRAINT valid_url CHECK (url LIKE 'http%' OR url LIKE 'https%') -- Ensure URL is valid
    );
  `
};
