import { Middleware } from "koa";
import Joi from 'joi';

import { getRomanNumeral } from "./utils";
import { MAXIMUM_INTEGER, MINIMUM_INTEGER } from "./constants";

export const validator:Middleware = async (ctx, next) => {
    const { max, min, query } = ctx.request.query;

    try {
        if (ctx.request.query.query) {
            Joi.assert(query, Joi.number().integer().min(MINIMUM_INTEGER).max(MAXIMUM_INTEGER).required());
        }
        if (min || max) {
            Joi.assert(min, Joi.number().integer().min(MINIMUM_INTEGER).max(MAXIMUM_INTEGER).less(max as unknown as number).required());
            Joi.assert(max, Joi.number().integer().min(MINIMUM_INTEGER).max(MAXIMUM_INTEGER).greater(min as unknown as number).required());
        }
    } catch (e) {
        console.log(e)
        ctx.response.status = 406;
        return;
    }

    await next();
}

export const parseQuery:Middleware = async (ctx, next) => {
    const { query } = ctx.request.query;
    ctx.body = {
        "input": query,
        "output": getRomanNumeral(parseInt(query as string, 10))
    }

    await next();
}
