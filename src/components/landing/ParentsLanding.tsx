import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Clock, CheckCircle, Award, 
  BarChart2, MessageSquare, Calendar, Brain,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ParentsLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay Connected with Your Child's Education
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Get real-time updates on your child's academic progress, attendance, and well-being with our comprehensive parent portal.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/login/parent"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Parent Login
              </Link>
              <button className="px-8 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Everything You Need to Support Your Child's Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Academic Progress"
              description="Track grades, assignments, and academic performance in real-time."
            />
            <FeatureCard
              icon={<Calendar className="w-6 h-6" />}
              title="Attendance Monitoring"
              description="Stay informed about your child's attendance and punctuality."
            />
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6" />}
              title="Direct Communication"
              description="Easy communication with teachers and school staff."
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Well-being Insights"
              description="Monitor your child's social and emotional development."
            />
            <FeatureCard
              icon={<BarChart2 className="w-6 h-6" />}
              title="Performance Analytics"
              description="Detailed analytics and progress reports over time."
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Homework Tracking"
              description="Keep track of assignments and submission deadlines."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of parents who are already using our platform to stay connected with their child's education.
          </p>
          <Link
            to="/parent-portal"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Access Parent Portal
            <ArrowRight className="w-5 h-5" />
          </Link>
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