import CavController from "../../src/controller/cavController";
import * as fastify from "fastify";
import Cav from "../../src/model/cav";
import * as fs from "fs";
import FastityMock from "../mock/fastityMock";

jest.mock('../../src/repository/cavRepository');
jest.mock('fastify');

const _ = require('lodash')

describe('CavController', () => {
    let fastifyMock: FastityMock;

    beforeEach(() => {
        fastifyMock = new FastityMock();
        jest.clearAllMocks();
    });

    test('Should findAll', async () => {
        const expectedCav = JSON.parse(fs.readFileSync('./test/mock/db/cav.json', 'utf8'));
        const request = fastifyMock.mockDefaultRequest();
        const reply = fastifyMock.mockDefaultReply();

        CavController.cavRepository.findAll = jest.fn().mockImplementation((): Cav[] => {
            return expectedCav;
        });

        await CavController.findAll(request, reply);

        expect(reply.send).toBeCalledTimes(1);
        expect(reply.send).toBeCalledWith(expectedCav);
    });

});