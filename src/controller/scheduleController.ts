import {FastifyReply, FastifyRequest} from "fastify";
import * as http from "http";
import ScheduleRepository from "../repository/scheduleRepository";
import CavRepository from "../repository/cavRepository";


class ScheduleController {

    private cavRepository: CavRepository;
    private scheduleRepository: ScheduleRepository;

    constructor() {
        this.cavRepository = new CavRepository();
        this.scheduleRepository = new ScheduleRepository();
    }

    findAvailableCavTimesById = async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
        const findedCav = this.cavRepository.findById(request.params.cavId);
        if(!findedCav) reply.callNotFound();

        reply.send(this.scheduleRepository.findAvailableTimes(findedCav.name, request.query.proceeding));
    };

    scheduleInspection = async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
        const findedCav = this.cavRepository.findById(request.params.cavId);
        if(!findedCav) reply.callNotFound();

        const { date, time } = request.body;

        this.scheduleRepository.scheduleProceeding(findedCav.name, date, time, 'inspection');

        reply.status(201);
        reply.send("created");
    };

    scheduleVisit = async (request: FastifyRequest, reply: FastifyReply<http.ServerResponse>) => {
        const findedCav = this.cavRepository.findById(request.params.cavId);
        if(!findedCav) reply.callNotFound();

        const { date, time } = request.body;

        this.scheduleRepository.scheduleProceeding(findedCav.name, date, time, 'visit');

        reply.status(201);
        reply.send("created");
    };
}

export default new ScheduleController();