const cavJson = require("../../db/cav.json");
const Calendar = require("../../db/calendar.json");
import Cav from "../model/cav";
const _ = require('lodash');

export default class Repository {

    findById(cavId: number): Cav {
        return _.find(cavJson, (cav: Cav) => cav.id == cavId);
    }

    findAll(): Array<Cav> {
        return cavJson;
    }

}