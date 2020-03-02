import CarRepository from "../../src/repository/carRepository";
import * as fs from "fs";

describe('CarRepository', () => {

    let carRepository: CarRepository;

    beforeEach(() => {
        carRepository = new CarRepository();
        jest.clearAllMocks();
    });

    test('Should findByCavName return undefined because car not exist', async () => {
        const carId: number = 100;

        carRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/cars.json', 'utf8'));
        });

        const response = carRepository.findById(carId);

        expect(response).toEqual(undefined);

    });

    test('Should findByCavName', async () => {
        const carId: number = 1;
        const expectedCar = {
            "id": 1,
            "brand": "VW",
            "model": "Golf",
            "cav": "Botafogo"
        };

        carRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/cars.json', 'utf8'));
        });

        const response = carRepository.findById(carId);

        expect(response).toEqual(expectedCar);

    });

});