import * as fp from "fastify-plugin";
import Repository from "./repository";
import Controller from "./controller";

export default fp(async (server, opts, next) => {
    server.route({
        url: "/cav",
        logLevel: "error",
        method: ["GET"],
        handler: async (request, reply) => {
            const controller = new Controller(new Repository());

            return reply.send(controller.findAll());
        }
    });
    next();
});