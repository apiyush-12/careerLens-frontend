'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, BookOpen, Zap, CheckCircle2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CareerLens</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-white transition">How It Works</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-slate-300 hover:text-white transition">
              Log in
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Sign up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-3xl" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Your Career
                  <span className="block text-blue-400">Decoded</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                  Understand your career trajectory, identify skill gaps, and access personalized learning paths designed for your growth.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/sign-up">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white text-lg h-12 px-8 flex items-center gap-2">
                    Get started free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 text-lg h-12 px-8 bg-transparent">
                  Watch demo
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-slate-900"
                    />
                  ))}
                </div>
                <p className="text-slate-400">
                  <span className="text-white font-semibold">2,000+</span> professionals already growing
                </p>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative h-96 lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 h-full flex items-center justify-center">
                <div className="space-y-4 w-full">
                  <div className="bg-slate-700/50 h-3 rounded-full w-3/4" />
                  <div className="bg-slate-700/50 h-3 rounded-full w-full" />
                  <div className="bg-slate-700/50 h-3 rounded-full w-5/6" />
                  <div className="mt-8 space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <div className="bg-slate-700/50 h-2 rounded-full w-48" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Powerful features for your career
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to understand and accelerate your professional growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Resume Analysis',
                description: 'Get AI-powered insights into your resume and identify areas for improvement'
              },
              {
                icon: Zap,
                title: 'Skill Gap Detection',
                description: 'Discover which skills you need to develop for your target roles'
              },
              {
                icon: BookOpen,
                title: 'Learning Roadmaps',
                description: 'Personalized learning paths designed by industry experts'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-blue-500/50 transition duration-300"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-blue-300 transition" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Three simple steps
            </h2>
            <p className="text-xl text-slate-400">Get started in minutes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Upload Resume',
                description: 'Share your resume for our AI to analyze'
              },
              {
                step: 2,
                title: 'Set Goals',
                description: 'Define your target roles and career aspirations'
              },
              {
                step: 3,
                title: 'Get Insights',
                description: 'Receive personalized recommendations and learning paths'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold text-white mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Trusted by professionals
            </h2>
            <p className="text-xl text-slate-400">See what our users are saying</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: 'CareerLens helped me understand exactly what skills I needed to advance. I landed my dream role in 6 months.',
                author: 'Sarah Chen',
                role: 'Product Manager'
              },
              {
                quote: 'The personalized learning roadmap saved me so much time. Worth every penny.',
                author: 'Marcus Johnson',
                role: 'Software Engineer'
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-8 rounded-xl border border-slate-700 bg-slate-800/50">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-white to-transparent" />
            <div className="relative">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to unlock your potential?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Start your career journey today with a free analysis of your resume and career goals.
              </p>
              <Link href="/auth/sign-up">
                <Button className="bg-white hover:bg-slate-100 text-blue-600 font-semibold h-12 px-8 text-lg">
                  Get started free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-4">CareerLens</h3>
              <p className="text-slate-400 text-sm">Your career journey decoded</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-sm">
            <p>&copy; 2026 CareerLens. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
