export default ngModule => {
  ngModule.directive('contactsTable', contactsTableFn);
  //require('./contacts-table.scss');
  function contactsTableFn() {
    return {
      restrict: 'AEC',
      template: require('./contacts-table.html'),
      controllerAs: 'ctrl',
      controller: require('./contacts-table-controller.js')
    }
  }
}
