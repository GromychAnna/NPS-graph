import peoples from './peoples.json'
export default function ($scope, $http) {
    this.model = peoples;
    //this.model = $http.get('/peoples.json')
    //    .then(function(res){
    //        $scope.peoples = res.data;
    //    });
    console.warn('this.model.peoples', this.model.peoples);

    this.addRow = function(){
        //console.warn('this.model.peoples.firstName', _.isEmpty(this.model.peoples.firstName));
        const newId = this.model.peoples.length + 1;

        console.warn('this.model.peoples', this.model.peoples);
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
        console.warn('this.model.peoples', this.model.peoples);
        this.model.peoples.firstName='';
        this.model.peoples.lastName='';
        this.model.peoples.role='';
        this.model.peoples.company='';
        this.model.peoples.email='';
        this.model.peoples.phone='';
        this.model.peoples.score='';
    };
    this.addEdge = function(){
        this.model.edges.push({
            "src": this.model.edges.src,
            "dest": this.model.edges.dest
        });
        console.warn('this.model.edges', this.model.edges);
        this.model.edges.src = '';
        this.model.edges.dest = '';
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
    };
    this.getTemplate = function (person) {
        if (person.id === this.model.selected.id) {
            return 'edit'
        }
        return 'display';
    };
    this.editPerson = function (person) {
        console.warn('this.model.selected', this.model.selected);
        this.model.selected = angular.copy(person);
    };

    this.savePerson = function (idx) {
        console.warn("Saving contact");
        this.model.peoples[idx] = angular.copy(this.model.selected);
        this.reset();
    };

    this.reset = function () {
        this.model.selected = {};
    };
}