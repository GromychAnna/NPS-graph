import './events-list.tpl.jade';
import StakeholdersListCtrl from './events-list.controller.js';

export default ngModule => {
  ngModule.component('stakeholdersList', {
    templateUrl: 'events-list.tpl.jade',
    controller: StakeholdersListCtrl
  });
}
