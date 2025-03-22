import React, { createContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Clock, CheckCircle, Award, 
  BarChart2, MessageSquare, Calendar, Brain,
  ArrowRight, Bell, ClipboardCheck, BookOpen as Book,
  MessageCircle, BellRing, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface User {
  id: string;
  role: 'teacher' | 'parent' | 'headteacher';
  name: string;
  email: string;
}

const AuthContext = createContext<{
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}>({});

const ParentsLanding = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [insightsRef, insightsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [communicationRef, communicationInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
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
                Stay connected with{' '}
                <span className="block">your child's education</span>
            </h1>
              <p className="text-xl text-gray-600 mb-8">
                Our platform keeps you informed and engaged with real-time updates on your child's academic progress, attendance, and school activities.
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
                <p className="text-gray-400">Parent Portal Hero Image Placeholder</p>
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
              Empowering parents through technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform helps you actively participate in your child's educational journey with easy-to-use tools and real-time information.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Real-time updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-time updates
              </h3>
              <p className="text-gray-600">
                Receive instant notifications about grades, attendance, behavior, and important school announcements.
              </p>
            </motion.div>

            {/* School calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                School calendar
              </h3>
              <p className="text-gray-600">
                Access a comprehensive calendar of school events, assignments, and parent-teacher meetings.
              </p>
            </motion.div>

            {/* Direct communication */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Direct communication
              </h3>
              <p className="text-gray-600">
                Message teachers and staff directly through our secure platform, eliminating communication barriers.
              </p>
            </motion.div>

            {/* Progress tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Progress tracking
              </h3>
              <p className="text-gray-600">
                Monitor your child's academic performance with easy-to-understand charts and progress reports.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic Insights Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column - Content */}
            <motion.div
              ref={insightsRef}
              initial={{ opacity: 0, x: -20 }}
              animate={insightsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="flex-1 max-w-2xl"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comprehensive academic insights
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Gain a deeper understanding of your child's academic journey with detailed performance data and personalized insights.
              </p>

              {/* Feature List */}
              <div className="space-y-8">
                {/* Assignment tracking */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={insightsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Assignment tracking
                    </h3>
                    <p className="text-gray-600">
                      View upcoming, completed, and missing assignments with due dates and requirements.
                    </p>
                  </div>
                </motion.div>

                {/* Performance analytics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={insightsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Performance analytics
                    </h3>
                    <p className="text-gray-600">
                      Track progress across subjects with intuitive visualizations and comparative data.
                    </p>
                  </div>
                </motion.div>

                {/* Curriculum visibility */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={insightsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Book className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Curriculum visibility
                    </h3>
                    <p className="text-gray-600">
                      Understand what your child is learning and how you can support their education at home.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={insightsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full max-w-2xl"
            >
              {/* Add academic insights image here */}
              {/* Image dimensions should be approximately 600x500px */}
              {/* Replace the div below with an <img> tag */}
              <div className="aspect-[6/5] bg-gray-100 rounded-2xl flex items-center justify-center">
                <p className="text-gray-400">Academic Insights Image Placeholder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Communication Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={communicationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="flex-1 w-full max-w-2xl"
            >
              {/* Add communication section image here */}
              {/* Image dimensions should be approximately 600x500px */}
              {/* Replace the div below with an <img> tag */}
              <div className="aspect-[6/5] bg-gray-100 rounded-2xl flex items-center justify-center">
                <p className="text-gray-400">School Communication Image Placeholder</p>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              ref={communicationRef}
              initial={{ opacity: 0, x: 20 }}
              animate={communicationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6 }}
              className="flex-1 max-w-2xl"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Seamless school communication
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Stay connected with teachers and school staff through our secure messaging system, ensuring you never miss important updates.
              </p>

              {/* Feature List */}
              <div className="space-y-8">
                {/* Direct messaging */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={communicationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Direct messaging
                    </h3>
                    <p className="text-gray-600">
                      Communicate directly with teachers and staff through our secure platform.
                    </p>
                  </div>
                </motion.div>

                {/* School announcements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={communicationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BellRing className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      School announcements
                    </h3>
                    <p className="text-gray-600">
                      Receive important school-wide notifications and updates in real-time.
                    </p>
                  </div>
                </motion.div>

                {/* Privacy and security */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={communicationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Privacy and security
                    </h3>
                    <p className="text-gray-600">
                      Rest assured that all communications are private, secure, and GDPR compliant.
                    </p>
                  </div>
                </motion.div>
            </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={testimonialsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What parents are saying
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from parents who have transformed their involvement in their children's education.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <blockquote className="text-lg text-gray-900 italic mb-6">
                "I finally feel connected to my child's education. I can see exactly what they're learning and how they're progressing, which helps me support them at home."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-lg">RT</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-gray-900">Rebecca Taylor</span>
                  <span className="text-gray-600 text-sm">Parent of Year 4 student, Meadowbrook Primary</span>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <blockquote className="text-lg text-gray-900 italic mb-6">
                "The ability to message teachers directly has been a game-changer. I no longer have to wait for parent-teacher conferences to discuss my child's progress."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-lg">OH</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-gray-900">Omar Hassan</span>
                  <span className="text-gray-600 text-sm">Parent of Year 9 student, Westfield Academy</span>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <blockquote className="text-lg text-gray-900 italic mb-6">
                "As a working parent, I couldn't always be present for school events. Now I can keep track of everything and never miss important announcements."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-lg">LC</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-gray-900">Lisa Chen</span>
                  <span className="text-gray-600 text-sm">Parent of Year 7 student, St. Mary's College</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to get more involved in your child's education?
          </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Join thousands of parents already using our platform to stay connected with their children's academic journey.
          </p>
          <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
              Signup today
          </Link>
          </motion.div>
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

export default ParentsLanding;