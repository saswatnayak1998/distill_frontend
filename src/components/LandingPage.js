"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DistillHeader from "./ui/DistillHeader";
import { RunButton } from "./ui";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-space-900 to-gray-900 text-white">
      <DistillHeader title="Distill" bubbleCount={30} />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto p-6 space-y-12">
          {/* Problem Statement Section */}
          <section className="text-center space-y-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-300 to-purple-300 bg-clip-text text-transparent">
              The Hidden Cost of Traditional Tech Hiring
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <StatCard value="70-90%" label="Ineffective Interviews" />
              <StatCard value="23h" label="Wasted Screening/Job" />
              <StatCard value="88%" label="Missed Candidates" />
              <StatCard value="$250k" label="Cost of Bad Hires" />
              <StatCard value="8h+" label="Weekly Dev Waste" />
            </div>
          </section>

          {/* AI Code Detection Callout Section */}
          <section className="bg-gray-800/50 p-8 rounded-xl text-center border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                AI Code Detection is Essential for Hiring
              </span>
            </h3>
            <p className="text-lg text-gray-300">
              In today's AI age, traditional plagiarism detection is not enough. 
              Candidates can use AI-generated code or copy solutions from the internet. 
              <span className="text-teal-400 font-semibold">
                Distill flags not only plagiarism but also AI-generated code, ensuring authentic assessments</span>
            </p>
          </section>

          {/* Hiring Process Flow Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-purple-300 bg-clip-text text-transparent">
              Distill AI Manages the Entire Hiring Lifecycle
            </h2>
            <div className="max-w-screen-lg mx-auto flex flex-wrap justify-center gap-4">
              {hiringStages.map((stage, index) => (
                <HiringStep key={index} title={stage.title} icon={stage.icon} />
              ))}
            </div>
          </section>

          {/* AI-Powered Automation Section */}
          <section className="text-center bg-gray-800/50 p-6 md:p-8 rounded-xl">
            <h3 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                AI-Powered Hiring Automation:
              </span>
            </h3>
            <p className="text-lg text-gray-300 mt-2">
              Distill automates emailing, follow-ups, scheduling, and candidate communication, reducing hiring friction.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {aiAutomation.map((task, index) => (
                <FeatureCard key={index} title={task.title} gradient="from-blue-500 to-indigo-500" stat={task.stat}>
                  {task.description}
                </FeatureCard>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-300 to-purple-300 bg-clip-text text-transparent">
                Ready to Revolutionize Your Hiring?
              </h2>
              <p className="text-lg mt-2 text-gray-300">
                Join companies saving thousands of engineering hours annually.
              </p>
            </div>
            <div className="flex justify-center space-x-6 flex-wrap gap-4">
              <RunButton onClick={() => router.push("/login")} label="Start Test" gradientFrom="from-teal-500" gradientTo="to-purple-600" icon="🚀" />
              <RunButton onClick={() => router.push("/recruiter")} label="Recruiter Demo" gradientFrom="from-blue-500" gradientTo="to-indigo-600" icon="👔" />
              <RunButton 
                    onClick={() => window.location.href = "https://calendly.com/saswatxenon/30min"} 
                    label="Contact Us" 
                    gradientFrom="from-amber-500" 
                    gradientTo="to-pink-600" 
                    icon="🏢" 
                    />
            </div>
          </section>

          <footer className="text-center mt-12 border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-500">
              Proven to reduce hiring costs by 40% while improving candidate quality • SOC2 Certified • Trusted by leading tech teams.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

const HiringStep = ({ title, icon }) => (
  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 w-36 md:w-40 text-center">
    <div className="text-3xl md:text-4xl">{icon}</div>
    <div className="mt-2 text-xs md:text-sm font-bold">{title}</div>
  </div>
);

const FeatureCard = ({ title, gradient, stat, children }) => (
  <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg hover:border-teal-400/30 transition-all">
    <h3 className={`text-lg md:text-xl font-semibold mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
      {title}
    </h3>
    <div className="text-xs md:text-sm mb-3 font-mono text-teal-400">{stat}</div>
    <p className="text-sm md:text-base text-gray-300">{children}</p>
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
    <div className="text-xl md:text-2xl font-bold text-teal-400">{value}</div>
    <div className="text-xs md:text-sm text-gray-400 mt-1">{label}</div>
  </div>
);

const hiringStages = [
  { title: "Job Posting", icon: "📢" },
  { title: "Resume Screening", icon: "📄" },
  { title: "Online Assessment", icon: "📝" },
  { title: "Video Interview", icon: "🎥" },
  { title: "Technical Challenge", icon: "💻" },
  { title: "HR Interview", icon: "🗣️" },
  { title: "Offer Letter", icon: "✉️" },
  { title: "Onboarding", icon: "🚀" },
];

const aiAutomation = [
  { title: "Cheating Free Tests", stat: "Reduce False Positives", description: "Our coding test flags AI-generated or plagiarized code." },
  { title: "Cheating Free Interviews", stat: "Authentic Interviews", description: "Vision models detect scripted interview responses." },
  { title: "AI-Powered Emailing", stat: "Saves 10+ hrs/week", description: "Automated candidate communication with personalized responses." },
  { title: "Auto-Scheduling", stat: "100% Calendar Sync", description: "AI schedules interviews, avoiding conflicts." },
  { title: "Smart Follow-ups", stat: "Reduces drop-offs by 50%", description: "Automated follow-ups keep candidates engaged." },
  { title: "Resume Parsing", stat: "5x Faster Screening", description: "AI extracts resume insights instantly." },
];

export default LandingPage;
