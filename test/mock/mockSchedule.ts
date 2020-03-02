import DateSchedule from "../../src/model/dateSchedule";
import Cav from "../../src/model/cav";
import Schedule from "../../src/model/schedule";

export default class MockSchedule {

    defaultScheduleObject = () => {
        const dates: DateSchedule[] = [];
        dates.push(this.defaultDateScheduleObject());

        return new Schedule(dates);
    };

    defaultDateScheduleObject = (): DateSchedule => {
        const cavs: Cav[] = [
            this.botafogoCavObject(),
            this.norteShoppingCavObject(),
            this.barraDaTijucaCavObject()
        ];

        return new DateSchedule("2019-07-17", cavs);
    };

    botafogoCavObject = () => {
        const visit = {
            "10": {},
            "11": {
                "car": 1
            },
            "12": {},
            "13": {},
            "14": {
                "car": 7
            },
            "15": {},
            "16": {},
            "17": {}
        };

        const inspection = {
            "10": {},
            "11": {
                "car": 7
            },
            "12": {},
            "13": {},
            "14": {},
            "15": {},
            "16": {},
            "17": {}
        };

        return new Cav("Botafogo", visit, inspection);
    }

    norteShoppingCavObject = () => {
        const visit = {
            "10": {},
            "11": {},
            "12": {},
            "13": {},
            "14": {},
            "15": {},
            "16": {},
            "17": {}
        };

        const inspection = {
            "10": {},
            "11": {
                "car": 2
            },
            "12": {},
            "13": {},
            "14": {},
            "15": {},
            "16": {},
            "17": {}
        };

        return new Cav("Norte Shopping", visit, inspection);
    };

    barraDaTijucaCavObject = () => {
        const visit = {
            "10": {},
            "11": {
                "car": 3
            },
            "12": {},
            "13": {},
            "14": {},
            "15": {},
            "16": {},
            "17": {}
        };

        const inspection = {
            "10": {
                "car": 3
            },
            "11": {
                "car": 4
            },
            "12": {
                "car": 5
            },
            "13": {},
            "14": {},
            "15": {},
            "16": {},
            "17": {}
        };

        return new Cav("Barra da Tijuca", visit, inspection);
    };

    defaultCavJson = () => {
        return {
            "Botafogo": {
                "visit": {
                    "10": {},
                    "11": {
                        "car": 1
                    },
                    "12": {},
                    "13": {},
                    "14": {
                        "car": 7
                    },
                    "15": {},
                    "16": {},
                    "17": {}
                },
                "inspection": {
                    "10": {},
                    "11": {
                        "car": 7
                    },
                    "12": {},
                    "13": {},
                    "14": {},
                    "15": {},
                    "16": {},
                    "17": {}
                }
            },
            "Norte Shopping": {
                "visit": {
                    "10": {},
                    "11": {},
                    "12": {},
                    "13": {},
                    "14": {},
                    "15": {},
                    "16": {},
                    "17": {}
                },
                "inspection": {
                    "10": {},
                    "11": {
                        "car": 2
                    },
                    "12": {},
                    "13": {},
                    "14": {},
                    "15": {},
                    "16": {},
                    "17": {}
                }
            },
            "Barra da Tijuca": {
                "visit": {
                    "10": {},
                    "11": {
                        "car": 3
                    },
                    "12": {},
                    "13": {},
                    "14": {},
                    "15": {},
                    "16": {},
                    "17": {}
                },
                "inspection": {
                    "10": {
                        "car": 3
                    },
                    "11": {
                        "car": 4
                    },
                    "12": {
                        "car": 5
                    },
                    "13": {},
                    "14": {},
                    "15": {},
                    "16": {},
                    "17": {}
                }
            }
        };
    };

    defaultDateScheduleJson = () => {
        return {
            "value": "2019-07-17",
            "cavs": [{
                "name": "Botafogo",
                "visit": {
                    "10": {},
                    "11": {
                        "car": 1
                    },
                    "12": {},
                    "13": {},
                    "14": {
                        "car": 7
                    },
                    "15": {},
                    "16": {},
                    "17": {}
                },
                "inspection": {
                    "10": {},
                    "11": {
                        "car": 7
                    },
                    "12": {},
                    "13": {},
                    "14": {},
                    "15": {},
                    "16": {},
                    "17": {}
                }
            }, {
                "name": "Norte Shopping",
                "visit": {
                    "10": {},
                    "11": {},
                    "12": {},
                    "13": {},
                    "14": {},
                    "15": {},
                    "16": {},
                    "17": {}
                },
                "inspection": {
                    "10": {},
                    "11": {
                        "car": 2
                    },
                    "12": {},
                    "13": {},
                    "14": {},
                    "15": {},
                    "16": {},
                    "17": {}
                }
            }, {
                "name": "Barra da Tijuca",
                "visit": {
                    "10": {},
                    "11": {
                        "car": 3
                    },
                    "12": {},
                    "13": {},
                    "14": {},
                    "15": {},
                    "16": {},
                    "17": {}
                },
                "inspection": {
                    "10": {
                        "car": 3
                    },
                    "11": {
                        "car": 4
                    },
                    "12": {
                        "car": 5
                    },
                    "13": {},
                    "14": {},
                    "15": {},
                    "16": {},
                    "17": {}
                }
            }]
        };
    };
}