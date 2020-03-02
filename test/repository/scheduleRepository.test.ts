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
            "date": "2019-07-18",
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
            }
        }, {
            "date": "2019-07-18",
            "visit": {
                "10": {},
                "11": {},
                "12": {},
                "13": {},
                "14": {},
                "15": {},
                "16": {},
                "17": {}
            }
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
            "date": "2019-07-18",
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

        expect(() => scheduleRepository.findAvailableTimes(cavName, proceeding)).toThrowError(new Error('cav not exist'));;
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
});