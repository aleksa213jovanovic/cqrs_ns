const BidViewModel = require("./BidViewModel");
const { BidEventModel } = require("../domainModel/events");

class storeService {

  constructor(reducers) {
    this.reducers = reducers;
  }

  async store(events) {
    for (const event of events) {

      await BidEventModel({ eventData: event }).save();

      //proveravam da li vec postoji takav event
      const viewInDb = await BidViewModel.findOne({ id: event.id });

      //ako postoji viewInDb znaci radim update
      if (viewInDb) {
        const acc = {
          id: viewInDb.id,
          amount: viewInDb.amount,
          currency: viewInDb.currency,
          createdAt: viewInDb.createdAt,
        };
        //pronadjem ga apdejtujem ga
        const view = this.reducers.reduce((view, reducer) => reducer(event, view), acc);
        viewInDb.id = view.id;
        viewInDb.amount = view.amount;
        viewInDb.currency = view.currency;
        viewInDb.createdAt = view.createdAt;

        //i sacuvam ga
        await viewInDb.save();
        //ako ne postoji viewInDb u bazi znaci pravim novi
      } else {
        const view = this.reducers.reduce((view, reducer) => reducer(event, view), {});
        await new BidViewModel(view).save();

      }
    }

    const lastEvent = events[events.length - 1]
    const endView = await BidViewModel.findOne({ id: lastEvent.id });

    return endView;
  }

  getHighestBidView() {
    return BidViewModel.findOne({}).sort({ "ammount": "desc" });
  }
}

module.exports = storeService;