import { createMockContext } from '@shopify/jest-koa-mocks';

import { validator } from './middleware';

describe('validator', () => {
    test.skip('returns valid response with query', async () => {
        const ctx = createMockContext({
            url: 'romannumeral/?query=3'
        });

        //@ts-expect-error TODO: Remove this 
        await validator({request: { query: { query: 3 }}}, () => {})
        console.log(ctx)

        expect(ctx.body).toBe({ input: 3, output: 'III'})
    });
});