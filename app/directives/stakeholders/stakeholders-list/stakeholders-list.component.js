import './stakeholders-list.tpl.jade';
import StakeholdersListCtrl from './stakeholders-list.controller';

export default ngModule => {
  ngModule.component('stakeholdersList', {
    templateUrl: 'stakeholders-list.tpl.jade',
    controller: StakeholdersListCtrl
  });
}
