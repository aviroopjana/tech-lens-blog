import React from 'react';
import CallToAction from '../components/CallToAction';

const ProjectsPage: React.FC = () => {
  return (
    <div className=" min-h-screen py-8 px-4 sm:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Build Exciting Projects</h1>
        <div className="rounded-lg shadow-xl dark:shadow-2xl p-6">
          <img
            className="w-full h-auto rounded-lg mb-6"
            src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDd8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fHx8MTcwNjc2Njg1MHww&ixlib=rb-4.0.3&q=80&w=2000"
            alt="Projects"
          />
          <p className="text-lg mb-4">
            Are you a developer looking to sharpen your skills and expand your portfolio? Building
            projects is one of the best ways to do just that. Whether you're a beginner or an
            experienced coder, there's always something new to learn and create.
          </p>
          <p className="text-lg mb-4">
            At Tech Lens, we encourage developers of all levels to take on exciting projects that
            challenge them to think creatively and problem-solve. Whether it's a web app, mobile
            application, or a piece of open-source software, every project you build adds value to
            your skill set and showcases your abilities to potential employers and collaborators.
          </p>
          <p className="text-lg">
            Need some inspiration? Check out our collection of project ideas and tutorials to get
            started. From building your first website to creating complex data-driven applications,
            we've got you covered. So roll up your sleeves, fire up your code editor, and start
            building something amazing today!
          </p>
        </div>
        <div className='mt-5'>
          <CallToAction/>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
