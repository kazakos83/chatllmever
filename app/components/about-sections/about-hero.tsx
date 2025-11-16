
"use client"

import { motion } from 'framer-motion'
import { Award, Shield, Users, CheckCircle } from 'lucide-react'

const AboutHero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
              <Award className="h-4 w-4" />
              <span>Licensed Private Investigation Agency</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              About
              <br />
              <span className="everguard-text-gradient">Everguard</span>
              <br />
              Group
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Everguard Group is a licensed private investigation and intelligence agency providing 
              discreet, evidence-driven investigative services including surveillance, factual investigations, 
              corporate intelligence, and background checks across Australia.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
                <div className="text-gray-600">Cases Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">100+</div>
                <div className="text-gray-600">Satisfied Clients</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 everguard-gradient rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To deliver discreet, evidence-driven investigation and intelligence services that support 
                informed decision-making for insurers, legal professionals, corporations, government bodies, 
                and private clients with absolute discretion and proven results.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 everguard-gradient rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Commitment</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We support insurance claims, legal disputes, corporate risk assessments, and sensitive personal 
                matters through disciplined investigative approaches and strict confidentiality protocols with 
                court-ready reporting standards.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
