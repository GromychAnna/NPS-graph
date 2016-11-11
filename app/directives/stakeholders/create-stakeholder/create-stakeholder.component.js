import './create-stakeholder.tpl.jade';
import StakeholderCreateCtrl from './create-stakeholder.controller';

export default ngModule => {
  ngModule.component('createStakeholder', {
    templateUrl: 'create-stakeholder.tpl.jade',
    controller: StakeholderCreateCtrl
  });
}
