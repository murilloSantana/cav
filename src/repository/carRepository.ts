import * as fs from "fs";

import Car from "../model/car";
const _ = require('lodash');

export default class CarRepository {

    findById(id: number): Car | undefined {
        const carJson = this.buildDB();
        return _.find(carJson, (car: Car) => car.id == id);
    }

    buildDB() {
        return JSON.parse(fs.readFileSync('../db/cars.json', 'utf8'));
    }
}