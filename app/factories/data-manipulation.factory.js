//import Firebase from 'firebase';
//
//export default ngModule => {
//    ngModule.factory('dataManipulation', ['$firebaseArray', dataManipulationFn]);
//    function dataManipulationFn ($firebaseArray) {
//        console.log(Firebase);
//         const config = {
//            authDomain: "nps-in-depth.firebaseapp.com",
//            databaseURL: "https://console.firebase.google.com/project/nps-in-depth/database/data/nps-in-depth"
//        };
//        let fbData = firebase.initializeApp(config);
//        debugger;
//        let dataManipulationObj = $firebaseArray(fbData);
//        //let dataManipulationObj = {
//        //    peoples: [
//        //        {
//        //            "name": "node_0",
//        //            "id": "0",
//        //            "firstName": "Adele",
//        //            "lastName": "Hargarden",
//        //            "role": "Ingeneer",
//        //            "company": "SS",
//        //            "email": "Adele@gmail.com",
//        //            "phone": "+38(05)0123-4565",
//        //            "score": "25"
//        //        },
//        //        {
//        //            "name": "node_1",
//        //            "id": "1",
//        //            "firstName": "Joan",
//        //            "lastName": "Smith",
//        //            "role": "SEO",
//        //            "company": "SS",
//        //            "email": "Joan@gmail.com",
//        //            "phone": "+38(05)0123-4564",
//        //            "score": "-25"
//        //        },
//        //        {
//        //            "name": "node_2",
//        //            "id": "2",
//        //            "firstName": "Michael",
//        //            "lastName": "Bergner",
//        //            "role": "PM",
//        //            "company": "SS",
//        //            "email": "Michael@gmail.com",
//        //            "phone": "+38(05)0123-4563",
//        //            "score": "50"
//        //        },
//        //        {
//        //            "name": "node_3",
//        //            "id": "3",
//        //            "firstName": "John",
//        //            "lastName": "Smith",
//        //            "role": "Ingeneer",
//        //            "company": "SS",
//        //            "email": "John@gmail.com",
//        //            "phone": "+38(05)0123-4562",
//        //            "score": "0"
//        //        },
//        //        {
//        //            "name": "node_4",
//        //            "id": "4",
//        //            "firstName": "test5",
//        //            "lastName": "test5",
//        //            "role": "test5",
//        //            "company": "test5",
//        //            "email": "test@gmail.com",
//        //            "phone": "+38(05)0123-4561",
//        //            "score": "56"
//        //        }
//        //    ],
//        //    edges: [
//        //        //{"src": "0", "dest": "1"},
//        //        //{"src": "4", "dest": "2"},
//        //        //{"src": "3", "dest": "4"},
//        //        //{"src": "0", "dest": "4"}
//        //    ],
//        //    selected: {
//        //        "name": "null",
//        //        "id": "null",
//        //        "firstName": "null",
//        //        "lastName": "null",
//        //        "role": "null",
//        //        "company": "null",
//        //        "email": "null",
//        //        "phone": "null",
//        //        "score": "null"
//        //    }
//        //};
//        //const stakeholders = localStorage.getItem("peoples");
//        //dataManipulationObj = stakeholders ? JSON.parse(stakeholders) : dataManipulationObj;
//        return {
//            dataManipulationObj
//        }
//    };
//}
export default ngModule => {
    ngModule.factory('dataStorage',  function () {
        const KEYS_FOR_STORE = ['stakeholders', 'edges', 'events'];
        const storedStakeholders = getStoredData(KEYS_FOR_STORE[0]);
        const storedEdges = getStoredData(KEYS_FOR_STORE[1]);
        const storedEvent = getStoredData(KEYS_FOR_STORE[2]);

        let stakeholders = [
            {
                "name": "node_0",
                "id": "0",
                "firstName": "Adele",
                "lastName": "Hargarden",
                "role": "Ingeneer",
                "company": "SS",
                "email": "Adele@gmail.com",
                "phone": "+38(05)0123-4565",
                "score": "25"
            },
            {
                "name": "node_1",
                "id": "1",
                "firstName": "Joan",
                "lastName": "Smith",
                "role": "SEO",
                "company": "SS",
                "email": "Joan@gmail.com",
                "phone": "+38(05)0123-4564",
                "score": "-25"
            },
            {
                "name": "node_2",
                "id": "2",
                "firstName": "Michael",
                "lastName": "Bergner",
                "role": "PM",
                "company": "SS",
                "email": "Michael@gmail.com",
                "phone": "+38(05)0123-4563",
                "score": "50"
            },
            {
                "name": "node_3",
                "id": "3",
                "firstName": "John",
                "lastName": "Smith",
                "role": "Ingeneer",
                "company": "SS",
                "email": "John@gmail.com",
                "phone": "+38(05)0123-4562",
                "score": "0"
            },
            {
                "name": "node_4",
                "id": "4",
                "firstName": "test5",
                "lastName": "test5",
                "role": "test5",
                "company": "test5",
                "email": "test@gmail.com",
                "phone": "+38(05)0123-4561",
                "score": "56"
            }
        ];

        let edges = [
            //{"src": "0", "dest": "1"},
            //{"src": "4", "dest": "2"},
            //{"src": "3", "dest": "4"},
            //{"src": "0", "dest": "4"}
        ];
        const edgeTypes = [
            {"name": "Reports to"},
            {"name": "Peer"}
        ];

        let events = [
            {
                "date": "25.09.2016",
                "score": "10",
                "stakeholders": [
                    {"id": "0"},
                    {"id": "1"},
                    {"id": "2"}
                ]
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