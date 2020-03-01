import Cav from "../model/cav";
import DateSchedule from "../model/dateSchedule";
import Schedule from "../model/schedule";
import * as fs from "fs";
import CarRepository from "./carRepository";

const _ = require('lodash');

export default class ScheduleRepository {

    private carRepository: CarRepository;

    constructor() {
        this.carRepository = new CarRepository();
    }

    //TODO refatorar metodo
    scheduleInspection = (cavName: string, requestDate: string, time: string) => {
        const schedule = this.parseJsonToSchedule();

        const date: DateSchedule = _.find(schedule.dates, (date: DateSchedule) => date.value == requestDate);

        //TODO lançar erro
        if(!date || !date.cavs) return null;

        const findedCav: Cav = _.find(date.cavs, (cav: Cav) => cav.name == cavName);

        //TODO lançar erro
        if(!findedCav) return null;

        findedCav.inspection = _.mapValues(findedCav.inspection, (value: any, key: any) => {
            if(key == time) {
                if(!_.isEmpty(value)) throw new Error("time has already been reserved by someone else");

                return { car: this.carRepository.findByCavName(cavName).id };
            }
            return value;
        });

        fs.writeFileSync("../db/calendar.json", JSON.stringify(this.parseScheduleToJson(schedule)));

    };

    findAvailableTimes = (cavName: string, proceeding: string): Array<any>  => {
        const schedule = this.parseJsonToSchedule();

        return _.map(schedule.dates, (date: DateSchedule) => {
            const availableTimes = this.findCavScheduleByName(date.cavs, cavName);

            switch (proceeding) {
                case 'visit':
                    return {date: date.value, visit: availableTimes.visit};
                case 'inspection':
                    return {date: date.value, inspection: availableTimes.inspection};
                default:
                    return {date: date.value, visit: availableTimes.visit, inspection: availableTimes.inspection};
            };

        });
    };

    findCavScheduleByName = (cavs: Cav[], cavName: string): Cav => {
        return _.find(cavs, (cav: Cav) => cav.name == cavName);
    };

    saveScheduleJson = () => {

    };

    private parseJsonToSchedule = () => {
        const scheduleJson = JSON.parse(fs.readFileSync('../db/calendar.json', 'utf8'));
        const dates: DateSchedule[] = [];
        _.toPairs(scheduleJson.date).forEach((item: any) => {
            const cavs = this.parseJsonToCav(item[1].cav);
            dates.push(new DateSchedule(item[0], cavs));
        });

        return new Schedule(dates);
    };

    private parseJsonToCav = (cavMap: any) => {
        const cavs: Cav[] = [];
        _.toPairs(cavMap).forEach((cavItem: any) => {
            cavs.push(new Cav(cavItem[0], cavItem[1].visit, cavItem[1].inspection));
        });

        return cavs;
    };

    private parseScheduleToJson = (schedule: Schedule) => {
        const scheduleJson: any = {date: {}};
        schedule.dates.forEach((date) => {
            scheduleJson.date[date.value] = {cav: {}};
            scheduleJson.date[date.value].cav = this.parseCavToJson(date.cavs);

            return scheduleJson;
        });

        return scheduleJson;
    };

    private parseCavToJson = (cavList: any) => {
        const result = _.reduce(cavList, (result: any = {}, value: any, key: any) => {
            result[value.name] = {visit: value.visit, inspection: value.inspection}
            return result;
        }, {});

        return result;
    };

}