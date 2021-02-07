const GetHighestBidQuery = require('./queryHandler/GetHighestBidQuery');
const CreateBidCommand = require('./commandHandler/CreateBidCommand');
const QueryService = require('./queryHandler/QueryService');
const CommandService = require('./commandHandler/CommandService');

module.exports = {
  GetHighestBidQuery,
  CreateBidCommand,
  queryService: new QueryService(),
  commandService: new CommandService(),
};