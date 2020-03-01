import * as fp from "fastify-plugin";
import CavController from "./controller/cavController";
import {FastifyReply, FastifyRequest} from "fastify";
import * as http from "http";

export default fp(async (server, opts, next) => {
    server.route({
        url: "/cav",
        method: ["GET"],
        logLevel: "error",
        prefixTrailingSlash: "both",
        handler: CavController.findAll
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
            };

            if(request.query.proceeding && !proceedingsSupporteds.includes(request.query.proceeding)) {
                reply.status(400);
                reply.send(`The informed procedure is not supported, only the following procedures are valid: ${proceedingsSupporteds}`);
            };

        },
        handler: CavController.findAvailableCavTimesById
    }).route({
        url: "/cav/:cavId/inspection",
        method: ["POST"],
        logLevel: "error",
        prefixTrailingSlash: "both",
        preHandler: async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {

            if(!request.params.cavId) {
                reply.status(400);
                reply.send("CavId is required");
            };

        },
        handler: CavController.scheduleInspection
    }).route({
        url: "/cav/:cavId/visit",
        method: ["POST"],
        logLevel: "error",
        prefixTrailingSlash: "both",
        preHandler: async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {

            if(!request.params.cavId) {
                reply.status(400);
                reply.send("CavId is required");
            };

        },
        handler: CavController.scheduleVisit
    });

    next();
});