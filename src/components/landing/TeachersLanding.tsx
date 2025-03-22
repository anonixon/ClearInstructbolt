import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, ClipboardList, BarChart2, MessageSquare, FileText, Timer } from 'lucide-react';

const TeachersLanding = () => {
=======
import { 
  BookOpen, Clock, CheckCircle, Award, 
  BarChart2, MessageSquare, Calendar, Brain
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TeachersLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Your Teaching Experience
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Streamline your classroom management, enhance student engagement, and save valuable time with our comprehensive teaching platform.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/login/teacher"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Teacher Login
              </Link>
              <button className="px-8 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Everything You Need to Excel in Teaching
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Lesson Planning"
              description="Create and organize lesson plans with our intuitive planning tools and resource library."
            />
            <FeatureCard
              icon={<BarChart2 className="w-6 h-6" />}
              title="Student Progress Tracking"
              description="Monitor individual and class progress with detailed analytics and insights."
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Time-Saving Automation"
              description="Automate routine tasks like attendance tracking and grade calculations."
            />
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6" />}
              title="Parent Communication"
              description="Easily communicate with parents through our integrated messaging system."
            />
            <FeatureCard
              icon={<Calendar className="w-6 h-6" />}
              title="Schedule Management"
              description="Organize your timetable, assignments, and important deadlines efficiently."
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Professional Development"
              description="Access continuous learning resources and teaching best practices."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Teachers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="This platform has revolutionized how I manage my classroom. The time I save on administrative tasks can now be spent on actual teaching."
              author="Sarah Johnson"
              role="Mathematics Teacher"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <TestimonialCard
              quote="The student progress tracking features have made it so much easier to identify and support struggling students early on."
              author="Michael Chen"
              role="Science Teacher"
              image="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <TestimonialCard
              quote="Parent communication has never been easier. The automated updates and messaging system saves me hours each week."
              author="Emma Thompson"
              role="English Teacher"
              image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of teachers who are already using our platform to enhance their teaching experience.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

<<<<<<< HEAD
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [assessmentRef, assessmentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
=======
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const TestimonialCard = ({ quote, author, role, image }: { quote: string; author: string; role: string; image: string }) => {
  const [ref, inView] = useInView({
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column - Content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="flex-1 max-w-2xl"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Simplify your teaching workflow
            </h1>
              <p className="text-xl text-gray-600 mb-8">
                Our platform helps teachers save time on administrative tasks, track student progress effectively, and create engaging learning experiences.
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
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full max-w-2xl"
            >
              {/* Add hero image here */}
              {/* Image dimensions should be approximately 600x500px */}
              {/* Replace the div below with an <img> tag */}
              <div className="aspect-[6/5] bg-gray-100 rounded-2xl flex items-center justify-center">
                <p className="text-gray-400">Hero Image Placeholder</p>
            </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={featuresRef}
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Designed with teachers in mind
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our education platform helps you focus on what matters most: teaching and supporting your students.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Save valuable time */}
            <motion.div
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ type: "tween", duration: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Save valuable time
              </h3>
              <p className="text-gray-600">
                Reduce administrative burden with automated attendance tracking, grading, and report generation.
              </p>
            </motion.div>

            {/* Streamlined planning */}
            <motion.div
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ type: "tween", duration: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ClipboardList className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Streamlined planning
              </h3>
              <p className="text-gray-600">
                Create, store, and share lesson plans with integrated curriculum mapping and resource management.
              </p>
            </motion.div>

            {/* Track progress */}
            <motion.div
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ type: "tween", duration: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Track progress
              </h3>
              <p className="text-gray-600">
                Monitor student achievement with intuitive dashboards showing individual and class-wide performance data.
              </p>
            </motion.div>

            {/* Enhance communication */}
            <motion.div
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ type: "tween", duration: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Enhance communication
              </h3>
              <p className="text-gray-600">
                Connect seamlessly with students, parents, and colleagues through integrated messaging and feedback tools.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Assessment Tools Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column - Content */}
            <motion.div
              ref={assessmentRef}
              initial={{ opacity: 0, x: -20 }}
              animate={assessmentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="flex-1 max-w-2xl"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comprehensive assessment tools
          </h2>
              <p className="text-xl text-gray-600 mb-12">
                Create, distribute, and grade assessments with ease. Our platform supports various question types, automated marking, and detailed performance analytics.
              </p>

              {/* Feature List */}
              <div className="space-y-8">
                {/* Diverse assessment formats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={assessmentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Diverse assessment formats
                    </h3>
                    <p className="text-gray-600">
                      Support for multiple choice, short answer, essay, and multimedia question types.
                    </p>
                  </div>
                </motion.div>

                {/* Detailed analytics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={assessmentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Detailed analytics
                    </h3>
                    <p className="text-gray-600">
                      Identify knowledge gaps and track progress over time with comprehensive reporting.
                    </p>
                  </div>
                </motion.div>

                {/* Automated marking */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={assessmentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Timer className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Automated marking
                    </h3>
                    <p className="text-gray-600">
                      Save time with automatic grading for objective questions and rubric-based assessment tools.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={assessmentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full max-w-2xl"
            >
              {/* Add assessment tools image here */}
              {/* Image dimensions should be approximately 600x500px */}
              {/* Replace the div below with an <img> tag */}
              <div className="aspect-[6/5] bg-gray-100 rounded-2xl flex items-center justify-center">
                <p className="text-gray-400">Assessment Tools Image Placeholder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={testimonialsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What teachers are saying
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from educators who have transformed their teaching practice with our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <blockquote className="text-lg text-gray-900 italic mb-6">
                "I've reclaimed at least 5 hours per week that I used to spend on administrative tasks. Now I can focus on what really matters - my students."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-medium">JW</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">James Wilson</h4>
                  <p className="text-gray-600">Science Teacher, Riverside Secondary School</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <blockquote className="text-lg text-gray-900 italic mb-6">
                "The assessment tools have revolutionized how I track student progress. I can quickly identify who needs additional support and tailor my teaching accordingly."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-medium">PS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                  <p className="text-gray-600">Mathematics Teacher, Greenfield Academy</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <blockquote className="text-lg text-gray-900 italic mb-6">
                "Lesson planning used to take hours. With the template library and collaborative features, I can create engaging lessons in a fraction of the time."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-medium">DT</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">David Thompson</h4>
                  <p className="text-gray-600">History Teacher, St. John's College</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
    <motion.div
        className="py-24 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        ref={ctaRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to transform your teaching experience?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
      initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join thousands of teachers already using our platform to enhance their teaching and student engagement.
            </motion.p>
    <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
=======
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <p className="text-gray-600 dark:text-gray-300 mb-6">{quote}</p>
      <div className="flex items-center">
        <img src={image} alt={author} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{author}</div>
          <div className="text-gray-500 dark:text-gray-400">{role}</div>
        </div>
      </div>
    </motion.div>
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
  );
};

export default TeachersLanding;