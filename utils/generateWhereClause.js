exports.generateWhereClause = ({
  patent_id,
  patent_text,
  phase,
  date,
  patent_id_arr,
}) => {
  const conditions = [];
  if (patent_id) {
    let jobIdArray = patent_id.split(",");
    const jobIdConditions = jobIdArray
      .map((id) => `patent_id = '${id}'`)
      .join(" OR ");
    conditions.push(`(${jobIdConditions})`);
  }
  if (patent_id_arr?.length) {
    const patent_id_Conditions = patent_id_arr
      .map((id) => `patent_id = '${id}'`)
      .join(" OR ");
    conditions.push(`(${patent_id_Conditions})`);
  }
  if (patent_text) {
    conditions.push(`patent_text ILIKE '%${patent_text}%' `);
  }
  // if (tags) {
  //   conditions.push(`'${tags}' = ANY(tags)`);
  // }
  // Comenting Tags as due to "conditions.join(" AND ");" And condition we strictly matching it in tags
  if (phase) {
    conditions.push(`phase = '${phase}'`);
  }
  if (date) {
    conditions.push(`date = '${date}'`);
  }

  const whereClause = conditions.join(" AND ");

  return whereClause;
};
