export default function ($scope) {
    $scope.peoples = [
        {
            'firstName': 'Adele',
            'lastName': 'Hargarden',
            'role': 'Ingeneer',
            'company': 'SS',
            'e-mail': 'Adele@gmail.com',
            'phone': '0501234569',
            'score': '25'
        },
        {
            'firstName': 'John',
            'lastName': 'Smith',
            'role': 'SEO',
            'company': 'SS',
            'e-mail': 'John@gmail.com',
            'phone': '0501234569',
            'score': '-25'
        },
        {
            'firstName': 'Michael',
            'lastName': 'Bergner',
            'role': 'PM',
            'company': 'SS',
            'e-mail': 'Michael@gmail.com',
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

    console.warn('this', this);
    console.warn('$scope.peoples', $scope.peoples);
    this.greeting = 'Hello Webpack';
    this.peoples = $scope.peoples;
    console.warn('this.peoples', this.peoples);

    $scope.addRow = function(){
        $scope.peoples.push({
            'firstName':$scope.firstName,
            'lastName': $scope.lastName,
            'role':$scope.role,
            'company':$scope.company,
            'email':$scope.email,
            'phone':$scope.phone,
            'score':$scope.score });
        $scope.firstName='';
        $scope.lastName='';
        $scope.role='';
        $scope.company='';
        $scope.email='';
        $scope.phone='';
        $scope.score='';
    };
    $scope.removeRow = function(firstName){
        let index = -1;
        let comArr = eval( $scope.peoples );
        for( let i = 0; i < comArr.length; i++ ) {
            if( comArr[i].firstName === firstName ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        $scope.peoples.splice( index, 1 );
    };
}