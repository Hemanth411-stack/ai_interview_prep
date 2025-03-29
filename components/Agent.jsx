"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Agent = () => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState("INACTIVE");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState("");

  // Mock interview data
  const mockInterview = {
    userName: "John Doe",
    userId: "user_123",
    interviewId: "interview_456",
    type: "practice",
    questions: [
      "Tell me about yourself",
      "What are your strengths?",
      "Describe a challenging project you worked on"
    ]
  };

  const handleCall = () => {
    setCallStatus("CONNECTING");
    
    // Simulate call connection
    setTimeout(() => {
      setCallStatus("ACTIVE");
      setIsSpeaking(true);
      
      // Simulate first AI message
      setTimeout(() => {
        const aiMessage = {
          role: "assistant",
          content: "Hello! Welcome to your mock interview. Let's begin with the first question."
        };
        setMessages([aiMessage]);
        setLastMessage(aiMessage.content);
        setIsSpeaking(false);
      }, 1500);
    }, 2000);
  };

  const handleDisconnect = () => {
    setCallStatus("FINISHED");
    setIsSpeaking(false);
    
    // Simulate feedback generation and redirect
    setTimeout(() => {
      router.push(`/interview/${mockInterview.interviewId}/feedback`);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white-50">
      {/* Call View Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 w-full max-w-4xl">
        {/* AI Interviewer Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center">
          <div className="relative mx-auto w-16 h-16 mb-4">
            <Image
              src="/ai-avatar.png"
              alt="AI Interviewer"
              width={65}
              height={54}
              className="rounded-full"
            />
            {isSpeaking && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
            )}
          </div>
          <h3 className="text-xl font-semibold">AI Interviewer</h3>
          <p className="text-gray-600">Ready to conduct your interview</p>
        </div>

        {/* User Profile Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center border-2 border-blue-200">
          <div className="mx-auto w-24 h-24 mb-4">
            <Image
              src="/user-avatar.png"
              alt="User Profile"
              width={96}
              height={96}
              className="rounded-full"
            />
          </div>
          <h3 className="text-xl font-semibold">{mockInterview.userName}</h3>
          <p className="text-gray-600">Candidate</p>
        </div>
      </div>

      {/* Transcript Section */}
      {lastMessage && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-2xl">
          <div className="min-h-20 flex items-center justify-center">
            <p className="text-lg text-center">{lastMessage}</p>
          </div>
        </div>
      )}

      {/* Call Controls */}
      <div className="mt-4">
        {callStatus !== "ACTIVE" ? (
          <button
            onClick={handleCall}
            className="relative bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full"
            disabled={callStatus === "CONNECTING"}
          >
            {callStatus === "CONNECTING" && (
              <span className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-600 opacity-75 animate-ping" />
            )}
            {callStatus === "INACTIVE" || callStatus === "FINISHED"
              ? "Start Interview"
              : "Connecting..."}
          </button>
        ) : (
          <button
            onClick={handleDisconnect}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full"
          >
            End Interview
          </button>
        )}
      </div>

      {/* Mock Questions (for practice mode) */}
      {mockInterview.type === "practice" && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h4 className="text-lg font-semibold mb-4">Sample Questions:</h4>
          <ul className="list-disc pl-5 space-y-2">
            {mockInterview.questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Agent;