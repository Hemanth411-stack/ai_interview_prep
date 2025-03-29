"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import Navbar from "../../components/Navbar"
export default function Home() {
  // Mock data - replace with your actual data fetching
  const userInterviews = [
    {
      id: "1",
      role: "Frontend Developer",
      type: "Technical",
      techstack: ["React", "TypeScript", "Next.js"],
      createdAt: new Date("2023-05-15"),
    },
    {
      id: "2",
      role: "Product Manager",
      type: "Behavioral",
      techstack: ["Agile", "Scrum", "Product Strategy"],
      createdAt: new Date("2023-06-20"),
    },
  ];

  const availableInterviews = [
    {
      id: "3",
      role: "Full Stack Developer",
      type: "Technical",
      techstack: ["Node.js", "React", "MongoDB"],
      createdAt: new Date("2023-07-01"),
    },
    {
      id: "4",
      role: "UX Designer",
      type: "Portfolio Review",
      techstack: ["Figma", "User Research", "Prototyping"],
      createdAt: new Date("2023-07-05"),
    },
  ];

  return (
    <>
    <Navbar></Navbar>
    <div className="container mx-auto px-4 py-8">
      {/* Generate Interview Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 mb-12 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-lg mb-6 md:mb-0">
            <h1 className="text-3xl font-bold mb-4">AI-Powered Interview Practice</h1>
            <p className="text-lg mb-6">
              Get realistic interview practice with instant feedback from our AI system.
              Improve your skills and confidence.
            </p>
            <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
              <Link href="/generate-interview">Generate New Interview</Link>
            </Button>
          </div>
          <Image
            src="/robot.png"
            alt="Interview illustration"
            width={400}
            height={300}
            className="hidden md:block"
          />
        </div>
      </section>

      {/* Your Interviews Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Recent Interviews</h2>
          <Link href="/your-interviews" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        
        {userInterviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                date={interview.createdAt.toLocaleDateString()}
                actionText="Review"
                actionLink={`/interviews/${interview.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">You haven't completed any interviews yet</p>
            <Button asChild variant="outline">
              <Link href="/generate-interview">Start Your First Interview</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Available Interviews Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Available Interviews</h2>
          <Link href="/browse-interviews" className="text-blue-600 hover:underline">
            Browse All
          </Link>
        </div>
        
        {availableInterviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                date={interview.createdAt.toLocaleDateString()}
                actionText="Start Now"
                actionLink={`/interviews/${interview.id}/start`}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">No interviews available at the moment</p>
          </div>
        )}
      </section>
    </div>
    </>
  );
}