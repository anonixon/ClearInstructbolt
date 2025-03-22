import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart2, Users, Shield, FileText, 
  Settings, Database, Book, Brain,
<<<<<<< HEAD
  ArrowRight, Clock, MessageSquare
=======
  ArrowRight
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const InstitutionsLanding = () => {
<<<<<<< HEAD
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: dataRef, inView: dataInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ofstedRef, ofstedInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column - Content */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="flex-1 max-w-2xl"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Streamline school management and enhance outcomes
            </h1>
              <p className="text-xl text-gray-600 mb-8">
                Our comprehensive platform helps schools and colleges improve administrative efficiency, ensure Ofsted compliance, and drive better educational outcomes.
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
                  className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Explore Features
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full max-w-2xl"
            >
              {/* Add hero image here */}
              {/* Image dimensions should be approximately 600x500px */}
              {/* Replace the div below with an <img> tag */}
              <div className="aspect-[6/5] bg-gray-100 rounded-2xl flex items-center justify-center">
                <p className="text-gray-400">Institution Hero Image Placeholder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={featuresRef}
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive school management solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides the tools and insights needed to run your school efficiently and effectively.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Comprehensive reporting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Comprehensive reporting
              </h3>
              <p className="text-gray-600">
                Generate detailed reports on attendance, behavior, and academic performance with just a few clicks.
              </p>
            </motion.div>

            {/* Ofsted compliance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ofsted compliance
              </h3>
              <p className="text-gray-600">
                Ensure your school meets all regulatory requirements with built-in compliance tracking and evidence collection tools.
              </p>
            </motion.div>

            {/* Administrative efficiency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Administrative efficiency
              </h3>
              <p className="text-gray-600">
                Streamline administrative tasks with automated workflows for attendance, timetabling, and resource management.
              </p>
            </motion.div>

            {/* Data security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Data security
              </h3>
              <p className="text-gray-600">
                Keep sensitive student and staff information secure with enterprise-grade security and GDPR compliance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data-Driven Section */}
      <section 
        ref={dataRef}
        className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={dataInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="flex-1 max-w-2xl"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Data-driven decision making
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Transform raw data into actionable insights with our powerful analytics tools,
                helping you make informed decisions about your school's future.
              </p>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={dataInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Performance trends
                    </h3>
                    <p className="text-gray-600">
                      Identify patterns and trends in academic performance across subjects, classes,
                      and year groups.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={dataInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Cohort analysis
                    </h3>
                    <p className="text-gray-600">
                      Compare different student groups to ensure equitable outcomes and targeted
                      interventions.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={dataInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Custom dashboards
                    </h3>
                    <p className="text-gray-600">
                      Create personalized dashboards for different stakeholders, from governors to
                      department heads.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={dataInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full max-w-2xl"
            >
              {/* Add data analytics image here */}
              {/* Image dimensions should be approximately 600x500px */}
              {/* Replace the div below with an <img> tag */}
              <div className="aspect-[6/5] bg-gray-100 rounded-2xl flex items-center justify-center">
                <p className="text-gray-400">Data Analytics Image Placeholder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ofsted-Ready Section */}
      <section 
        ref={ofstedRef}
        className="py-24 bg-white px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={ofstedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="flex-1 w-full max-w-2xl order-2 lg:order-1"
            >
              {/* Add Ofsted reporting image here */}
              {/* Image dimensions should be approximately 600x500px */}
              {/* Replace the div below with an <img> tag */}
              <div className="aspect-[6/5] bg-gray-100 rounded-2xl flex items-center justify-center">
                <p className="text-gray-400">Ofsted Reporting Image Placeholder</p>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={ofstedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6 }}
              className="flex-1 max-w-2xl order-1 lg:order-2"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ofsted-ready reporting
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Be prepared for inspections at all times with our comprehensive Ofsted
                compliance tools and evidence collection system.
              </p>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={ofstedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Evidence repository
                    </h3>
                    <p className="text-gray-600">
                      Collect and organize evidence aligned with Ofsted framework requirements.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={ofstedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Book className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Curriculum mapping
                    </h3>
                    <p className="text-gray-600">
                      Demonstrate curriculum intent, implementation, and impact with comprehensive
                      documentation.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={ofstedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Stakeholder voice
                    </h3>
                    <p className="text-gray-600">
                      Capture and analyze feedback from students, parents, and staff to demonstrate
                      engagement.
                    </p>
                  </div>
                </motion.div>
            </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={testimonialsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by educational leaders
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from school leaders who have transformed their institutions with our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <p className="text-lg text-gray-600 italic mb-6">
                "The comprehensive reporting features have made Ofsted preparations so much easier. We can quickly generate the exact data we need and demonstrate the impact of our initiatives."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">DE</span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">Dr. Emma Williams</h4>
                  <p className="text-sm text-gray-500">Headteacher, St. Mary's College</p>
                </div>
              </div>
            </motion.div>

            {/* Second Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <p className="text-lg text-gray-600 italic mb-6">
                "We've seen a significant reduction in administrative workload across our trust. The platform has streamlined processes and freed up valuable time for our staff to focus on teaching and learning."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">RT</span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">Richard Thompson</h4>
                  <p className="text-sm text-gray-500">CEO, Oakwood Academy Trust</p>
                </div>
              </div>
            </motion.div>

            {/* Third Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <p className="text-lg text-gray-600 italic mb-6">
                "The data analytics have transformed how we track student progress and identify areas for improvement. We now have a much clearer picture of what's working and where we need to focus our resources."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">SP</span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">Samira Patel</h4>
                  <p className="text-sm text-gray-500">Deputy Head, Greenfield Academy</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to transform your school's management?
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join hundreds of schools and colleges already using our platform to improve efficiency,
              ensure compliance, and enhance educational outcomes.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                Signup Today
              </Link>
            </motion.div>
          </motion.div>
=======
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Your School's Management
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive school management solution that streamlines administration, enhances communication, and ensures Ofsted compliance.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/login/headteacher"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Head Teacher Login
              </Link>
              <button className="px-8 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Comprehensive School Management Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart2 className="w-6 h-6" />}
              title="Performance Analytics"
              description="Comprehensive analytics for data-driven decision making."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Staff Management"
              description="Streamline HR processes and staff development tracking."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Ofsted Compliance"
              description="Ensure compliance with educational standards and regulations."
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="Automated Reporting"
              description="Generate detailed reports with just a few clicks."
            />
            <FeatureCard
              icon={<Database className="w-6 h-6" />}
              title="Data Management"
              description="Secure and efficient student and staff data management."
            />
            <FeatureCard
              icon={<Settings className="w-6 h-6" />}
              title="Resource Optimization"
              description="Optimize resource allocation and budget management."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join leading educational institutions already using our platform to enhance their management capabilities.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-800/50 rounded-lg"
    >
      <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default InstitutionsLanding;