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
async function getCountByPhasePerYear() {
  try {
    const query = `
   select 
count(phase) as total_phase,
sum(
case 
	when phase = 'Phase I' then 1 else 0
end
) as "Phase I Count", 
sum(
case 
	when phase = 'Phase II' then 1 else 0
end
) as "Phase II Count", 
to_char("date"::date, 'YYYY') from test_data 
where phase = 'Phase I' or phase = 'Phase II'
group by to_char("date"::date, 'YYYY');

    `;

    // 'invalid input syntax for type date: "Date"'
    const result = await pool.query(query);
    const outputObject = {};
    let data = result.rows;
    const years = data.map((entry) => entry.to_char).sort();
    const phaseICounts = data.map((entry) => parseInt(entry["Phase I Count"]));
    const phaseIICounts = data.map((entry) =>
      parseInt(entry["Phase II Count"])
    );
    const totalPhaseCounts = data.map((entry) => parseInt(entry.total_phase));
    return {
      years: years,
      phaseICounts: phaseICounts,
      phaseIICounts: phaseIICounts,
      totalPhaseCounts: totalPhaseCounts,
    };
  } catch (error) {
    console.error("Error retrieving count by phase per year:", error);
    throw error;
  }
}
module.exports = {
  getAllPatents,
  getAllPatentIds,
  getCountByPhasePerYear,
};
