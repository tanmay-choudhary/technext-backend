const Joi = require("joi");

exports.getAllPatentSchema = Joi.object({
  patent_text: Joi.string(),
  phase: Joi.string(),
  date: Joi.date().iso(),
});

exports.getSimilarJobs = Joi.object({
  title: Joi.string().allow(""),
  option: Joi.string().allow(""),
});

exports.getAllQuerySchema = Joi.object({
  offset: Joi.number().integer().min(0),
  count: Joi.number().integer().min(1).max(100),
}).unknown(true);

exports.patentIdSchema = Joi.object({
  patent_id: Joi.string(),
});
