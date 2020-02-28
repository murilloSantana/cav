import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import cavRoutes from "./cav/route";

const server: fastify.FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
    > = fastify({ logger: true });

server.register(cavRoutes);

const start = async () => {
    try {
        await server.listen(3000, "0.0.0.0");
    } catch (err) {
        server.log.error(err);
    }
};

start();
