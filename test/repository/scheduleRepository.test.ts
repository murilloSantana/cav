import ScheduleRepository from "../../src/repository/scheduleRepository";
import MockSchedule from "../mock/mockSchedule";
import * as fs from "fs";
import DateSchedule from "../../src/model/dateSchedule";
import Cav from "../../src/model/cav";

describe('CarRepository', () => {

    let scheduleRepository: ScheduleRepository;
    let mockSchedule: MockSchedule;

    beforeEach(() => {
        scheduleRepository = new ScheduleRepository();
        mockSchedule = new MockSchedule();
        jest.clearAllMocks();
    });

    test('Should findDateSchedule', async () => {
        const date = '2019-07-17';
        const expectedDateSchedule = mockSchedule.defaultDateScheduleJson();

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.findDateSchedule(date);

        expect(response).toEqual(expectedDateSchedule);
    });

    test('Should findDateSchedule return undefined because date not exist', async () => {
        const date = '2019-07-29';

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.findDateSchedule(date);

        expect(response).toEqual(undefined);
    });

    test('Should findCav', async () => {
        const cavName = 'Norte Shopping';
        const dateSchedule: DateSchedule = mockSchedule.defaultDateScheduleObject();
        const expectedCav = {
            name: "Norte Shopping",
            visit: {
                "10": {},
                "11": {},
                "12": {},
                "13": {},
                "14": {},
                "15": {},
                "16": {},
                "17": {}
            },
            inspection: {
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
        };

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.findCav(dateSchedule, cavName);

        expect(response).toEqual(expectedCav);
    });

    test('Should findCav return undefined because cav not exist', async () => {
        const cavName = 'Flamengo';
        const dateSchedule: DateSchedule = mockSchedule.defaultDateScheduleObject();

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.findCav(dateSchedule, cavName);

        expect(response).toEqual(undefined);
    });

    test('Should findCavScheduleByName', async () => {
        const cavName = 'Norte Shopping';
        const cavs: Cav[] = [
            mockSchedule.botafogoCavObject(),
            mockSchedule.barraDaTijucaCavObject(),
            mockSchedule.norteShoppingCavObject()
        ];

        const expectedCav = {
            name: "Norte Shopping",
            visit: {
                "10": {},
                "11": {},
                "12": {},
                "13": {},
                "14": {},
                "15": {},
                "16": {},
                "17": {}
            },
            inspection: {
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
        };

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.findCavScheduleByName(cavs, cavName);

        expect(response).toEqual(expectedCav);
    });

    test('Should findAvailableVisitSchedules', async () => {

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.findAvailableVisitSchedules(mockSchedule.botafogoCavObject().visit);

        expect(response).toEqual([
            "10",
            "12",
            "13",
            "15",
            "16",
            "17"
        ]);
    });

    test('Should findAvailableInspectionSchedules', async () => {

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.findAvailableInspectionSchedules(mockSchedule.botafogoCavObject().inspection);

        expect(response).toEqual([
            "10",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17"
        ]);
    });

    test('Should findCavScheduleByName return undefined because cav not exist', async () => {
        const cavName = 'Flamengo';
        const cavs: Cav[] = [
            mockSchedule.botafogoCavObject(),
            mockSchedule.barraDaTijucaCavObject(),
            mockSchedule.norteShoppingCavObject()
        ];

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.findCavScheduleByName(cavs, cavName);

        expect(response).toEqual(undefined);
    });

    test('Should findAvailableTimes with default proceeding', async () => {
        const cavName = "Botafogo";
        const proceeding = "";
        const expectedTimes = [{
            "date": "2019-07-17",
            "visit": [
                "10",
                "12",
                "13",
                "15",
                "16",
                "17"
            ],
            "inspection": [
                "10",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17"
            ]
        }, {
            "date": "2019-07-18",
            "visit": [
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17"
            ],
            "inspection": [
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17"
            ]
        }];

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.findAvailableTimes(cavName, proceeding);

        expect(response).toEqual(expectedTimes);
    });

    test('Should findAvailableTimes with visit proceeding', async () => {
        const cavName = "Botafogo";
        const proceeding = "visit";
        const expectedTimes = [{
            "date": "2019-07-17",
            "visit": [
                "10",
                "12",
                "13",
                "15",
                "16",
                "17"
            ]
        }, {
            "date": "2019-07-18",
            "visit": [
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17"
            ]
        }];

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.findAvailableTimes(cavName, proceeding);

        expect(response).toEqual(expectedTimes);
    });

    test('Should findAvailableTimes with inspection proceeding', async () => {
        const cavName = "Botafogo";
        const proceeding = "inspection";
        const expectedTimes = [{
            "date": "2019-07-17",
            "inspection": [
                "10",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17"
            ]
        }, {
            "date": "2019-07-18",
            "inspection": [
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17"
            ]
        }];

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.findAvailableTimes(cavName, proceeding);

        expect(response).toEqual(expectedTimes);
    });

    test('Should findAvailableTimes throw error because cav not exist', async () => {
        const cavName = "Flamengo";
        const proceeding = "";

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();

        expect(() => scheduleRepository.findAvailableTimes(cavName, proceeding)).toThrowError(new Error('cav not exist'));
    });

    test('Should parseCavToJson', async () => {
        const cavs = mockSchedule.defaultDateScheduleObject().cavs;
        const expectedCavJson = {
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

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        const response = scheduleRepository.parseCavToJson(cavs);

        expect(response).toEqual(expectedCavJson);
    });

    test('Should parseScheduleToJson', async () => {
        const schedule = mockSchedule.defaultScheduleObject();
        const expectedScheduleJson = {
            "date": {
                "2019-07-17": {
                    "cav": {
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
                    }
                }
            }
        };

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        const response = scheduleRepository.parseScheduleToJson(schedule);

        expect(response).toEqual(expectedScheduleJson);
    });

    test('Should parseJsonToCav', async () => {
        const cav = mockSchedule.defaultCavJson();
        const expectedCavJson: Cav[] = [
            mockSchedule.botafogoCavObject(),
            mockSchedule.norteShoppingCavObject(),
            mockSchedule.barraDaTijucaCavObject()
        ];

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        const response = scheduleRepository.parseJsonToCav(cav);

        expect(response).toEqual(expectedCavJson);
    });

    test('Should parseJsonToSchedule', async () => {
        const expectedScheduleJson =     {
            "dates": [{
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
            }, {
                "value": "2019-07-18",
                "cavs": [{
                    "name": "Botafogo",
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
                        "11": {},
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
                        "10": {
                            "car": 2
                        },
                        "11": {},
                        "12": {},
                        "13": {},
                        "14": {
                            "car": 2
                        },
                        "15": {},
                        "16": {},
                        "17": {}
                    },
                    "inspection": {
                        "10": {},
                        "11": {},
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
                        "11": {},
                        "12": {},
                        "13": {},
                        "14": {},
                        "15": {},
                        "16": {},
                        "17": {}
                    }
                }]
            }]
        };

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();

        expect(scheduleRepository.schedule).toEqual(expectedScheduleJson);
    });

    test('Should generateProceeding with proceeding visit', async () => {
        const proceeding: any = mockSchedule.botafogoCavObject().visit;
        const cavName: string = "Botafogo";
        const carId: number = 100;
        const time: string = "12";

        const expectedProceeding = { '10': {},
            '11': { car: 1 },
            '12': { car: 100 },
            '13': {},
            '14': { car: 7 },
            '15': {},
            '16': {},
            '17': {} };

        scheduleRepository.carRepository.findById = jest.fn().mockImplementation(() => {
            return {
                "id": 100,
                "brand": "GVW",
                "model": "Up",
                "cav": "Botafogo"
            };
        });

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.generateProceeding(proceeding, cavName, carId, time);

        expect(response).toEqual(expectedProceeding);
        expect(scheduleRepository.carRepository.findById).toBeCalledTimes(1);
        expect(scheduleRepository.carRepository.findById).toBeCalledWith(100);
    });

    test('Should generateProceeding with proceeding inspection', async () => {
        const proceeding: any = mockSchedule.botafogoCavObject().inspection;
        const cavName: string = "Botafogo";
        const carId: number = 100;
        const time: string = "12";

        const expectedProceeding = {
            "10": {},
            "11": {
                "car": 7
            },
            "12": {
                "car": 100
            },
            "13": {},
            "14": {},
            "15": {},
            "16": {},
            "17": {}
        };

        scheduleRepository.carRepository.findById = jest.fn().mockImplementation(() => {
            return {
                "id": 100,
                "brand": "GVW",
                "model": "Up",
                "cav": "Botafogo"
            };
        });

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();
        const response = scheduleRepository.generateProceeding(proceeding, cavName, carId, time);

        expect(response).toEqual(expectedProceeding);
        expect(scheduleRepository.carRepository.findById).toBeCalledTimes(1);
        expect(scheduleRepository.carRepository.findById).toBeCalledWith(100);
    });

    test('Should generateProceeding throw error because "time has already been reserved by someone else"', async () => {
        const proceeding: any = mockSchedule.botafogoCavObject().visit;
        const cavName: string = "Botafogo";
        const carId: number = 100;
        const time: string = "11";

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.carRepository.findById = jest.fn().mockImplementation(() => {
            return undefined;
        });

        scheduleRepository.parseJsonToSchedule();

        expect(() => scheduleRepository.generateProceeding(proceeding, cavName, carId, time))
            .toThrowError(new Error('time has already been reserved by someone else'));

        expect(scheduleRepository.carRepository.findById).toBeCalledTimes(0);
    });

    test('Should generateProceeding throw error because "car not exist"', async () => {
        const proceeding: any = mockSchedule.botafogoCavObject().visit;
        const cavName: string = "Botafogo";
        const carId: number = 100;
        const time: string = "12";

        scheduleRepository.carRepository.findById = jest.fn().mockImplementation(() => {
            return undefined;
        });

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();

        expect(() => scheduleRepository.generateProceeding(proceeding, cavName, carId, time))
            .toThrowError(new Error('car not exist'));

        expect(scheduleRepository.carRepository.findById).toBeCalledTimes(1);
        expect(scheduleRepository.carRepository.findById).toBeCalledWith(100);
    });

    test('Should generateProceeding throw error because "time isn\'t valid"', async () => {
        const proceeding: any = mockSchedule.botafogoCavObject().visit;
        const cavName: string = "Botafogo";
        const carId: number = 100;
        const time: string = "120";

        scheduleRepository.carRepository.findById = jest.fn().mockImplementation(() => {
            return {
                "id": 100,
                "brand": "GVW",
                "model": "Up",
                "cav": "Botafogo"
            };
        });

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.parseJsonToSchedule();

        expect(() => scheduleRepository.generateProceeding(proceeding, cavName, carId, time))
            .toThrowError(new Error("time isn't valid"));

        expect(scheduleRepository.carRepository.findById).toBeCalledTimes(0);
    });

    test('Should scheduleProceeding with proceeding visit', async () => {
        const proceeding: any = 'visit';
        const cavName: string = "Botafogo";
        const requestDate: string = "2019-07-17";
        const carId: number = 1;
        const time: string = "13";

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.findDateSchedule = jest.fn().mockImplementation(() => {
            return mockSchedule.defaultDateScheduleObject();
        });

        scheduleRepository.findCav = jest.fn().mockImplementation(() => {
            return mockSchedule.botafogoCavObject();
        });

        scheduleRepository.generateProceeding = jest.fn().mockImplementation(() => {
            return mockSchedule.botafogoCavObject().visit
        });

        scheduleRepository.saveSchedule = jest.fn().mockImplementation(() => {});

        scheduleRepository.parseJsonToSchedule();

        scheduleRepository.scheduleProceeding(cavName, requestDate, time, carId, proceeding);

        expect(scheduleRepository.findDateSchedule).toBeCalledTimes(1);
        expect(scheduleRepository.findDateSchedule).toBeCalledWith(requestDate);

        expect(scheduleRepository.findCav).toBeCalledTimes(1);
        expect(scheduleRepository.findCav).toBeCalledWith(mockSchedule.defaultDateScheduleObject(), cavName);

        expect(scheduleRepository.generateProceeding).toBeCalledTimes(1);
        expect(scheduleRepository.generateProceeding).toBeCalledWith(mockSchedule.botafogoCavObject().visit, cavName, carId, time);

        expect(scheduleRepository.saveSchedule).toBeCalledTimes(1);
    });

    test('Should scheduleProceeding with proceeding inspection', async () => {
        const proceeding: any = 'inspection';
        const cavName: string = "Botafogo";
        const requestDate: string = "2019-07-17";
        const carId: number = 1;
        const time: string = "13";

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.findDateSchedule = jest.fn().mockImplementation(() => {
            return mockSchedule.defaultDateScheduleObject();
        });

        scheduleRepository.findCav = jest.fn().mockImplementation(() => {
            return mockSchedule.botafogoCavObject();
        });

        scheduleRepository.generateProceeding = jest.fn().mockImplementation(() => {
            return mockSchedule.botafogoCavObject().inspection
        });

        scheduleRepository.saveSchedule = jest.fn().mockImplementation(() => {});

        scheduleRepository.parseJsonToSchedule();

        scheduleRepository.scheduleProceeding(cavName, requestDate, time, carId, proceeding);

        expect(scheduleRepository.findDateSchedule).toBeCalledTimes(1);
        expect(scheduleRepository.findDateSchedule).toBeCalledWith(requestDate);

        expect(scheduleRepository.findCav).toBeCalledTimes(1);
        expect(scheduleRepository.findCav).toBeCalledWith(mockSchedule.defaultDateScheduleObject(), cavName);

        expect(scheduleRepository.generateProceeding).toBeCalledTimes(1);
        expect(scheduleRepository.generateProceeding).toBeCalledWith(mockSchedule.botafogoCavObject().inspection, cavName, carId, time);

        expect(scheduleRepository.saveSchedule).toBeCalledTimes(1);
    });

    test('Should scheduleProceeding throw error because "cav isn\'t valid"', async () => {
        const proceeding: any = 'visit';
        const cavName: string = "Botafogo";
        const requestDate: string = "2019-07-17";
        const carId: number = 1;
        const time: string = "12";

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.findDateSchedule = jest.fn().mockImplementation(() => {
            return mockSchedule.defaultDateScheduleObject();
        });

        scheduleRepository.findCav = jest.fn().mockImplementation(() => {
            return undefined;
        });

        scheduleRepository.parseJsonToSchedule();

        expect(() => scheduleRepository.scheduleProceeding(cavName, requestDate, time, carId, proceeding))
            .toThrowError(new Error("cav isn't valid"));

        expect(scheduleRepository.findDateSchedule).toBeCalledTimes(1);
        expect(scheduleRepository.findDateSchedule).toBeCalledWith(requestDate);
    });

    test('Should scheduleProceeding throw error because "date isn\'t valid"', async () => {
        const proceeding: any = 'visit';
        const cavName: string = "Botafogo";
        const requestDate: string = "2019-07-17";
        const carId: number = 1;
        const time: string = "12";

        scheduleRepository.buildDB = jest.fn().mockImplementation(() => {
            return JSON.parse(fs.readFileSync('./test/mock/db/calendar.json', 'utf8'));
        });

        scheduleRepository.findDateSchedule = jest.fn().mockImplementation(() => {
            return undefined;
        });

        scheduleRepository.parseJsonToSchedule();

        expect(() => scheduleRepository.scheduleProceeding(cavName, requestDate, time, carId, proceeding))
            .toThrowError(new Error("date isn't valid"));
    });
});