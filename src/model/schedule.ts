import DateSchedule from "./dateSchedule";

export default class Schedule {
    dates: DateSchedule[];

    constructor(dates: DateSchedule[]) {
        this.dates = dates
    }
}