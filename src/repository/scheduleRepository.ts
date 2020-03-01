import Cav from "../model/cav";
import DateSchedule from "../model/dateSchedule";
import Schedule from "../model/schedule";

const _ = require('lodash');
const scheduleJson = require("../../db/calendar.json");

export default class ScheduleRepository {

    parseJsonToSchedule = () => {
        const dates: DateSchedule[] = [];
        _.toPairs(scheduleJson.date).forEach((item: any) => {
            const cavs = this.parseJsonToCav(item[1].cav);
            dates.push(new DateSchedule(item[0], cavs));
        });

        return new Schedule(dates);
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
            scheduleJson.date[date.value].cav = this.parseCavToJson(date.cav);

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