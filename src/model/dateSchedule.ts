import Cav from "./cav";

export default class DateSchedule {
    value: string;
    cavs: Cav[];

    constructor(value: string, cavs: Cav[]) {
        this.value = value;
        this.cavs = cavs;
    }

}
