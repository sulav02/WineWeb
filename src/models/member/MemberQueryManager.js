import { MEMBER_MODEL } from "../../constant/constant.js";

export const MemberQueryManager = {
    createMemberTableQuery: `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS ${MEMBER_MODEL} (
      _id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(100) UNIQUE NOT NULL,
      fullname VARCHAR(200) NOT NULL,
      email VARCHAR(200) UNIQUE NOT NULL,
      picurl text not null,
      password TEXT NOT NULL,                      -- Hashed password for security
      wine_points NUMERIC DEFAULT 0,                    -- Wine points, defaults to 0
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Timestamp when the account was created
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Timestamp of last update
      CONSTRAINT valid_username_length CHECK (LENGTH(username) >= 3)  -- Ensure a valid username length
    );
  `
};
