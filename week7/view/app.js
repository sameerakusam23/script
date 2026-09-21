const express = require("express");

const app = express();
const PORT = 3000;

// Set EJS as template engine
app.set("view engine", "ejs");

// Read form data
app.use(express.urlencoded({ extended: true }));

// Serve CSS/static files
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
    res.render("index", {
        title: "Student Registration",
        message: "Welcome to the Student Registration Page",
        errors: [],
        oldData: {}
    });
});

// Form submission
app.post("/register", (req, res) => {

    const { name, email, age } = req.body;

    let errors = [];

    // Name validation
    if (!name || name.trim() === "") {
        errors.push("Name is required.");
    }

    // Email validation
    if (!email || email.trim() === "") {
        errors.push("Email is required.");
    } else if (!email.includes("@")) {
        errors.push("Enter a valid email address.");
    }

    // Age validation
    if (!age || Number(age) < 18) {
        errors.push("Age must be 18 or above.");
    }

    // If there are errors
    if (errors.length > 0) {
        return res.render("index", {
            title: "Student Registration",
            message: "Please correct the following errors:",
            errors: errors,
            oldData: req.body
        });
    }

    // Successful registration
    res.render("result", {
        title: "Registration Successful",
        name: name,
        email: email,
        age: age
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
