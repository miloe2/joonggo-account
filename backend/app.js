require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db"); // ✅ MongoDB 연결 설정 가져오기
const salesRoutes = require("./routes/salesRoutes");
const app = express();

// Middleware 설정
app.use(express.json());
app.use(cors({ origin: '*' }));

connectDB();

// ✅ API 라우트 설정
app.use("/api/sales", salesRoutes);

app.get('/', (req, res) => {
  res.send('하이');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});