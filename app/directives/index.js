export default ngModule => {
  require('./stakeholders/list/stakeholders-list.component')(ngModule);
  require('./stakeholders/create/create-stakeholder.component')(ngModule);
  require('./stakeholders/add-edges/add-edges.component')(ngModule);
  require('./stakeholders-graph/stakeholders-graph.directive')(ngModule);
}