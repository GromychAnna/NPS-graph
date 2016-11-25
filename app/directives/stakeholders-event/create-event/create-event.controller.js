export default class EventCreateCtrl {
    constructor(dataStorage) {
        this.dataStorage = dataStorage;
        this.event = this.getDefaultValue();
    }

    get stakeholdersList () {
        return this.dataStorage.stakeholders;
    }

    getDefaultValue () {
        const currentDate = document.getElementById("date").valueAsDate = new Date();

        return {
            date: currentDate,
            score: 0,
            stakeholders: []
        };
    }


    updateStakeholdersScore (stakeholdersOnEvent, eventScore, dataStorageStakeholders) {//populate score for eavh stakeholder
        for (let iterator = 0; iterator < stakeholdersOnEvent.length - 1; iterator++) {//parse str with stakeholders on event to object of stakeholders
            stakeholdersOnEvent[iterator] = stakeholdersOnEvent[iterator] + "}";
        }
        for (let iterator = 0; iterator < stakeholdersOnEvent.length; iterator++) {//find stakeholder on event in stakeholders dictionary and change all data for stakeholders (with new score)
            stakeholdersOnEvent[iterator] = JSON.parse(stakeholdersOnEvent[iterator]);
            const currentStakeholder = _.find(dataStorageStakeholders, function(o) { return o.id === stakeholdersOnEvent[iterator].id; });
            currentStakeholder.score = parseInt(currentStakeholder.score) + parseInt(eventScore);
        }
        return stakeholdersOnEvent;
    }

    dateFormat (eventDate) {
        const msDate = Date.parse(eventDate);//formatting date
        const singledate = `${msDate}`;
        console.warn('singledate', singledate);
        const changeddate = singledate.match(/\d+/g).map(function (s) { return new Date(+s); });
        const date = new Date(changeddate);
        const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const ddmmyyyFromateDate = [mnth, day,date.getFullYear()].join("/");
        console.warn('ddmmyyyFromateDate', ddmmyyyFromateDate);
        return ddmmyyyFromateDate;
    }

    createEvent () {
        let stakeholdersOnEvent = this.event.stakeholders.toString().split('},');
        const eventScore = this.event.score;
        this.event.stakeholders = this.updateStakeholdersScore(stakeholdersOnEvent, eventScore, this.dataStorage.stakeholders);
        this.event.date = this.dateFormat(this.event.date);
        this.dataStorage.events.push(this.event);
        this.dataStorage.storeData(this.dataStorage.events, 'events');
        this.dataStorage.storeData(this.dataStorage.stakeholders, 'stakeholders');
        this.event = this.getDefaultValue();
    }

}
