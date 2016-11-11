export default ngModule => {
  require('./stakeholders/stakeholders-list/stakeholders-list.component')(ngModule);
  require('./stakeholders/create-stakeholder/create-stakeholder.component')(ngModule);
  require('./stakeholders/add-edges/add-edges.component')(ngModule);
  require('./stakeholders-graph/stakeholders-graph.directive')(ngModule);
}