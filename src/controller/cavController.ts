import CavRepository from "../repository/cavRepository";
import {FastifyReply, FastifyRequest} from "fastify";
import * as http from "http";

class CavController {

    cavRepository: CavRepository;

    constructor() {
        this.cavRepository = new CavRepository();
    };

    findAll = async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
        reply.send(this.cavRepository.findAll());
    };

}

export default new CavController();