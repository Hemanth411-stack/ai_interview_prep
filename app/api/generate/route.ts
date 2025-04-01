import { generateText } from "ai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import connectDB from "@/Mongoosedb/db";
import Interview from "@/models/interview"; // Import your Mongoose model

// Helper function for random cover images
function getRandomInterviewCover() {
  const covers = [
    '/covers/interview1.jpg',
    '/covers/interview2.jpg',
    '/covers/interview3.jpg'
  ];
  return covers[Math.floor(Math.random() * covers.length)];
}

export async function POST(request: Request) {
  const googleAI = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '' // Fallback to empty string if undefined
  });
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    await connectDB(); // Make sure to await the connection
    
    // Generate interview questions using AI
    const { text: questions } = await generateText({
      model: googleAI("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
      `,
    });

    // Create new interview using Mongoose model
    const interview = new Interview({
      role: role.trim(),
      type: type.trim(),
      level: level.trim(),
      techstack: techstack.split(",").map((tech: string) => tech.trim()),
      questions: JSON.parse(questions),
      userId: userid, // Should be a valid ObjectId if referencing User model
      finalized: true,
      coverImage: getRandomInterviewCover()
      // createdAt will be automatically added by the schema
    });

    // Save to MongoDB
    await interview.save();

    return Response.json({ 
      success: true,
      interviewId: interview._id 
    }, { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    // Example of fetching interviews (adjust as needed)
    const interviews = await Interview.find().limit(10);
    return Response.json({ success: true, data: interviews }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch interviews" 
    }, { status: 500 });
  }
}