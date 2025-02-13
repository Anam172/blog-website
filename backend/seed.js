import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/Blog.js";
import Team from "./models/Team.js";

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
