import * as fp from "fastify-plugin";
import CavController from "./controller/cavController";
import ScheduleController from "./controller/scheduleController";
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
        schema: {
            params: {
                cavId: { type: 'number' }
            }
        },
        preHandler: async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
            const proceedingsSupporteds = ["visit", "inspection"];

            if(request.query.proceeding && !proceedingsSupporteds.includes(request.query.proceeding)) {
                reply.status(400);
                reply.send(`The informed procedure is not supported, only the following procedures are valid: ${proceedingsSupporteds}`);
            };

        },
        handler: ScheduleController.findAvailableCavTimesById
    }).route({
        url: "/cav/:cavId/inspection",
        method: ["POST"],
        logLevel: "error",
        prefixTrailingSlash: "both",
        schema: {
            body: {
                type: 'object',
                properties: {
                    date: { type: 'string' },
                    time: { type: 'string' },
                    carId: { type: 'number' }
                },
                required: [ 'date', 'time', 'carId' ]
            }
        },
        handler: ScheduleController.scheduleInspection
    }).route({
        url: "/cav/:cavId/visit",
        method: ["POST"],
        logLevel: "error",
        prefixTrailingSlash: "both",
        schema: {
            params: {
                cavId: { type: 'number' }
            },
            body: {
                type: 'object',
                properties: {
                    date: { type: 'string' },
                    time: { type: 'string' },
                    carId: { type: 'number' }
                },
                required: [ 'date', 'time', 'carId' ]
            }
        },
        handler: ScheduleController.scheduleVisit
    });

    next();
});