import { getActiveClientConnection } from "../dbConnection.js";


const client = await getActiveClientConnection()

export const create = async (table, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

  const query = `
    INSERT INTO ${table} (${keys.join(', ')})
    VALUES (${placeholders})
    RETURNING *;
  `;
  const { rows } = await client.queryObject(query, values);
  return rows[0];
};

export const find = async (table, filters = {}) => {
  const keys = Object.keys(filters);
  const values = Object.values(filters);

  const where = keys.map((key, i) => `${key} = $${i + 1}`).join(' AND ');
  const query = `SELECT * FROM ${table}${keys.length ? ' WHERE ' + where : ''}`;

  const { rows } = await client.queryObject(query, values);
  return rows;
};

export const findOne = async (table, filters = {}) => {
  const rows = await find(table, filters);
  return rows[0] || null;
};

export const update = async (table, filters, data) => {
  const filterKeys = Object.keys(filters);
  const dataKeys = Object.keys(data);
  const values = [...Object.values(data), ...Object.values(filters)];

  const setClause = dataKeys.map((key, i) => `${key} = $${i + 1}`).join(', ');
  const whereClause = filterKeys
    .map((key, i) => `${key} = $${dataKeys.length + i + 1}`)
    .join(' AND ');

  const query = `
    UPDATE ${table}
    SET ${setClause}
    WHERE ${whereClause}
    RETURNING *;
  `;
  const { rows } = await client.queryObject(query, values);
  return rows[0];
};

export const remove = async (table, filters) => {
  const keys = Object.keys(filters);
  const values = Object.values(filters);

  const where = keys.map((key, i) => `${key} = $${i + 1}`).join(' AND ');
  const query = `DELETE FROM ${table} WHERE ${where} RETURNING *`;

  const { rows } = await client.queryObject(query, values);
  return rows[0];
};
