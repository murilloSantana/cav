import Repository from "./repository";


export default class Controller {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    findAll() {
        return this.repository.findAll();
    }
}