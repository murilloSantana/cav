import Cav from "./cav";

export default class DateSchedule {
    value: string;
    cav: Cav[];

    constructor(value: string, cav: Cav[]) {
        this.value = value;
        this.cav = cav;
    }

}
