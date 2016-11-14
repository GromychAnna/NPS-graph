export default class EventCreateCtrl {
    constructor(dataStorage){
        this.dataStorage = dataStorage;
        this.event = this.getDefaultValue();
    }

    get stakeholdersList () {
        return this.dataStorage.stakeholders;
    }

    getDefaultValue () {
        return {
            date: '18.11.2016',
            score: 0,
            stakeholders: [
                {id: ''}
            ]
        };
    }
    createEvent () {
        this.dataStorage.events.push(this.event);
        this.dataStorage.storeData(this.dataStorage.events, 'events');
        this.stakeholder = this.getDefaultValue();
    }
}
