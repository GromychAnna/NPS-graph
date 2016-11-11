import './create-event.tpl.jade';
import EventCreateCtrl from './create-event.controller.js';

export default ngModule => {
  ngModule.component('createEvent', {
    templateUrl: 'create-event.tpl.jade',
    controller: EventCreateCtrl
  });
}
