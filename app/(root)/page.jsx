"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterviews } from "@/Redux/slices/interview";

export default function Home() {
  const dispatch = useDispatch();
  const { 
    interviews = [], // Default to empty array
    loading,
    error
  } = useSelector((state) => state.interview);

  useEffect(() => {
    dispatch(fetchInterviews());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading interviews...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error loading interviews: {error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Generate Interview Section */}
        <section className="card interview rounded-xl p-8 mb-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-lg mb-6 md:mb-0">
              <h1 className="text-3xl font-bold mb-4">AI-Powered Interview Practice</h1>
              <p className="text-lg mb-6">
                Get realistic interview practice with instant feedback from our AI system.
                Improve your skills and confidence.
              </p>
              <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
                <Link href="/interview">Generate New Interview</Link>
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

        {/* Interviews Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Available Interviews</h2>
            <Link href="/browse-interviews" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          
          {interviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviews.map((interview) => {
                const interviewDate = interview.createdAt 
                  ? new Date(interview.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'No date';
                
                return (
                  <InterviewCard
                    key={interview._id || interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    date={interviewDate}
                    actionText="Start Now"
                    actionLink={`/interviews/${interview._id || interview.id}`}
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">No interviews available at the moment</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/generate-interview">
                  Create Your First Interview
                </Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}