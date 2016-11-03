export default ngModule => {
  require('./contacts-table/contacts-table.js')(ngModule);//подтягиваем диррективу hello-world.js и нашу переменную с html ngModule
  require('./stakeholders-graph/stakeholders-graph.js')(ngModule);
}