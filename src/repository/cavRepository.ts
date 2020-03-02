import * as fs from "fs";

import Cav from "../model/cav";
const _ = require('lodash');

export default class CavRepository {

    findById(cavId: number): Cav | undefined {
        const cavJson = this.buildDB();
        return _.find(cavJson, (cav: Cav) => cav.id == cavId);
    }

    findAll(): Array<Cav> {
        return this.buildDB();
    }

    buildDB = () => {
        return JSON.parse(fs.readFileSync('../db/cav.json', 'utf8'));
    }
}