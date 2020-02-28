import Repository from "./repository";
import {FastifyReply, FastifyRequest} from "fastify";
import * as http from "http";

class Controller {
    private repository: Repository;

    constructor() {
        this.repository = new Repository();
    }

    findAll = async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
        reply.send(this.repository.findAll());
    }
}

export default new Controller();