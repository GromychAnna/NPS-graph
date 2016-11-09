export default function ($scope, $http, dataManipulation) {
    const factoryNodes = dataManipulation.dataManipulationObj.peoples;
    const factoryEdges = dataManipulation.dataManipulationObj.edges;
    $scope.nodes =  factoryNodes;
    $scope.edges = factoryEdges;
}