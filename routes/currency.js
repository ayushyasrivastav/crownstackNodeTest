const express = require("express");
const router = express.Router();
const Currency = require("../models/currency");
const UtilityServices = require("../services/utilityServices");
router.get("/list", function (req, res) {
  return new Promise(function (resolve, reject) {
    try {
      if (req.query) {
        //conditions for filter or search
      }
      Currency.find({})
        .sort({ _id: 1 })
        .exec()
        .then((list) => {
          return UtilityServices.apiResponse(res, 200, 1, "All Currencies fetched Successfully", list);
        })
        .catch((err) => {
          return UtilityServices.apiResponse(res, 401, 0, "Error while fetching list", []);
        });
    } catch (err) {
      console.log("err", err);
    }
  });
});
router.post("/add", function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      let currencyData = req.body ? req.body : "";
      if (currencyData) {
        var saveCurrency = new Currency({
          currency_name: currencyData.currency_name ? currencyData.currency_name : "",
          currency_code: currencyData.currency_code ? currencyData.currency_code : "",
        });
        saveCurrency.save(function (err, data) {
          if (err) {
            return UtilityServices.apiResponse(res, 401, 0, "Error while saving trade Data", {});
          } else {
            return UtilityServices.apiResponse(res, 200, 1, "Currency data saved successfully", data);
          }
        });
      } else {
        res.status(401).json({
          success: false,
          msg: "Please pass data in body",
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  });
});
module.exports = router;
