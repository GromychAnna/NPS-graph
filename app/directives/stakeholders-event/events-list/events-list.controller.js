export default class EventListCtrl {
    constructor(dataStorage){
        this.dataStorage = dataStorage;

        _.forEach(this.dataStorage.events, (event) => {
            const msDate = Date.parse(event.date);

            const singledate = `${msDate}`;
            console.warn('singledate', singledate);
            const changeddate = singledate.match(/\d+/g).map(function (s) { return new Date(+s); });
            const date = new Date(changeddate);
            const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
            const day = ("0" + date.getDate()).slice(-2);
            const ddmmyyyFromateDate = [day, mnth,date.getFullYear()].join("/");
            console.warn('ddmmyyyFromateDate', ddmmyyyFromateDate);

            event.date = ddmmyyyFromateDate;
        });

    }
}
