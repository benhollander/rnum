import Koa from 'koa';
import cors from '@koa/cors';

import { router } from './routes';
import { parseQuery, validator } from './middleware';

const app = new Koa();

const PORT = 3000;

app.use(cors());
app.use(validator);
app.use(parseQuery);
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port http://localhost:${PORT}/`);
});