const supabase = require("../models/database");

const changeBatch = async (req, res) => {
  try {
    const { email, month_year, batch_id } = req.body;

    // Get the user ID from the email
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", email)
      .single();

    if (userError || !user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Update the batch for the given month
    const { error: updateError } = await supabase
      .from("enrollments")
      .update({ batch_id })
      .eq("user_id", user.user_id)
      .eq("month_year", `${month_year}-01`); // Convert to a valid date format

    if (updateError) throw updateError;

    res.status(200).json({ message: "Batch updated successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const enrollUser = async (req, res) => {
  try {
    const { name, age, email, phone, batch_id, month_year } = req.body;

    // Default to current month if no month_year is provided
    // const currentMonth = month_year || new Date().toISOString().slice(0, 7); // Format: YYYY-MM
    const currentMonth = month_year
      ? `${month_year}-01` // Add '-01' to make it a valid date
      : new Date().toISOString().slice(0, 7) + "-01"; // YYYY-MM-DD format

    // Validate age
    if (age < 18 || age > 65) {
      return res.status(400).json({ message: "Age must be between 18 and 65" });
    }

    // Check if the email already exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", email)
      .single();

    if (existingUserError && existingUserError.code !== "PGRST116") {
      // If the error is not "No rows found," throw it
      throw existingUserError;
    }

    let userId;
    if (existingUser) {
      // Email exists, reuse the existing user_id
      userId = existingUser.user_id;
    } else {
      // Insert new user into the database
      const { data: newUser, error: newUserError } = await supabase
        .from("users")
        .insert([{ name, age, email, phone }])
        .select("user_id")
        .single();

      if (newUserError) throw newUserError;

      userId = newUser.user_id;
    }

    // Check if the user is already enrolled in the same month
    const { data: existingEnrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", userId)
      .eq("month_year", currentMonth)
      .single();

    if (existingEnrollment) {
      return res.status(400).json({
        message:
          "You are already enrolled in a batch for this month. Batch changes are not allowed.",
      });
    }

    // Insert enrollment into the database
    const { error: enrollError } = await supabase
      .from("enrollments")
      .insert([{ user_id: userId, batch_id, month_year: currentMonth }]);

    if (enrollError) throw enrollError;

    // Insert payment into the database
    const { error: paymentError } = await supabase
      .from("payments")
      .insert([{ user_id: userId, amount: 500, payment_date: new Date() }]);

    if (paymentError) throw paymentError;

    res.status(201).json({ message: "User enrolled successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { enrollUser, changeBatch };

