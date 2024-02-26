import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">About Tech Lens</h1>
        <div className="rounded-lg shadow-xl dark:shadow-2xl p-6">
          <img
            className="w-full h-auto rounded-lg mb-6"
            src="https://cfcdn-cf.hellodr.tech/wp-content/uploads/2023/05/219-Dr-Tech-blog-images.png"
            alt="Tech Lens"
          />
          <p className="text-lg mb-4 text-gray-800 dark:text-gray-200">
            Tech Lens is a blog dedicated to providing insightful articles, guides, and reviews
            about the latest technologies, trends, and innovations in the tech industry. Our
            mission is to empower individuals and businesses with the knowledge they need to thrive
            in the digital age.
          </p>
          <p className="text-lg mb-4">
            Whether you're a seasoned developer, a technology enthusiast, or simply curious about
            the world of tech, Tech Lens has something for you. From in-depth tutorials on
            programming languages and frameworks to reviews of the newest gadgets and devices, we
            strive to cover a wide range of topics to keep our readers informed and inspired.
          </p>
          <p className="text-lg">
            At Tech Lens, we believe that technology has the power to change lives and shape the
            future. Join us on this journey as we explore the endless possibilities of the digital
            world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
