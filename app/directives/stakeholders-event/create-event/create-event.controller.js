export default class EventCreateCtrl {
    constructor(dataStorage) {
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
            stakeholders: []
        };
    }
    createEvent () {
        let stakeholdersOnEvent = this.event.stakeholders.toString().split('},');
        for (let iterator = 0; iterator < stakeholdersOnEvent.length - 1; iterator++) {
            stakeholdersOnEvent[iterator] = stakeholdersOnEvent[iterator] + "}";
        }
        for (let iterator = 0; iterator < stakeholdersOnEvent.length; iterator++) {
            stakeholdersOnEvent[iterator] = JSON.parse(stakeholdersOnEvent[iterator]);
            console.log(stakeholdersOnEvent[iterator]);
        }
        this.event.stakeholders = stakeholdersOnEvent;
        this.dataStorage.events.push(this.event);
        this.dataStorage.storeData(this.dataStorage.events, 'events');
        this.event = this.getDefaultValue();
    }
}
