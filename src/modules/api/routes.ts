import express, { NextFunction, Request, Response } from "express";
import { propiedades } from "./controller";
import { Exception, SpanStatusCode, trace } from '@opentelemetry/api'
import { signOz } from "../../middlewares/signoz";
const tracer = trace.getTracer('your-service-name')


const router = express.Router();

router.get("/propiedades", signOz, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await propiedades();
            res.json(response)// Set the status of the span to OK
        } catch (error) {
            throw error
        }
});

export default router;
