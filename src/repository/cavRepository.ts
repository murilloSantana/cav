import * as fs from "fs";

import Cav from "../model/cav";
const _ = require('lodash');

export default class CavRepository {

    findById(cavId: number): Cav {
        const cavJson = JSON.parse(fs.readFileSync('../db/cav.json', 'utf8'));
        return _.find(cavJson, (cav: Cav) => cav.id == cavId);
    }

    findAll(): Array<Cav> {
        return JSON.parse(fs.readFileSync('../db/cav.json', 'utf8'));
    }

}