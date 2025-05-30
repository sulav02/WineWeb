
import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { API_VERSION } from "./constant/constant.js";

import memberRoute from "./routes/memberRoute.js";
import linkRoute from "./routes/linkRoute.js";
import ratingRoute from "./routes/ratingRoute.js";

const app = new Application();
const router = new Router();


app.use(
    oakCors({
        origin: "*", // Allow all origins (for development). Change this for production.
        // You can specify options like methods, allowedHeaders, etc.
    }),
);
// Mount routes under API version prefix

// Serve static files from /public
app.use(async (ctx, next) => {
    const path = ctx.request.url.pathname;
    const filePath = path === "/" ? "/index.html" : path;
    try {
        await send(ctx, filePath, {
            root: `${Deno.cwd()}/public`,
            index: "index.html",
        });
    } catch {
        await next(); // if file not found, go to next middleware (e.g., 404)
    }
});

router.get("/api/wine", (ctx) => {
    ctx.response.body = { message: "Welcome to WINE API" };
});


router.use(`/api/v${API_VERSION}/members`, memberRoute.routes(), memberRoute.allowedMethods());
router.use(`/api/v${API_VERSION}/links`, linkRoute.routes(), linkRoute.allowedMethods());
router.use(`/api/v${API_VERSION}/ratings`, ratingRoute.routes(), ratingRoute.allowedMethods());

// Root route
// router.get("/", (ctx) => {
//     ctx.response.status = 200;
//     ctx.response.body = "Welcome to WINE API";
// });

app.use(router.routes());
app.use(router.allowedMethods());

export default app
