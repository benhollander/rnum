import Koa from 'koa';
import Router from '@koa/router'

import './tracer';
import { parseQuery, validator } from './middleware';
import { PORT } from './constants';
import { getLogger } from './logger';

const logger = getLogger();
const app = new Koa();
const router = new Router();

router.get('/romannumeral', validator, parseQuery);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port http://localhost:${PORT}/`);
});