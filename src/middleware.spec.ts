import { Context } from 'koa'
import { createMockContext } from '@shopify/jest-koa-mocks';
import { ParsedUrlQuery } from 'querystring';

import { parseQuery, validator } from './middleware';

const throwFunc = jest.fn();
const createMockCtx = (query: ParsedUrlQuery) => {
    return {
        ...createMockContext({ throw: throwFunc }),
        request: { query }
    }
};

describe('validator', () => {
    test('throw with a non-integer', async () => {
        const ctx = createMockCtx({ query: 'asdf;'});
        await validator(ctx as Context, () => Promise.resolve());
        expect(throwFunc).toHaveBeenCalledTimes(1);
    });
    test('throw with a invalid numbers', async () => {
        const ctx = createMockCtx({ query: '-1'});
        await validator(ctx as Context, () => Promise.resolve());
        expect(throwFunc).toHaveBeenCalledTimes(1);
    });
    test('throw with only min', async () => {
        const ctx = createMockCtx({ min: '1' });
        await validator(ctx as Context, () => Promise.resolve());
        expect(throwFunc).toHaveBeenCalledTimes(1);
    });
    test('not throw with valid input', async () => {
        const ctx = createMockCtx({ query: '3'});
        await validator(ctx as Context, () => Promise.resolve());
        expect(throwFunc).not.toHaveBeenCalled();
    });
});

describe('parseQuery', () => {
    test('sets body correctly with only query', async () => {
        const ctx = createMockCtx({ query: '1' });
        await (parseQuery(ctx as Context, () => Promise.resolve()));
        expect(ctx.body).toStrictEqual({ input: 1, output: 'I' });
    });
    test('sets body correctly with a range', async () => {
        const ctx = createMockCtx({ min: '4', max: '6' });
        await (parseQuery(ctx as Context, () => Promise.resolve()));
        expect(ctx.body).toStrictEqual({ conversions: [ { input: 4, output: 'IV' }, { input: 5, output: 'V'}, { input: 6, output: 'VI'}]})
    });
    test('sets body correctly with a range and a query', async () => {
        const ctx = createMockCtx({ min: '4', max: '6', query: '2001' });
        await (parseQuery(ctx as Context, () => Promise.resolve()));
        expect(ctx.body).toStrictEqual({ input: 2001, output: 'MMI', conversions: [ { input: 4, output: 'IV' }, { input: 5, output: 'V'}, { input: 6, output: 'VI'}]})
    });
});