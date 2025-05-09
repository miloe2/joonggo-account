const Sales = require("../models/Sales");

const cache = {};

// [GET] 데이터 조회
exports.getSales = async (req, res) => {
  try {
    const filter = {};
    const { category, year, month } = req.query;

    if (category) filter.category = category;

    if (year && month) {
      const numericYear = (year);
      const numericMonth = (month);
      const startDate = new Date(numericYear, numericMonth - 1, 1);
      const endDate = new Date(numericYear, numericMonth, 1);
      filter.saleDate = { $gte: startDate, $lt: endDate };
    }
    console.log(filter);
    const sales = await Sales.find(filter).sort({ "saleDate": 1 });
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// [POST] 새로운 Sales 데이터 추가
exports.addSale = async (req, res) => {
  try {
    const { category, product, price, address, contact, saleDate } = req.body;

    // 새로운 Sales 문서 생성
    const newSale = new Sales({
      category,
      product,
      price,
      address,
      saleDate,
      contact,
    });

    await newSale.save(); // MongoDB에 저장
    res.status(201).json(newSale); // 생성된 데이터 반환
    console.log('check', newSale)
    return res;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// [PUT] Sale 데이터 수정
exports.updateSale = async (req, res) => {
  try {
    const { id, category, product, price, address, contact, saleDate } = req.body; // ✅ 수정할 필드들

    console.log(req.body)
    if (!id) {
      return res.status(400).json({ error: "ID는 필수입니다." });
    }

    const existingSale = await Sales.findById(id);
    if (!existingSale) {
      return res.status(404).json({ error: "해당 제품을 찾을 수 없습니다." });
    }

    // ✅ 필드별 업데이트 (전송된 필드만 업데이트)
    if (category !== undefined) existingSale.category = category;
    if (product !== undefined) existingSale.product = product;
    if (price !== undefined) existingSale.price = price;
    if (address !== undefined) existingSale.address = address;
    if (saleDate !== undefined) existingSale.saleDate = saleDate;
    if (contact !== undefined) existingSale.contact = contact;
    console.log('필드 업데이트 된 값: ', existingSale)

    // ✅ 업데이트된 데이터를 저장
    const updatedSale = await existingSale.save();

    res.status(200).json({
      message: "상품 정보가 성공적으로 수정되었습니다.",
      updatedSale,
    });
    return res;

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// [POST] Sale 데이터 삭제
exports.deleteSale = async (req, res) => {
  try {
    const { id } = req.body; // ✅ 수정할 필드들

    if (!id) {
      return res.status(400).json({ error: "ID는 필수입니다." });
    }

    const existingSale = await Sales.findById(id);
    console.log('찾은 ID : ', existingSale)
    if (!existingSale) {
      return res.status(404).json({ error: "해당 제품을 찾을 수 없습니다." });
    }

    // ✅ 필드별 업데이트 (전송된 필드만 업데이트)
    existingSale.isActive = false;

    // ✅ 업데이트된 데이터를 저장
    const updatedSale = await existingSale.save();

    res.status(200).json({
      message: "상품 정보가 성공적으로 삭제되었습니다.",
      updatedSale,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getMonthlyCategorySummary = async (req, res) => {
  if (cache.total) {
    console.log('cache 데이터로 드립니다. ', cache.total)
    return res.status(200).json(cache.total); // ✅ 캐시 반환
  }

  try {
    const result = await Sales.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$saleDate" },
            month: { $month: "$saleDate" },
            category: "$category"
          },
          total: { $sum: "$price" }
        }
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month"
          },
          categories: {
            $push: {
              category: "$_id.category",
              total: "$total"
            }
          },
          // "매출", "매입", "지출"을 개별로 분리해 계산할 준비
          sales: {
            $sum: {
              $cond: [{ $eq: ["$_id.category", "매출"] }, "$total", 0]
            }
          },
          purchase: {
            $sum: {
              $cond: [{ $eq: ["$_id.category", "매입"] }, "$total", 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$_id.category", "지출"] }, "$total", 0]
            }
          }
        }
      },
      {
        $addFields: {
          net: {
            $subtract: [
              "$sales",
              { $add: ["$purchase", "$expense"] }
            ]
          }
        }
      },
      {
        $addFields: {
          categories: {
            $concatArrays: [
              "$categories",
              [{ category: "계", total: "$net" }]
            ]
          }
        }
      },
      {
        $project: {
          sales: 0,
          purchase: 0,
          expense: 0,
          net: 0
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);
    cache.total = result;
    setTimeout(() => delete cache.total, 10 * 1000); // 10초 후 캐시 삭제

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
