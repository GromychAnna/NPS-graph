export default class AddEdgesCtrl {
    constructor(dataStorage){
        this.dataStorage = dataStorage;
        this.edge = this.getDefaultValue();
        this.firstStakeholder = '1st stakeholder';
        this.secondStakeholder = '2nd stakeholder';
    }

    get stakeholdersList () {
        return this.dataStorage.stakeholders;
    }

    get edgeTypes () {
        return this.dataStorage.edgeTypes;
    }

    change () {
        if(_.isEqual(this.edge.edgeType, "Reports to")) {
            this.firstStakeholder = 'Reporter';
            this.secondStakeholder = 'Manager';
        } else {
            this.firstStakeholder = '1st stakeholder';
            this.secondStakeholder = '2nd stakeholder';
        }
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
