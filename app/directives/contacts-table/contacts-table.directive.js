//import './contacts-table.style.scss'

export default ngModule => {
  //require('./contacts-table.style.scss');
  ngModule.directive('contactsTable', contactsTableFn);
  function contactsTableFn() {
    return {
      template: require('./contacts-table.template.jade'),
      controllerAs: 'ctrl',
      scope: {
        scope: '='
      },
      controller: require('./contacts-table.controller.js')
    }
  }
}
