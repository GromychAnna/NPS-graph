export default function ($scope) {
    this.peoples = [
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
    ];

    //this.greeting = 'Hello Webpack';
    console.warn('this.peoples', this.peoples);

    this.addRow = function(){
        this.peoples.push({
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
        let comArr = eval( this.peoples );
        for( let i = 0; i < comArr.length; i++ ) {
            if( comArr[i].firstName === firstName ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        this.peoples.splice( index, 1 );
    };
}