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

        let edges = [
            {
                "src": "0",
                "dest": "4",
                "edgeType": "peer"
            }
        ];

        let events = [
            {
                "date":"2017-06-28T10:37:53.605Z",
                "score":"-20",
                "stakeholders":[
                    {
                        "name":"node_3",
                        "id":"3",
                        "firstName":"John",
                        "lastName":"Smith",
                        "role":"Ingeneer",
                        "company":"SS",
                        "email":"John@gmail.com",
                        "phone":"+38(05)0123-4562",
                        "score":10,
                        "$$hashKey":"object:76"
                    },
                    {
                        "name":"node_4",
                        "id":"4",
                        "firstName":"test5",
                        "lastName":"test5",
                        "role":"test5",
                        "company":"test5",
                        "email":"test@gmail.com",
                        "phone":"+38(05)0123-4561",
                        "score":56,
                        "$$hashKey":"object:77"
                    }
                ]
            }
        ];

        let stakeholders = [
            {
                "name":"node_0",
                "id":"0",
                "firstName":"Adele",
                "lastName":"Hargarden",
                "role":"Ingeneer",
                "company":"SS",
                "email":"Adele@gmail.com",
                "phone":"+38(05)0123-4565",
                "score":"25",
                "$$hashKey":"object:73"
            },
            {
                "name":"node_1",
                "id":"1",
                "firstName":"Joan",
                "lastName":"Smith",
                "role":"SEO",
                "company":"SS",
                "email":"Joan@gmail.com",
                "phone":"+38(05)0123-4564",
                "score":-25,
                "$$hashKey":"object:74"
            },
            {
                "name":"node_2",
                "id":"2",
                "firstName":"Michael",
                "lastName":"Bergner",
                "role":"PM",
                "company":"SS",
                "email":"Michael@gmail.com",
                "phone":"+38(05)0123-4563",
                "score":60,
                "$$hashKey":"object:75"
            },
            {
                "name":"node_3",
                "id":"3",
                "firstName":"John",
                "lastName":"Smith",
                "role":"Ingeneer",
                "company":"SS",
                "email":"John@gmail.com",
                "phone":"+38(05)0123-4562",
                "score":10,
                "$$hashKey":"object:76"
            },
            {
                "name":"node_4",
                "id":"4",
                "firstName":"test5",
                "lastName":"test5",
                "role":"test5",
                "company":"test5",
                "email":"test@gmail.com",
                "phone":"+38(05)0123-4561",
                "score":56,
                "$$hashKey":"object:77"
            }
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