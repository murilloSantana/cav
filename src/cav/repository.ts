const DB = require("../../db/cav.json");
import Cav from "./model";

export default class Repository {

    private readonly data: any;

    constructor() {
        this.data = DB;
    }

    findAll(): Cav {
        return this.data;
    }
}