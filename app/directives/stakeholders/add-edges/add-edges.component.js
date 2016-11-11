import './add-edges.tpl.jade';
import AddEdgesCtrl from './add-edges.controller.js';

export default ngModule => {
  ngModule.component('addEdges', {
    templateUrl: 'add-edges.tpl.jade',
    controller: AddEdgesCtrl
  });
}
