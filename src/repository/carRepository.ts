import * as fs from "fs";

import Car from "../model/car";
const _ = require('lodash');

export default class CarRepository {

    findByCavName(carName: string): Car {
        const carJson = JSON.parse(fs.readFileSync('../db/cars.json', 'utf8'));
        return _.find(carJson, (car: Car) => car.cav == carName);
    }

}