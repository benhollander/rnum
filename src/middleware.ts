import { Middleware } from "koa";
import { z } from 'zod';

import { getRomanNumeral } from "./utils";
import { MAXIMUM_INTEGER, MINIMUM_INTEGER } from "./constants";

export const validator:Middleware = async (ctx, next) => {
    const { query } = ctx.request;
    console.log(query)
    const querySchema = z.object({
        min: z.coerce.number().min(MINIMUM_INTEGER).max(MAXIMUM_INTEGER).lt(parseInt(query.max as string, 10)),
        max: z.coerce.number().min(MINIMUM_INTEGER).max(MAXIMUM_INTEGER).gt(parseInt(query.min as string, 10)),
        query: z.coerce.number().min(MINIMUM_INTEGER).max(MAXIMUM_INTEGER)
    }).partial();

    try {
        // if min or max is included, both are required.
        if (query.min || query.max) {
            querySchema.required({ min: true, max: true }).parse({ min: query.min, max: query.max });
        }
        else {
            querySchema.required({ query: true }).parse({ query: query.query });
        }
    } catch (e) {
        console.error(e);
        ctx.response.status = 406;
        return;
    }

    await next();
}

interface Result {
    input?: number;
    output?: string;
}
interface Body extends Result {
    conversions?: Result[];
}

export const parseQuery:Middleware = async (ctx, next) => {
    const { max, min, query } = ctx.request.query;
    const body:Body = {};
    if (max && min) {
        body.conversions = [];
        // casting types should be safe here as long as we've run the validator middleware first
        for (let i=parseInt(min as string, 10); i<=parseInt(max as string, 10); i++) {
            body.conversions.push({
                input: i,
                output: getRomanNumeral(i)
            });
        }
    } 

    if (query) {
        body.input = parseInt(query as string, 10);
        body.output = getRomanNumeral(parseInt(query as string, 10));
    }

    ctx.body = body;

    await next();
}
