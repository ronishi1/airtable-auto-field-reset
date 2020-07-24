var Airtable = require('airtable');
const config = require("./config.json");
var base = new Airtable({apiKey: config["apiKey"]}).base(config["baseURL"]);

config["tables"].forEach((table) => {
  // console.log(table["name"]);
  base(table["name"]).select({
    pageSize:10,
  }).eachPage(function page(records, fetchNextPage){
    var updateArr = [];
    var updateObj = {};
    records.forEach(function(record){
      updateObj = {};
      updateObj["id"] = record["id"];
      updateObj["fields"] = table["fields"];
      updateArr.push(updateObj);
      // console.log(updateObj["fields"]);
    });
    // console.log(updateArr);
    // console.log(table["name"]);
    base(table["name"]).update(updateArr, (error) => {
        // results have been updated
        // console.log("Update complete");
        console.log(error);
        fetchNextPage(); // gets the next block
      });

    fetchNextPage();

  },function done(err) {
    console.log("done");
      if (err) { console.error(err); return; }
  });
});
