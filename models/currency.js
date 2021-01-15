var mongoose = require("mongoose");

var currencySchema = new mongoose.Schema(
  {
    currency_name: { type: String }, //page name
    currency_code: { type: String }, //description of basic page
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

module.exports = mongoose.model("currency", currencySchema);
