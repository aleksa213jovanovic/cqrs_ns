const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BidEventSchema = new Schema({
  eventData: Object,
  createdAt: {type: Date, default: Date.now}
});

module.exports.BidEventModel = mongoose.model("BidEvent", BidEventSchema);

const eventTypes = {
  createBid: "CreateBid"
};

module.exports.eventTypes = eventTypes;

module.exports.CreateBid = (id, bid) => {
  return {
    type: eventTypes.createBid,
    id,
    amount: bid.amount,
    currency: bid.currency,
  }
}
