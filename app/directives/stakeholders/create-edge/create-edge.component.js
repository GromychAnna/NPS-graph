import './create-edge.tpl.jade';
import AddEdgesCtrl from './create-edge.controller.js';

export default ngModule => {
  ngModule.component('addEdges', {
    templateUrl: 'create-edge.tpl.jade',
    controller: AddEdgesCtrl
  });
}
