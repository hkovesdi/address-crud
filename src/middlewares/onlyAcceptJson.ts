import { NextFunction, Request, Response } from "express";

export function onlyAcceptJson(req: Request, res: Response, next: NextFunction) {
  const contentType = req.get('Content-Type') ?? 'application/json';
  
  if (contentType !== 'application/json') {
    return res.sendStatus(415);
  }

  next();
}