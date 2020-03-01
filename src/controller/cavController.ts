import CavRepository from "../repository/cavRepository";
import {FastifyReply, FastifyRequest} from "fastify";
import * as http from "http";

class CavController {
    private repository: CavRepository;

    constructor() {
        this.repository = new CavRepository();
    }

    findAll = async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
        reply.send(this.repository.findAll());
    }

    findAvailableCavsById = async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
        // const findedCav = this.repository.findById(request.params.cavId);
        // if(!findedCav) reply.callNotFound();
        //
        // reply.send(this.repository.findAvailableTimes(findedCav.name, request.query.proceeding));
    }
}

export default new CavController();