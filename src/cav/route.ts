import * as fp from "fastify-plugin";
import controller from "./controller";

export default fp(async (server, opts, next) => {
    server.route({
        url: "/cav",
        logLevel: "error",
        method: ["GET"],
        handler: controller.findAll
    });
    next();
});