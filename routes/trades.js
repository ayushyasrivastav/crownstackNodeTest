const express = require("express");
const router = express.Router();
const Trade = require("../models/trades");
import { apiResponse } from "../services/utilityServices";
const TRADE_BUY = "buy";
const TRADE_SELL = "sell";
router.get("/trades", function (req, res) {
  return new Promise(function (resolve, reject) {
    try {
      if (req.query) {
        var type = req.query.type ? req.query.type : "";
        var user_id = req.query.user_id ? req.query.user_id : "";

        if (type) {
          where["type"] = type;
        }
        if (user_id) {
          where["user_id"] = user_id;
        }
      }
      Trade.find(where)
        .collation({ locale: "en" })
        .sort({ id: 1 })
        .exec()
        .then((list) => {
          return apiResponse(res, 200, 1, "All Trades fetched Successfully", list);
        })
        .catch((err) => {
          return apiResponse(res, 401, 0, "Error while fetching list", []);
        });
    } catch (err) {
      console.log("err", err);
    }
  });
});
router.get("/trades/:id", function (req, res) {
  return new Promise(function (resolve, reject) {
    try {
      if (req.params) {
        var tradeId = req.params.id ? req.params.id : "";
      }
      var where = {
        id: tradeId,
      };
      Trade.findOne(where)
        .exec()
        .then((docs) => {
          return apiResponse(res, 200, 1, "Trades fetched Successfully", docs);
        })
        .catch((err) => {
          console.log("err", err);
          return apiResponse(res, 401, 0, "Error find while fetching trades", {});
        });
    } catch (err) {
      console.log("err", err);
    }
  });
});
router.post("/trades", function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      let tradeData = req.body ? req.body : "";
      if (tradeData) {
        if (tradeData.type !== TRADE_BUY || tradeData.type !== TRADE_SELL) {
          return apiResponse(res, 400, 0, "Please pass a valid trade type", {});
        } else if (tradeData.shares < 1 || tradeData.shares > 100) {
          return apiResponse(res, 400, 0, "Please pass shares in valid range", {});
        } else {
          var tradeId = await tradeCount({});
          var saveTrade = new Trade({
            id: tradeId,
            type: tradeData.type ? tradeData.type : "",
            user_id: tradeData.user_id ? tradeData.user_id : "",
            symbol: tradeData.symbol ? tradeData.symbol : "",
            shares: tradeData.shares ? tradeData.shares : null,
            price: tradeData.price ? tradeData.price : "",
            timestamp: tradeData.timestamp ? tradeData.timestamp : "",
          });
          saveTrade.save(function (err, data) {
            if (err) {
              return apiResponse(res, 401, 0, "Error while saving trade Data", {});
            }else{
                return apiResponse(res, 200, 1, "Trade data saved successfully", data);
            }
          });
        }
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
router.delete("/trades/:id", function (req, res) {
  return new Promise(function (resolve, reject) {
    try {
      return apiResponse(res, 405, 0, "API does not allowing deleting or modifying trades for any id value", {});
    } catch (err) {
      console.log("err", err);
    }
  });
});
router.put("/trades/:id", function (req, res) {
  return new Promise(function (resolve, reject) {
    try {
      return apiResponse(res, 405, 0, "API does not allowing deleting or modifying trades for any id value", {});
    } catch (err) {
      console.log("err", err);
    }
  });
});
router.patch("/trades/:id", function (req, res) {
  return new Promise(function (resolve, reject) {
    try {
      return apiResponse(res, 405, 0, "API does not allowing deleting or modifying trades for any id value", {});
    } catch (err) {
      console.log("err", err);
    }
  });
});
function tradeCount(where) {
  return new Promise(function (resolve, reject) {
    Trade.find(where)
      .count()
      .exec()
      .then((tCount) => {
        resolve(tCount);
      })
      .catch((e) => {
        reject(new Error(e));
      });
  });
}
module.exports = router;
