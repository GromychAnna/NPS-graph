//import styles from './contacts-table.scss'

export default ngModule => {
  require('./contacts-table.style.scss');
  ngModule.directive('contactsTable', contactsTableFn);
  function contactsTableFn() {
    return {
      template: require('./contacts-table.template.html'),
      controllerAs: 'ctrl',
      scope: {
        scope: '='
      },
      controller: require('./contacts-table.controller.js')
    }
  }
}
