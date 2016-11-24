export default ngModule => {
    ngModule.factory('dataStorage',  function () {
        const KEYS_FOR_STORE = ['stakeholders', 'edges', 'events'];
        const storedStakeholders = getStoredData(KEYS_FOR_STORE[0]);
        const storedEdges = getStoredData(KEYS_FOR_STORE[1]);
        const storedEvent = getStoredData(KEYS_FOR_STORE[2]);

        const edgeTypes = [
            {"name": "Reports to"},
            {"name": "Peer"}
        ];

        return {
            stakeholders: storedStakeholders ? JSON.parse(storedStakeholders) : stakeholders,
            edges: storedEdges ?  JSON.parse(storedEdges) : edges,
            events: storedEvent ?  JSON.parse(storedEvent) : events,
            edgeTypes,
            getStoredData,
            storeData
        };

        function getStoredData (key) {
            return localStorage.getItem(key);
        }

        function storeData (data, key) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    });
}