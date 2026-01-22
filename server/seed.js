require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/user"); // 
const connectDB = require("./src/config/database"); // 
const bcrypt = require("bcryptjs"); 

// --- DATA POOLS ---

const indianLastNames = [
  "Sharma", "Verma", "Gupta", "Patel", "Singh", "Kumar", "Reddy", "Rao", 
  "Iyer", "Nair", "Mehta", "Malhotra", "Joshi", "Kapoor", "Khan", "Das", 
  "Chopra", "Desai", "Jain", "Saxena", "Tiwari", "Yadav", "Bhatia", "Agrawal"
];

const maleFirstNames = [
  "Aarav", "Vihaan", "Aditya", "Arjun", "Rohan", "Vikram", "Rahul", "Ishaan", 
  "Siddharth", "Karan", "Manish", "Rishabh", "Kabir", "Aryan", "Dhruv", "Ravi", 
  "Sanjay", "Amit", "Raj", "Kunal", "Ankit", "Harsh", "Varun", "Nikhil"
];

const femaleFirstNames = [
  "Ananya", "Diya", "Saanvi", "Priya", "Neha", "Riya", "Isha", "Kavya", 
  "Aditi", "Meera", "Sanjana", "Tanvi", "Shruti", "Pooja", "Aisha", "Zara", 
  "Kritika", "Anjali", "Nisha", "Sneha", "Radhika", "Vani", "Simran", "Deepika"
];

const allSkills = [
  "JavaScript", "React", "Node.js", "MongoDB", "Express", "Python", "Java", 
  "C++", "AWS", "Docker", "Kubernetes", "TypeScript", "Next.js", "Tailwind CSS",
  "Redux", "GraphQL", "PostgreSQL", "System Design", "Machine Learning", "Figma"
];

const aboutTemplates = [
  "Passionate developer building scalable systems.",
  "Full Stack Engineer looking for interesting projects.",
  "Coding enthusiast and open source contributor.",
  "Frontend wizard who loves pixel-perfect designs.",
  "Backend specialist focused on performance and security.",
  "Tech explorer constantly learning new stacks.",
  "Looking to connect with like-minded developers.",
  "Building the future of tech, one line of code at a time."
];

// --- HELPER FUNCTIONS ---

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomSkills = () => {
  // Pick between 3 to 7 random skills
  const shuffled = allSkills.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 5) + 3);
};

// --- MAIN SEED FUNCTION ---

const seedDatabase = async () => {
  try {
    // 1. Connect to Database
    await connectDB();
    console.log("Database Connected...");

    // 2. Clear Existing Data (Optional - Comment out if you want to keep old users)
    await User.deleteMany({});
    console.log("Old users cleared.");

    // 3. Prepare Password (Strong password to pass your validator)
    // Needs: Uppercase, Lowercase, Number, Symbol
    const passwordHash = await bcrypt.hash("Dev@1234", 10);

    const users = [];
    const TOTAL_USERS = 60; // Generating 60 profiles

    for (let i = 0; i < TOTAL_USERS; i++) {
      // 50% chance of Male/Female
      const isMale = Math.random() > 0.5;
      const gender = isMale ? "Male" : "Female";
      const firstName = isMale ? getRandomItem(maleFirstNames) : getRandomItem(femaleFirstNames);
      const lastName = getRandomItem(indianLastNames);
      
      // Ensure Email is unique by adding random number
      const emailId = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 10000)}@example.com`;
      
      // Get valid photo URL from RandomUser.me (reliable placeholder service)
      // They have IDs 1-99 for men and women
      const photoId = Math.floor(Math.random() * 90) + 1; 
      const photoURL = isMale 
        ? `https://randomuser.me/api/portraits/men/${photoId}.jpg`
        : `https://randomuser.me/api/portraits/women/${photoId}.jpg`;

      users.push({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        age: Math.floor(Math.random() * (35 - 21) + 21), // Age between 21 and 35
        gender,
        skills: getRandomSkills(),
        about: getRandomItem(aboutTemplates),
        photoURL,
      });
    }

    // 4. Insert All Users
    await User.insertMany(users);
    console.log(`Successfully seeded ${users.length} Indian profiles!`);

  } catch (err) {
    console.error("Seeding failed:", err.message);
  } finally {
    mongoose.connection.close();
    console.log(" Connection Closed.");
  }
};

seedDatabase();