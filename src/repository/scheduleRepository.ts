import Cav from "../model/cav";
import DateSchedule from "../model/dateSchedule";
import Schedule from "../model/schedule";
import * as fs from "fs";
import CarRepository from "./carRepository";

const _ = require('lodash');

export default class ScheduleRepository {

    private carRepository: CarRepository;
    schedule: Schedule;

    constructor() {
        this.carRepository = new CarRepository();
    }

    // TODO diminuir a quantidade de params passados
    scheduleProceeding = (cavName: string, requestDate: string, time: string, carId: number, proceeding: string) => {
        this.parseJsonToSchedule();

        const findedDate = this.findDateSchedule(requestDate);
        if(!findedDate) throw new Error("date isn't valid");

        const findedCavSchedule: any = this.findCav(findedDate, cavName);
        if(!findedCavSchedule) throw new Error("cav isn't valid");

        findedCavSchedule[proceeding] = this.generateProceeding(findedCavSchedule[proceeding], cavName, carId, time);

        fs.writeFileSync("../db/calendar.json", JSON.stringify(this.parseScheduleToJson(this.schedule)));
    };

    findDateSchedule = (requestDate: string): DateSchedule => {
        const date: DateSchedule = _.find(this.schedule.dates, (date: DateSchedule) => date.value == requestDate);
        return date;
    };

    findCav = (date: DateSchedule, cavName: string): Cav => {
        const findedCav: Cav = _.find(date.cavs, (cav: Cav) => cav.name == cavName);
        return findedCav;
    };

    generateProceeding = (proceeding: any, cavName: string, carId: number, time: string) => {
        const newProceeding = _.mapValues(proceeding, (value: any, key: any) => {
            if(key == time) {
                if(!_.isEmpty(value)) throw new Error("time has already been reserved by someone else");

                const car = this.carRepository.findById(carId);
                if(!car) throw new Error("car not exist");

                return { car: car.id };
            }
            return value;
        });

        if(_.isEqual(newProceeding, proceeding)) throw new Error("time isn't valid");

        return newProceeding;
    };

    findAvailableTimes = (cavName: string, proceeding: string): Array<any>  => {
        this.parseJsonToSchedule();

        return _.map(this.schedule.dates, (date: DateSchedule) => {
            const availableTimes = this.findCavScheduleByName(date.cavs, cavName);

            if(!availableTimes) throw new Error("cav not exist");

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

    buildDB = () => {
        return JSON.parse(fs.readFileSync('../db/calendar.json', 'utf8'));
    };

    parseJsonToSchedule = () => {
        const scheduleJson = this.buildDB();
        const dates: DateSchedule[] = [];
        _.toPairs(scheduleJson.date).forEach((item: any) => {
            const cavs = this.parseJsonToCav(item[1].cav);
            dates.push(new DateSchedule(item[0], cavs));
        });

        this.schedule = new Schedule(dates);
    };

    parseJsonToCav = (cavMap: any) => {
        const cavs: Cav[] = [];
        _.toPairs(cavMap).forEach((cavItem: any) => {
            cavs.push(new Cav(cavItem[0], cavItem[1].visit, cavItem[1].inspection));
        });

        return cavs;
    };

    parseScheduleToJson = (schedule: Schedule) => {
        const scheduleJson: any = {date: {}};
        schedule.dates.forEach((date) => {
            scheduleJson.date[date.value] = {cav: {}};
            scheduleJson.date[date.value].cav = this.parseCavToJson(date.cavs);

            return scheduleJson;
        });

        return scheduleJson;
    };

    parseCavToJson = (cavList: any) => {
        const result = _.reduce(cavList, (result: any = {}, value: any, key: any) => {
            result[value.name] = {visit: value.visit, inspection: value.inspection}
            return result;
        }, {});

        return result;
    };

}