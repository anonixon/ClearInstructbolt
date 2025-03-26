import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, BarChart2, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-24 gap-12">
          {/* Left Column - Text Content */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Empowering teachers,{' '}
              <span className="block">engaging families,</span>
              <span className="block">and elevating education</span>
          </h1>
            <p className="text-xl text-gray-600 mb-8">
              In many ways, there has never been a tougher time to be an educator than right now – which is why more than ever, teachers, schools and trust leadership need the very best tools in place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/demo"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book a Demo
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Explore Features
              </Link>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">For Teachers</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Streamline your workflow and focus on what matters most - teaching.
              </p>
            <Link
              to="/teachers"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
              >
                Learn more <span className="ml-1">→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">For Parents</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Stay connected with your child's education journey in real-time.
              </p>
              <Link
                to="/parents"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
              >
                Learn more <span className="ml-1">→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">For Schools</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive school management and analytics platform.
              </p>
              <Link
                to="/institutions"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
              >
                Learn more <span className="ml-1">→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">For Students</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Access your assignments, grades, and track your progress.
              </p>
              <Link
                to="/students"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
              >
                Learn more <span className="ml-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ecosystem Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Designed for the entire education ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides tailored solutions for teachers, parents, and school administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Time Management Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Save valuable time
              </h3>
              <p className="text-gray-600">
                Our education management solutions cut down on admin and free up teacher's time, so they can focus on their students.
              </p>
            </motion.div>

            {/* Insights Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BarChart2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Powerful insights
              </h3>
              <p className="text-gray-600">
                Intuitive reporting features equip leadership with the kind of 'big picture' insights they need to better support the success of students and staff.
              </p>
            </motion.div>

            {/* Community Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Engage your community
              </h3>
              <p className="text-gray-600">
                User-friendly software keeps your parent and carer community engaged, so you can work together to achieve the best outcomes for pupils.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Comprehensive Solutions Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive solutions for education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover a flexible, ever-evolving education management system that empowers you to do what you do best – giving pupils the best start in life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Teachers Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Add teacher-focused image here */}
              {/* Image dimensions should be approximately 400x300px */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {/* Replace this div with an image */}
                <p className="text-gray-400">Teacher Image Placeholder</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  For Teachers
                </h3>
                <p className="text-gray-600 mb-4">
                  Streamline your workflow with intuitive tools for lesson planning, student assessment, and progress tracking.
                </p>
                <Link
                  to="/teachers"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* For Parents Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Add parent-focused image here */}
              {/* Image dimensions should be approximately 400x300px */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {/* Replace this div with an image */}
                <p className="text-gray-400">Parent Image Placeholder</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  For Parents
                </h3>
                <p className="text-gray-600 mb-4">
                  Stay connected with your child's education through real-time updates on progress, attendance, and school activities.
                </p>
            <Link
              to="/parents"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* For Schools & Colleges Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Add school-focused image here */}
              {/* Image dimensions should be approximately 400x300px */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {/* Replace this div with an image */}
                <p className="text-gray-400">School Image Placeholder</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  For Schools & Colleges
                </h3>
                <p className="text-gray-600 mb-4">
                  Enhance school-wide reporting, ensure Ofsted compliance, and streamline administrative tasks with our comprehensive platform.
                </p>
                <Link
                  to="/schools"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by educators nationwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what teachers, parents, and school administrators are saying about our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Teacher Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <blockquote className="mb-6">
                <p className="text-lg text-gray-700 italic mb-6">
                  "This platform has transformed how I manage my classroom. I've reclaimed hours of my week that I can now dedicate to actual teaching."
                </p>
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold mr-4">
                  SJ
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-600 text-sm">Year 6 Teacher, Oakwood Primary School</div>
                </div>
              </div>
            </motion.div>

            {/* Parent Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <blockquote className="mb-6">
                <p className="text-lg text-gray-700 italic mb-6">
                  "As a parent, I finally feel connected to my child's education. The real-time updates and easy communication with teachers has been invaluable."
                </p>
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold mr-4">
                  MC
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Michael Chen</div>
                  <div className="text-gray-600 text-sm">Parent, Westfield Academy</div>
                </div>
          </div>
            </motion.div>

            {/* Administrator Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <blockquote className="mb-6">
                <p className="text-lg text-gray-700 italic mb-6">
                  "The comprehensive reporting features have made Ofsted preparations so much easier. We can quickly generate the exact data we need."
                </p>
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold mr-4">
                  DE
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Dr. Emma Williams</div>
                  <div className="text-gray-600 text-sm">Headteacher, St. Mary's College</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <motion.div 
        className="py-24 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to transform your educational experience?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join thousands of schools already using our platform to enhance teaching, learning, and administration.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200"
              >
                Signup Today
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;