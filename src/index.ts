import Repository from "./cav/repository";

const repository = new Repository();
console.log(repository.findAll())








// const _ = require('lodash')
// const agendaJson = require('../agenda')
// const fs = require('fs');

// const novaData = () => {
//     return {
//         "2019-07-21": {
//             "cav": {
//                 "Botafogo": {
//                     "visit": {
//                         "10": {},
//                         "11": {
//                             "car": 1
//                         },
//                         "12": {},
//                         "13": {},
//                         "14": {
//                             "car": 7
//                         },
//                         "15": {},
//                         "16": {},
//                         "17": {}
//                     },
//                     "inspection": {
//                         "10": {},
//                         "11": {
//                             "car": 7
//                         },
//                         "12": {},
//                         "13": {},
//                         "14": {},
//                         "15": {},
//                         "16": {},
//                         "17": {}
//                     }
//                 },
//                 "Norte Shopping": {
//                     "visit": {
//                         "10": {},
//                         "11": {},
//                         "12": {},
//                         "13": {},
//                         "14": {},
//                         "15": {},
//                         "16": {},
//                         "17": {}
//                     },
//                     "inspection": {
//                         "10": {},
//                         "11": {
//                             "car": 2
//                         },
//                         "12": {},
//                         "13": {},
//                         "14": {},
//                         "15": {},
//                         "16": {},
//                         "17": {}
//                     }
//                 },
//                 "Barra da Tijuca": {
//                     "visit": {
//                         "10": {},
//                         "11": {
//                             "car": 3
//                         },
//                         "12": {},
//                         "13": {},
//                         "14": {},
//                         "15": {},
//                         "16": {},
//                         "17": {}
//                     },
//                     "inspection": {
//                         "10": {
//                             "car": 3
//                         },
//                         "11": {
//                             "car": 4
//                         },
//                         "12": {
//                             "car": 5
//                         },
//                         "13": {},
//                         "14": {},
//                         "15": {},
//                         "16": {},
//                         "17": {}
//                     }
//                 }
//             }
//         }
//     }
// }
//
//
// const agenda = Object.assign({}, _.merge(agendaJson));
// // console.log(JSON.stringify(agenda.date))
// // console.log(JSON.stringify(_.toPairs(agenda.date).length))
//
// fs.writeFileSync('../newAgenda.json', JSON.stringify(_.merge(agenda.date, novaData())));
