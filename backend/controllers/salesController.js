const Sales = require("../models/Sales");

// [GET] 전체 조회
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
    console.log(sales);
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
