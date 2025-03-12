const mongoose = require("mongoose");

// ✅ 게시글 스키마 정의
const salesSchema = new mongoose.Schema({
  category: { type: String, },  // 제목 (필수)
  product: { type: String, required: true },  // 제목 (필수)
  price: { type: Number }, // 가격
  address: { type: String }, // 주소
  contact: { type: String }, // 연락처
  isActive: { type: Boolean, default: true }, // 삭제 여부 (T: 미삭제, F: 삭제)
  saleDate: { type: Date, default: Date.now } // 자동 날짜 저장
});

module.exports = mongoose.model("Sales", salesSchema, "sales");
