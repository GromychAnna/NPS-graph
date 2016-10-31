//import styles from './contacts-table.scss'
//import jadeTpl from './contacts-table.jade'

export default ngModule => {
  ngModule.directive('contactsTable', contactsTableFn);
  require('./contacts-table.scss');
  function contactsTableFn() {
    return {
      template: require('./contacts-table.html'),
      //template: jadeTpl,
      controllerAs: 'ctrl',
      controller: require('./contacts-table-controller.js')
    }
  }
}
