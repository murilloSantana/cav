import Cav from "../model/cav";
import DateSchedule from "../model/dateSchedule";
import Schedule from "../model/schedule";

const _ = require('lodash');
const scheduleJson = require("../../db/calendar.json");

export default class ScheduleRepository {

    private parseJsonToSchedule = (scheduleJson: any) => {
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
            scheduleJson.date[date.value].cav = this.parseCavToJson(date.cav);

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

    findAvailableTimes = (cavName: string, proceeding: string): Array<any>  => {
        const schedule = this.parseJsonToSchedule(scheduleJson);

        return _.map(schedule.dates, (date: DateSchedule) => {
            const availableTimes = this.findCavScheduleByName(date.cav, cavName);

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
}