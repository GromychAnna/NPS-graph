export default function ($scope, $http, dataManipulation) {

    const factoryData = dataManipulation.dataManipulationObj;
    this.model = factoryData;//если localStorage

    this.addRow = function(){
        const newId = this.model.peoples.length;

        this.model.peoples.push({
            "name": "node" + "_" + newId,
            "id": newId,
            "firstName": this.model.peoples.firstName,
            "lastName": this.model.peoples.lastName,
            "role": this.model.peoples.role,
            "company": this.model.peoples.company,
            "email": this.model.peoples.email,
            "phone": this.model.peoples.phone,
            "score": this.model.peoples.score });
        this.model.peoples.firstName='';
        this.model.peoples.lastName='';
        this.model.peoples.role='';
        this.model.peoples.company='';
        this.model.peoples.email='';
        this.model.peoples.phone='';
        this.model.peoples.score='';
        localStorage.setItem('peoples', JSON.stringify(this.model));
    };

    this.addEdge = function(){
        this.model.edges.push({
            "src": this.model.edges.src,
            "dest": this.model.edges.dest
        });
        console.warn('this.model.edges', this.model.edges);
        this.model.edges.src = '';
        this.model.edges.dest = '';
        localStorage.setItem('peoples', JSON.stringify(this.model));
    };

    this.removeRow = function(firstName){
        let index = -1;
        let comArr = eval( this.model.peoples );
        for( let i = 0; i < comArr.length; i++ ) {
            if( comArr[i].firstName === firstName ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        this.model.peoples.splice( index, 1 );
        localStorage.setItem('peoples', JSON.stringify(this.model));
    };

    this.getTemplate = function (person) {
        if (person.id === this.model.selected.id) {
            return 'edit'
        }
        return 'display';
    };

    this.editPerson = function (person) {
        this.model.selected = angular.copy(person);
    };

    this.savePerson = function (idx) {
        this.model.peoples[idx] = angular.copy(this.model.selected);
        this.reset();
        localStorage.setItem('peoples', JSON.stringify(this.model));
    };

    this.reset = function () {
        this.model.selected = {};
    };
}