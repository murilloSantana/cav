import * as fastify from "fastify";
import FastityMock from "../mock/fastityMock";
import ScheduleController from "../../src/controller/scheduleController";
import scheduleController from "../../src/controller/scheduleController";
import Cav from "../../src/model/cav";

jest.mock('../../src/repository/scheduleRepository');
jest.mock('../../src/repository/cavRepository');
jest.mock('fastify');

const _ = require('lodash')

describe('ScheduleController', () => {
    let fastifyMock: FastityMock;

    beforeEach(() => {
        fastifyMock = new FastityMock();
        jest.clearAllMocks();
    });

    test('Should return not found in findAvailableCavTimesById, because cav dont exist', async () => {
        const request = fastifyMock.mockDefaultRequest();
        const reply = fastifyMock.mockDefaultReply();

        ScheduleController.cavRepository.findById = jest.fn().mockImplementation((): Cav | undefined => {
            return undefined;
        });

        await scheduleController.findAvailableCavTimesById(request, reply);

        expect(reply.callNotFound).toBeCalledTimes(1);
        expect(reply.callNotFound).toBeCalledWith();
    });

    test('Should return findAvailableCavTimesById', async () => {
        const request = fastifyMock.mockDefaultRequest();
        const reply = fastifyMock.mockDefaultReply();

        const expectedCav: Cav = {
            id: 1,
            name: "Botafogo",
            visit: undefined,
            inspection: undefined
        };

        const expectedTimes = [{
            "date": "2019-07-17",
            "visit": {
                "10": {},
                "11": {
                    "car": 1
                },
                "12": {},
                "13": {},
                "14": {
                    "car": 7
                },
                "15": {},
                "16": {},
                "17": {}
            },
            "inspection": {
                "10": {},
                "11": {
                    "car": 7
                },
                "12": {},
                "13": {},
                "14": {},
                "15": {},
                "16": {},
                "17": {}
            }
        }];

        ScheduleController.cavRepository.findById = jest.fn().mockImplementation((): Cav | undefined => {
            return expectedCav;
        });

        ScheduleController.scheduleRepository.findAvailableTimes = jest.fn().mockImplementation((): Array<any> => {
            return expectedTimes;
        });

        await scheduleController.findAvailableCavTimesById(request, reply);

        expect(reply.callNotFound).toBeCalledTimes(0);
        expect(reply.send).toBeCalledTimes(1);
        expect(reply.send).toBeCalledWith(expectedTimes);
    });

    test('Shouldnt schedule inspection, because cav dont exist', async () => {
        const request = fastifyMock.mockDefaultRequest();
        const reply = fastifyMock.mockDefaultReply();

        ScheduleController.cavRepository.findById = jest.fn().mockImplementation((): Cav | undefined => {
            return undefined;
        });

        await scheduleController.scheduleInspection(request, reply);

        expect(reply.status).toBeCalledTimes(1);
        expect(reply.status).toBeCalledWith(400);
        expect(reply.send).toBeCalledTimes(1);
        expect(reply.send).toBeCalledWith("cav not found");
    });

    test('Should schedule inspection', async () => {
        const request = fastifyMock.mockDefaultRequest();
        request.body.date = "2019-07-17";
        request.body.time = "12";
        request.body.carId = 1;

        const reply = fastifyMock.mockDefaultReply();

        const expectedCav: Cav = {
            id: 1,
            name: "Botafogo",
            visit: undefined,
            inspection: undefined
        };

        ScheduleController.cavRepository.findById = jest.fn().mockImplementation((): Cav | undefined => {
            return expectedCav;
        });

        ScheduleController.scheduleRepository.scheduleProceeding = jest.fn().mockImplementation(() => {});

        await scheduleController.scheduleInspection(request, reply);

        expect(ScheduleController.scheduleRepository.scheduleProceeding).toBeCalledTimes(1);
        expect(ScheduleController.scheduleRepository.scheduleProceeding).toBeCalledWith("Botafogo", "2019-07-17", "12", 1, "inspection");
        expect(reply.status).toBeCalledTimes(1);
        expect(reply.status).toBeCalledWith(201);
        expect(reply.send).toBeCalledTimes(1);
        expect(reply.send).toBeCalledWith("created");
    });

    test('Shouldnt schedule visit, because cav dont exist', async () => {
        const request = fastifyMock.mockDefaultRequest();
        const reply = fastifyMock.mockDefaultReply();

        ScheduleController.cavRepository.findById = jest.fn().mockImplementation((): Cav | undefined => {
            return undefined;
        });

        await scheduleController.scheduleInspection(request, reply);

        expect(reply.status).toBeCalledTimes(1);
        expect(reply.status).toBeCalledWith(400);
        expect(reply.send).toBeCalledTimes(1);
        expect(reply.send).toBeCalledWith("cav not found");
    });

    test('Should schedule visit', async () => {
        const request = fastifyMock.mockDefaultRequest();
        request.body.date = "2019-07-21";
        request.body.time = "11";
        request.body.carId = 1;

        const reply = fastifyMock.mockDefaultReply();

        const expectedCav: Cav = {
            id: 2,
            name: "Flamengo",
            visit: undefined,
            inspection: undefined
        };

        ScheduleController.cavRepository.findById = jest.fn().mockImplementation((): Cav | undefined => {
            return expectedCav;
        });

        ScheduleController.scheduleRepository.scheduleProceeding = jest.fn().mockImplementation(() => {});

        await scheduleController.scheduleVisit(request, reply);

        expect(ScheduleController.scheduleRepository.scheduleProceeding).toBeCalledTimes(1);
        expect(ScheduleController.scheduleRepository.scheduleProceeding).toBeCalledWith("Flamengo", "2019-07-21", "11", 1,"visit");
        expect(reply.status).toBeCalledTimes(1);
        expect(reply.status).toBeCalledWith(201);
        expect(reply.send).toBeCalledTimes(1);
        expect(reply.send).toBeCalledWith("created");
    });
});