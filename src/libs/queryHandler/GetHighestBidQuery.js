const storeService = require('../eventStore');

class GetHighestBidQuery {
  run() {
    return storeService.getHighestBidView();
  }
}

module.exports = GetHighestBidQuery;