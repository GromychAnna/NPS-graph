import './events-list.tpl.jade';
import EventListCtrl from './events-list.controller.js';

export default ngModule => {
  ngModule.component('eventList', {
    templateUrl: 'events-list.tpl.jade',
    controller: EventListCtrl
  });
}
