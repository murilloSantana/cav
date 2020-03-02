import CavRepository from "../../src/repository/cavRepository";
import * as fs from "fs";

describe('CavRepository', () => {

    let cavRepository: CavRepository;

    beforeEach(() => {
        cavRepository = new CavRepository();
        jest.clearAllMocks();
    });

    test('Should findById return undefined because cav not exist', async () => {
        const cavId: number = 100;

        cavRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/cav.json', 'utf8'));
        });

        const response = cavRepository.findById(cavId);

        expect(response).toEqual(undefined);

    });

    test('Should findById', async () => {
        const cavId: number = 1;
        const expectedCav = {
            "id": 1,
            "name": "Botafogo"
        };

        cavRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/cav.json', 'utf8'));
        });

        const response = cavRepository.findById(cavId);

        expect(response).toEqual(expectedCav);

    });

    test('Should findAll return undefined because cavs not exists', async () => {
        cavRepository.buildDB = jest.fn().mockImplementation(() => {
            return undefined;
        });

        const response = cavRepository.findAll();

        expect(response).toEqual(undefined);

    });

    test('Should findAll', async () => {
        const expectedCavs = [
            {
                "id": 1,
                "name": "Botafogo"
            },
            {
                "id": 2,
                "name": "Barra da Tijuca"
            },
            {
                "id": 3,
                "name": "Norte Shopping"
            }
        ];


        cavRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/cav.json', 'utf8'));
        });

        const response = cavRepository.findAll();

        expect(response).toEqual(expectedCavs);

    });
});