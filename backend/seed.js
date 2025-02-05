const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Blog = require("./models/Blog");
const Team = require("./models/Team");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "blogDB" });
    console.log("Database connected!");

    await Team.deleteMany({});
    console.log("Existing team members deleted.");

    const teamMembers = await Team.insertMany([
      {
        name: "M. Akhtar",
        role: "Frontend Developer",
        description: "Expert in React, TailwindCSS, and JavaScript.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSC7kc04pO7In5R24jli1MfLvxOZoulAVFxw&s",
      },
      {
        name: "Zainab Fatima",
        role: "Backend Developer",
        description: "Specializes in Node.js, Express, and MongoDB.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK573Dgbxr_-a51HqF7Vc6nw5_-SqA_deDNg&s",
      },
      {
        name: "Naheed Ali",
        role: "UI/UX Designer",
        description: "Focused on crafting seamless user experiences.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSraexGEwVj3E9yEZU1MAbKD1lqAjkohVCEcQ&s",
      },
    ]);
    console.log("Team members seeded successfully!");

    
    const teamIds = teamMembers.map((member) => member._id);

    await Blog.deleteMany({});
    console.log("Existing blogs deleted.");

    const blogs = [
      {
        title: "Exploring React",
        summary: "A deep dive into React hooks and their use cases.",
        content: "React hooks, introduced in version 16.8, provide developers with...",
        category: "React",
        date: "2025-01-10",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRasGYnqgSEs5Fh-zUqZBq4Qq00qHmLj_jlgw&s",
        authorID: teamIds[0], 
      },
      {
        title: "Computer Science Concepts",
        summary: "Level up your styling with these Tailwind CSS tricks.",
        content: "Tailwind CSS is a utility-first CSS framework...",
        category: "CSS",
        date: "2025-01-15",
        image: "https://www.topuniversities.com/sites/default/files/styles/736x304/public/guides/lead-bg-images/file%20-%202024-07-23T150458.046.jpg.webp",
        authorID: teamIds[1], 
      },
      {
        title: "Understanding Node.js Streams",
        summary: "Learn about Node.js streams and how to use them effectively.",
        content: "Node.js streams allow developers to handle large data sets...",
        category: "Node.js",
        date: "2025-01-20",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxKvwCQ0fLaf0v6PWJ6R7LCyIUrvxlP4aaqQ&s",
        authorID: teamIds[2], 
      },
      {
        title: "MERN Stack Application",
        summary: "The MERN stack is a collection of JavaScript-based technologies that are used together to develop web applications.",
        content: "The MERN stack is a collection of JavaScript-based technologies that are used together to develop web applications. The stack consists of MongoDB, Express, React, and Node. js. MongoDB is a highly scalable document database that makes it easy to store and retrieve data in JSON documents.",
        category: "MERN Stack",
        date: "2025-01-13",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdzxZ5LywiQPrDD-QfXRZyEM3DeCSI6ldcLA&s",
        authorID: teamIds[1], 
      },
      {
        title: "Concepts of React",
        summary: "React is a JavaScript library created by Facebook",
        content: "Babel is a JavaScript compiler that can translate markup or programming languages into JavaScript.With Babel, you can use the newest features of JavaScript (ES6 - ECMAScript 2015).Babel is available for different conversions. React uses Babel to convert JSX into JavaScript.",
        category: "React",
        date: "2025-01-20",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzuwPfBt4lD43r3B9PHt6mYBIsrlMu9jjoUQ&s",
        authorID: teamIds[0], 
      },
      {
        title: "Exploring Node",
        summary: "A deep dive into React hooks and their use cases.",
        content: "React hooks, introduced in version 16.8, provide developers with...",
        category: "Node",
        date: "2025-01-18",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRasGYnqgSEs5Fh-zUqZBq4Qq00qHmLj_jlgw&s",
        authorID: teamIds[0], 
      },
      {
        title: "Exploring React",
        summary: "A deep dive into React hooks and their use cases.",
        content: "React hooks, introduced in version 16.8, provide developers with...",
        category: "CSS",
        date: "2025-01-30",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRasGYnqgSEs5Fh-zUqZBq4Qq00qHmLj_jlgw&s",
        authorID: teamIds[1], 
      },
      {
        title: "Exploring React",
        summary: "A deep dive into React hooks and their use cases.",
        content: "React hooks, introduced in version 16.8, provide developers with...",
        category: "React",
        date: "2025-01-25",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRasGYnqgSEs5Fh-zUqZBq4Qq00qHmLj_jlgw&s",
        authorID: teamIds[2], 
      },
    ];

    await Blog.insertMany(blogs);
    console.log("Blogs seeded successfully!");

  
    mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Database seeding failed:", error.message);
    mongoose.connection.close();
  }
};


seedData();
