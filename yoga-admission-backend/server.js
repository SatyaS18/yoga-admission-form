const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const supabase = require("./models/database");
require("dotenv").config();

const enrollmentRoutes = require("./routes/enrollmentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", enrollmentRoutes);

cron.schedule("0 0 1 * *", async () => {
  console.log("Generating monthly payments...");
  const { data: users, error } = await supabase.from("users").select("user_id");

  if (error) {
    console.error("Error fetching users:", error);
    return;
  }

  const paymentRecords = users.map((user) => ({
    user_id: user.user_id,
    amount: 500,
    payment_date: new Date(),
  }));

  const { error: paymentError } = await supabase
    .from("payments")
    .insert(paymentRecords);

  if (paymentError) {
    console.error("Error generating payments:", paymentError);
  } else {
    console.log("Monthly payments generated successfully.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
