export default function ($scope, $http, dataManipulation) {
    const factoryNodes = dataManipulation.dataManipulationObj.peoples;
    const factoryEdges = dataManipulation.dataManipulationObj.edges;
    $scope.nodes =  factoryNodes;
    $scope.edges = factoryEdges;

//    var modal = document.getElementById('myModal');
//
//    var btn = document.getElementById("myBtn");
//
//    var span = document.getElementsByClassName("close")[0];
//
//// When the user clicks the button, open the modal
//    btn.onclick = function() {
//        modal.style.display = "block";
//    };
//
//// When the user clicks on <span> (x), close the modal
//    span.onclick = function() {
//        modal.style.display = "none";
//    };
//
//// When the user clicks anywhere outside of the modal, close it
//    window.onclick = function(event) {
//        if (event.target == modal) {
//            modal.style.display = "none";
//        }
//    }
}