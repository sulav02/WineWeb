
import * as crud from "./dbMethods.js";
import { getActiveClientConnection } from "../dbConnection.js";


export const ModelManager = {
  createModel: async (tableCreateQuery, tableName) => {
    // Ensure the client is connected before proceeding
    try {
      const client = await getActiveClientConnection()

      // Check if connection is active by running a simple query
      // await client.queryObject(tableCreateQuery); // Run the table creation query

    } catch (err) {
      console.error(`Error creating table "${tableName}":`, err);
    }
    // Return the CRUD methods
    return {
      find: async (filters = {}) => crud.find(tableName, filters),
      findOne: async (filters = {}) => crud.findOne(tableName, filters),
      create: async (data) => crud.create(tableName, data),
      update: async (filters, data) => crud.update(tableName, filters, data),
      delete: async (filters) => crud.remove(tableName, filters),
    };
  }
};
