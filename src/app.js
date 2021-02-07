const express = require('express')
const app = express();

const { GetHighestBidQuery, queryService, CreateBidCommand, commandService } = require('./libs');

app.use(express.json());

app.get('/api/v1/bids', async (req, res) => {
  const q = new GetHighestBidQuery();
  console.log("Getting highest bid");
  console.log("-----------------");
  let bid;
  try {
    bid = await queryService.runQuery(q);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
    return;
  }
  res.json(bid);
});

app.post("/api/v1/bids", async (req, res) => {
  const bid = { amount: parseFloat(req.body.number), currency: "SEK" };
  const c = new CreateBidCommand(bid);
  // We want to allow maximum throughput so we don't wait for the write to happen before returning a response.
  console.log("Placing bid", bid);
  console.log("--------------------------");
  const endView = await commandService.runCommand(c)


  res.json(endView);
});

module.exports = app;

const wait = (timeout, fn) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  })
};