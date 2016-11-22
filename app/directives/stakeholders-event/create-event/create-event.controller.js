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
        const eventScore = this.event.score;
        for (let iterator = 0; iterator < stakeholdersOnEvent.length - 1; iterator++) {
            stakeholdersOnEvent[iterator] = stakeholdersOnEvent[iterator] + "}";
        }
        for (let iterator = 0; iterator < stakeholdersOnEvent.length; iterator++) {
            stakeholdersOnEvent[iterator] = JSON.parse(stakeholdersOnEvent[iterator]);
            const currentStakeholder = _.find(this.dataStorage.stakeholders, function(o) { return o.id === stakeholdersOnEvent[iterator].id; });
            currentStakeholder.score = parseInt(currentStakeholder.score) + parseInt(eventScore);
        }
        this.event.stakeholders = stakeholdersOnEvent;
        this.dataStorage.events.push(this.event);
        this.dataStorage.storeData(this.dataStorage.events, 'events');
        this.dataStorage.storeData(this.dataStorage.stakeholders, 'stakeholders');
        this.event = this.getDefaultValue();
    }
}
