const DB = require("../../db/cav.json");
const Calendar = require("../../db/calendar.json");
import Cav from "./model";
const _ = require('lodash');

export default class Repository {

    private readonly data: Array<Cav>;
    private readonly agenda: any;

    constructor() {
        this.data = DB;
        this.agenda = Object.assign({}, _.merge(Calendar.date));
    }

    findById(cavId: number): Cav {
        return _.find(this.data, (cav: Cav) => cav.id == cavId);
    }

    findAll(): Array<Cav> {
        return this.data;
    }

    findAvailableTimes(cavName: string): Array<any> {
        const schedules: Array<any> = [];

        _.toPairs(this.agenda).forEach((item: any) => {
            const date = item[0];
            const cavsMap = item[1];
            const findedCav = cavsMap.cav[cavName];

            schedules.push(this.buildSchedule(date, findedCav));
        });

        return schedules;
    }

    buildSchedule(date: string, cav: any) {
        const schedule = {date: date, visits: [], inspections: []};

        schedule.visits = this.findAvailableVisitSchedules(cav.visit);
        schedule.inspections = this.findAvailableInspectionSchedules(cav.inspection);

        return schedule;
    }

    findAvailableVisitSchedules(visits: any) {
        return _.reduce(visits, (result: any = [], value: {}, key: string) => {
                if(_.isEmpty(value)) result.push(key);

                return result;
            }, []);
    }

    findAvailableInspectionSchedules(inspections: any) {
        return _.reduce(inspections, (result: any = [], value: {}, key: string) => {
            if(_.isEmpty(value)) result.push(key);

            return result;
        }, []);
    }
}