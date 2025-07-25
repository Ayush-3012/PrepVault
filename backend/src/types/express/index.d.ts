import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: string; // or type of `decoded.id` (could be `UserPayload` or `string`)
  }
}
