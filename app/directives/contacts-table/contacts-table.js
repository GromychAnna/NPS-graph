import styles from './contacts-table.scss'

export default ngModule => {
  ngModule.directive('contactsTable', contactsTableFn);
  //require('style!css!./contacts-table.scss');
  function contactsTableFn() {
    return {
      template: require('./contacts-table.html'),
      //template: require('./contacts-table.jade'),
      controllerAs: 'ctrl',
      controller: require('./contacts-table-controller.js')
    }
  }
}
