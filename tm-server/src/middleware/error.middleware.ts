import type { NextFunction, Request, Response } from "express";

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
        success: false,
        message: err.message || "Internal server error",
    })
}