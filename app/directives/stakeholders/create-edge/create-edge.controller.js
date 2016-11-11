export default class AddEdgesCtrl {
    constructor(dataStorage){
        this.dataStorage = dataStorage;
        this.edge = this.getDefaultValue();
        //this.edgeTypes = this.edgeTypes;
    }

    get stakeholdersList () {
        return this.dataStorage.stakeholders;
    }

    get edgeTypes () {
        return this.dataStorage.edgeTypes;
    }

    getDefaultValue () {
        return {
            src: null,
            dest: null,
            edgeType: ''
        }
    }

    addEdge () {
        this.dataStorage.edges.push(this.edge);
        this.dataStorage.storeData(this.dataStorage.edges, 'edges');
        this.edge = this.getDefaultValue();
    }
}
