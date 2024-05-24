import { Middleware } from "koa";
import { z } from 'zod';

import { getRomanNumeral } from "./utils";
import { MAXIMUM_INTEGER, MINIMUM_INTEGER } from "./constants";
import { getLogger } from "./logger";

const logger = getLogger();

export const validator:Middleware = async (ctx, next) => {
    const { query } = ctx.request;
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
        if (query.query) {
            querySchema.required({ query: true }).parse({ query: query.query });
        }
    } catch (e) {
        logger.error('validation error', e);
        ctx.throw(406);
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
        // build a list of promises so that roman numerals can be calculated in parallel
        const conversions:Promise<Result>[] = [];
        // casting types should be safe here as long as we've run the validator middleware first
        for (let i=parseInt(min as string, 10); i<=parseInt(max as string, 10); i++) {
            conversions.push(new Promise((resolve) => {
                getRomanNumeral(i).then((rnum) => {
                    resolve({
                        input: i,
                        output: rnum
                    });
                });
        }));
        }
        // Wait for all promises to complete before continuing.
        try {
            body.conversions = await Promise.all(conversions);
        } catch(e) {
            logger.error('Roman Numeral conversion error', e);
            ctx.throw(500);
        }
    } 

    if (query) {
        body.input = parseInt(query as string, 10);
        body.output = await getRomanNumeral(parseInt(query as string, 10));
    }

    ctx.body = body;

    await next();
}
