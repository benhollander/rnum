import Koa from 'koa';
import Router from '@koa/router'

import './tracer';
import { parseQuery, validator } from './middleware';
import { PORT } from './constants';
import { getLogger } from './logger';

const logger = getLogger();
const app = new Koa();
const router = new Router();

// router.get('/romannumeral', validator, parseQuery);
router.get('/romannumeral')

app.use(router.routes());
app.use(router.allowedMethods());
app.use(validator);
app.use(parseQuery);

app.listen(PORT, () => {
  logger.log({ level: 'info', message: `🚀 Server is running on port http://localhost:${PORT}/`});
});