import { NextFunction, Request, Response } from "express";

const exceptionHandler = (
  func: (
    request: Request,
    response: Response,
    next?: NextFunction
  ) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};

export default exceptionHandler;
