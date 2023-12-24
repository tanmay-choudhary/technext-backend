const {
  getAllPatents,
  getAllPatentIds,
  getCountByPhasePerYear,
} = require("../models/patent");
const {
  patentIdSchema,
  getAllQuerySchema,
  getAllPatentSchema,
} = require("../schema/patent_schema.js");
async function patent(req, res) {
  let resStatus = 200;
  let patentList = { count: 0, data: [] };
  try {
    let patentId = req.params.id;
    if (patentId) {
      const { error: jError, value: jValue } = patentIdSchema.validate({
        patentId,
      });
      if (jError) {
        return res.status(400).json({ error: jError.details[0].message });
      }
      patentId = jValue.patentId;
    }
    const { error: qError, value: qValue = {} } = getAllQuerySchema.validate(
      req.query
    );
    if (qError) {
      //return res.status(400).json({ error: qError.details[0].message });
    }
    const { offset = 0, count = 10 } = qValue;
    // Get filter w.r.t query params
    const { error: bError, value: bValue = {} } = getAllPatentSchema.validate(
      req.body
    );
    if (bError) {
      //return res.status(400).json({ error: bError.details[0].message });
    }
    patentList = await getAllPatents({
      offset,
      count,
      filters: { patentId, ...bValue },
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    resStatus = 500;
    //return res.status(resStatus).json({ error: "Internal Server Error" });
  } finally {
    return res.status(resStatus).json(patentList);
    //return patentList;
  }
}

async function getPatentIds(req, res) {
  let resStatus = 200;
  let patentList = [];
  try {
    let patentId = req.body.patent_id;
    if (patentId) {
      patentList = await getAllPatentIds({
        patentId,
      });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    resStatus = 500;
    //return res.status(resStatus).json({ error: "Internal Server Error" });
  } finally {
    return res.status(resStatus).json(patentList);
    //return patentList;
  }
}

async function getCount(req, res) {
  let resStatus = 200;
  let patentList = {};
  try {
    patentList = await getCountByPhasePerYear();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    resStatus = 500;
    //return res.status(resStatus).json({ error: "Internal Server Error" });
  } finally {
    return res.status(resStatus).json(patentList);
    //return patentList;
  }
}

module.exports = {
  patent,
  getPatentIds,
  getCount,
};
