export default function ($scope) {
    this.model = {
        peoples: [
            {
                'firstName': 'Adele',
                'lastName': 'Hargarden',
                'role': 'Ingeneer',
                'company': 'SS',
                'email': 'Adele@gmail.com',
                'phone': '0501234569',
                'score': '25'
            },
            {
                'firstName': 'John',
                'lastName': 'Smith',
                'role': 'SEO',
                'company': 'SS',
                'email': 'John@gmail.com',
                'phone': '0501234569',
                'score': '-25'
            },
            {
                'firstName': 'Michael',
                'lastName': 'Bergner',
                'role': 'PM',
                'company': 'SS',
                'email': 'Michael@gmail.com',
                'phone': '0501234569',
                'score': '50'
            },
            {
                'firstName': 'John',
                'lastName': 'Smith',
                'role': 'Ingeneer',
                'company': 'SS',
                'email': 'John@gmail.com',
                'phone': '0501234569',
                'score': '0'
            }
        ],
        selected: {}
    };

    console.warn('this.peoples', this.peoples);
    console.warn('this.model.peoples', this.model.peoples);

    this.addRow = function(){
        this.model.peoples.push({
            'firstName':this.firstName,
            'lastName': this.lastName,
            'role':this.role,
            'company':this.company,
            'email':this.email,
            'phone':this.phone,
            'score':this.score });
        this.firstName='';
        this.lastName='';
        this.role='';
        this.company='';
        this.email='';
        this.phone='';
        this.score='';
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
        if (person.firstName === this.model.selected.firstName && person.lastName === this.model.selected.lastName ) return 'edit';
        return 'display';
    };
    this.editPerson = function (person) {
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