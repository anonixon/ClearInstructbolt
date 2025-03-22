import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart2, Users, Shield, FileText, 
  Settings, Database, Book, Brain,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const InstitutionsLanding = () => {
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