import React, { useEffect, useState } from 'react';

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/teams")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Team Data:", data); 
        setTeamMembers(data.data); 
      })
      .catch((err) => console.error("Error fetching team data:", err));
  }, []);
  
  return (
    <>
    <div className="h-auto px-2 py-8 bg-black text-white text-center lg:h-80 gap-y-16">
        <h1 className="text-6xl font-bold p-4">About Us</h1>
        <p>
          Welcome to our blog! Our platform is designed to provide you with in-depth articles, tutorials,
          and insights into the world of web development. <br />We cover a range of topics including React,
          Node.js, CSS, JavaScript, and much more. Our mission is to make learning <br />and exploring tech fun
          and accessible for everyone, regardless of their experience level.
        </p>
      </div>

    <div className="m-8 text-center lg:px-28">
    <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-black text-md mb-6">
          We started this blog as a way to share our passion for web development and connect with like-minded individuals. 
          Our team is made up of passionate developers who enjoy teaching and writing about the latest trends in technology. 
          Over time, we’ve grown into a vibrant community of learners and contributors who all share the same goal: to help others grow in their tech journey.
        </p>

      <h2 className="text-2xl font-semibold mb-8">Meet the Team</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member._id} className="bg-gray-50 p-6 rounded-lg shadow-md">
            <img 
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center">{member.name}</h3>
            <p className="text-center text-gray-600">{member.role}</p>
            <p className="text-center text-gray-500 mt-2">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AboutPage;
