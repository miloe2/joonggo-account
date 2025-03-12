const express = require("express");
const { getAllSales, addSale, updateSale, deleteSale } = require("../controllers/salesController");

const router = express.Router();

router.get("/", getAllSales);
router.post("/", addSale);
router.put("/", updateSale);
router.post("/delete", deleteSale);

module.exports = router;