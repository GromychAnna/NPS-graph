    //TODO: move to factory
    var config = {
        apiKey: "AIzaSyBcuzy9X_SMg-tUOKLuNGfxYNk2gnXm-z4",
        authDomain: "nps-in-depth.firebaseapp.com",
        databaseURL: "https://nps-in-depth.firebaseio.com",
        storageBucket: "nps-in-depth.appspot.com",
        messagingSenderId: "592652465988"
    };
    firebase.initializeApp(config);
export default class StakeholdersCtrl {
    constructor(dataStorage, $firebaseObject){
        this.dataStorage = dataStorage;
        this.selectedStakeholder = {};

        //TODO: move to factory
            const rootRef = firebase.database().ref().child('nps-in-depth');//create reference to db where angular is root of DB
            const ref = rootRef.child('testObject');
            this.object = $firebaseObject(ref);//function that takes reference to DB
            console.warn('this.object', this.object);
        //angular now have property 'object'
        //in 'object' exist 'ref'
        //last two str - for sinhronising data between angular and firebase
    }

    editStakeholder (stakeholder) {
        this.selectedStakeholder = angular.copy(stakeholder);
        this.handleEditMode(stakeholder);
    }

    removeStakeholder (idx) {
        this.dataStorage.stakeholders.splice(idx, 1);
        this.dataStorage.storeData(this.dataStorage.stakeholders, 'stakeholders');
    }

    saveChanges (idx) {
        this.dataStorage.stakeholders[idx] = this.selectedStakeholder;
        this.dataStorage.storeData(this.dataStorage.stakeholders, 'stakeholders');
        this.dataStorage.stakeholders[idx].editable = false;
    }

    rejectChanges (stakeholder) {
        stakeholder.editable = false;
    }

    handleEditMode (stakeholder) {
        this.dataStorage.stakeholders.forEach(stakeholder => {
            return stakeholder.editable = false;
        });
        stakeholder.editable = !stakeholder.editable;
    }
}
