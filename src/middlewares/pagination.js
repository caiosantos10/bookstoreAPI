import { InvalidRequest } from "../errors/index.js";

export default async function pagination(req, res, next) {
  try {
    let { max = 5, page = 1, sort = "_id:-1" } = req.query;
    let [fieldSort, order] = sort.split(":");
  
    max = parseInt(max);
    page = parseInt(page);
    order = parseInt(order);
        
    if (max > 0 && page > 0) {
      const paginatedResult = await req.result.find()
        .sort({ [fieldSort]: order })
        .skip((page - 1) * max)
        .limit(max);
      res.status(200).json(paginatedResult);
    } else {
      next(new InvalidRequest());
    }
  } catch(error) {
    next(error);
  }
}