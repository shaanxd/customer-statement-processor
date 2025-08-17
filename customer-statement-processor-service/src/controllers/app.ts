import { Response, Request } from "express";

const getAPIHealth = async (request: Request, response: Response) => {
  response.status(200).json({ message: "API Health sehr gut...." });
};

export default { getAPIHealth };
