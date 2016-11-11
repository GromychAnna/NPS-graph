export default class StakeholdersCtrl {
    constructor(dataStorage){
        this.dataStorage = dataStorage;
        this.selectedStakeholder = {};
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
