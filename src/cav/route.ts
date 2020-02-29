import * as fp from "fastify-plugin";
import controller from "./controller";
import {FastifyReply, FastifyRequest} from "fastify";
import * as http from "http";

export default fp(async (server, opts, next) => {
    server.route({
        url: "/cav",
        method: ["GET"],
        logLevel: "error",
        prefixTrailingSlash: "both",
        handler: controller.findAll
    }).route({
        url: "/cav/:cavId",
        method: ["GET"],
        logLevel: "error",
        prefixTrailingSlash: "both",
        preHandler: async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
            const proceedingsSupporteds = ["visit", "inspection"];

            if(!request.params.cavId) {
                reply.status(400);
                reply.send("CavId is required");
            }

            if(request.query.proceeding && !proceedingsSupporteds.includes(request.query.proceeding)) {
                reply.status(400);
                reply.send(`The informed procedure is not supported, only the following procedures are valid: ${proceedingsSupporteds}`);
            }

        },
        handler: controller.findAvailableCavsById
    });
    next();
});