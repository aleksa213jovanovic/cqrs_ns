const StoreService = require('../eventStore');
const uuid = require('node-uuid');
const {CreateBid} = require('../domainModel/events');


class CreateBidCommand {
  constructor(bid) {
    this.bid = bid;
  }

  run() {
    const id = uuid.v4();
    //napravim event
    const event = CreateBid(id, this.bid);
    const events = [event];
    //
    return StoreService.store(events)
  }
}

module.exports = CreateBidCommand;