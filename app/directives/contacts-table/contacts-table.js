import styles from './contacts-table.scss'

export default ngModule => {
  ngModule.directive('contactsTable', contactsTableFn);
  function contactsTableFn() {
    return {
      template: require('./contacts-table.html'),
      controllerAs: 'ctrl',
      controller: require('./contacts-table-controller.js')
    }
  }
}
