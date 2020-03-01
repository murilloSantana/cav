import CavRepository from "../repository/cavRepository";
import {FastifyReply, FastifyRequest} from "fastify";
import * as http from "http";
import ScheduleRepository from "../repository/scheduleRepository";
const _ = require('lodash');

class CavController {
    private cavRepository: CavRepository;
    private scheduleRepository: ScheduleRepository;

    constructor() {
        this.cavRepository = new CavRepository();
        this.scheduleRepository = new ScheduleRepository();
    };

    findAll = async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
        reply.send(this.cavRepository.findAll());
    };

    findAvailableCavTimesById = async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
        const findedCav = this.cavRepository.findById(request.params.cavId);
        if(!findedCav) reply.callNotFound();

        reply.send(this.scheduleRepository.findAvailableTimes(findedCav.name, request.query.proceeding));
    };

    // TODO criar util para tratar de maneira menos repetitiva as respostas de erro http
    scheduleInspection = async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
        const findedCav = this.cavRepository.findById(request.params.cavId);
        if(!findedCav) reply.callNotFound();
        if(!request.body) {
            reply.status(400);
            reply.send("body is required");
            return;
        }

        const { date, time } = request.body;

        if(!date) {
            reply.status(400);
            reply.send("date is required");
            return;
        }

        if(!time) {
            reply.status(400);
            reply.send("time is required");
            return;
        }

        this.scheduleRepository.scheduleInspection(findedCav.name, date, time, 'inspection');

        reply.status(201);
        reply.send("created");
    };
}

export default new CavController();