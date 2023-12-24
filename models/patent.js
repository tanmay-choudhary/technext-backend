const { generateWhereClause } = require("../utils/generateWhereClause");
const { connection: pool } = require("./db");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

async function getAllPatents({ offset, count, filters }) {
  try {
    const patent_where_clause = generateWhereClause(filters);
    const query = `SELECT * FROM test_data ${
      patent_where_clause ? `WHERE ${patent_where_clause} ` : ""
    } ORDER BY date DESC
        OFFSET ${offset}
        LIMIT ${count};`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error retrieving all Patents:", error);
    throw error;
  }
}
async function getAllPatentIds({ patentId }) {
  try {
    const query = `SELECT DISTINCT patent_id FROM test_data WHERE patent_id ILIKE '${patentId}%' LIMIT 5;`;
    const result = await pool.query(query);
    let final = result.rows.map((row) => row.patent_id);
    return final;
  } catch (error) {
    console.error("Error retrieving unique patent IDs:", error);
    throw error;
  }
}
async function getAllPatentByIds({ patentId }) {
  try {
    const query = `SELECT DISTINCT patent_id FROM test_data WHERE patent_id ILIKE '${patentId}%' LIMIT 5;`;
    const result = await pool.query(query);
    let final = result.rows.map((row) => row.patent_id);
    return final;
  } catch (error) {
    console.error("Error retrieving unique patent IDs:", error);
    throw error;
  }
}
async function getVideoByIdModel(videoId) {
  try {
    const query = "SELECT * FROM melon_videos WHERE video_id = $1";
    const values = [videoId];
    const result = await pool.query(query, values);
    return result.rows[0]; // Assuming there's only one video with the given ID
  } catch (error) {
    console.error(`Error retrieving video with ID ${videoId}:`, error);
    throw error;
  }
}

async function getVideosByIdsModel(videoIds) {
  try {
    const query = "SELECT * FROM melon_videos WHERE video_id = ANY($1)";
    const values = [videoIds];
    const result = await pool.query(query, values);
    return result.rows; // Returning an array of videos
  } catch (error) {
    console.error(
      `Error retrieving videos with IDs ${videoIds.join(", ")}:`,
      error
    );
    throw error;
  }
}

module.exports = {
  getAllPatents,
  getAllPatentIds,
};
