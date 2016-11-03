export default ngModule => {
    ngModule.factory('dataManipulation', dataManipulationFn);
    function dataManipulationFn () {
        return {
            placeholder: 123
        }
    };
}