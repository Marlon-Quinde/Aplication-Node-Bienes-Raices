import { NextFunction, Request, Response } from "express";
import express from "express";

import { Exception, SpanStatusCode, trace } from '@opentelemetry/api'
const tracer = trace.getTracer('middleware')

export const signOz = async (req: Request, res: Response, next: NextFunction) => {
    tracer.startActiveSpan(req.baseUrl, async (span) => {
        try {
            span.setAttribute('http.method', req.method);
            span.setAttribute('http.url', req.url);
            span.setAttribute('http.status_code', res.statusCode);
            span.setAttribute('http.request_body', req.body ? JSON.stringify(req.body) : 'No Body');
            span.setStatus({ code: SpanStatusCode.OK })
            next();
        } catch (error) {
            span.setStatus({ code: SpanStatusCode.ERROR, message: (error as any).message }) // Set the status to ERROR if an exception occurs
            span.recordException((error as Exception))
            throw error
        } finally {
            span.end() // End the span
        }
    })
}