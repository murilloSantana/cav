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

    findAvailableCavsById = async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
        const findedCav = this.repository.findById(request.params.cavId);
        if(!findedCav) reply.callNotFound();

        const schedules = this.repository.findAvailableTimes(findedCav.name);
        reply.send(schedules);
    }
}

export default new Controller();