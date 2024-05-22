import Router from "koa-router";


export const router = new Router();

//TODO: is there more to do here?
// any path is working here, but anything but this route should return 404
router.get("/romannumeral");