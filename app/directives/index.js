export default ngModule => {
  require('./stakeholders/stakeholders-list/stakeholders-list.component')(ngModule);
  require('./stakeholders/create-stakeholder/create-stakeholder.component')(ngModule);
  require('./stakeholders/create-edge/create-edge.component.js')(ngModule);
  require('./stakeholders-event/events-list/events-list.component')(ngModule);
  require('./stakeholders-event/create-event/create-event.component')(ngModule);
  require('./stakeholders-graph/stakeholders-graph.directive')(ngModule);
}