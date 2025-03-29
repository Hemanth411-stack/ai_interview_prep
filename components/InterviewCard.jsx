"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const InterviewCard = () => {
  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Type Badge - Static Technical badge */}
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-800">
            <p className="badge-text">Technical</p>
          </div>

          {/* Static Cover Image */}
          <Image
            src="/covers/adobe.png" // Static cover image
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          {/* Static Interview Role */}
          <h3 className="mt-5 capitalize">Frontend Developer Interview</h3>

          {/* Static Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>Jul 15, 2023</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>85/100</p>
            </div>
          </div>

          {/* Static Feedback Text */}
          <p className="line-clamp-2 mt-5">
            Great performance overall, especially on React concepts. Work on TypeScript advanced types.
          </p>
        </div>

        <div className="flex flex-row justify-between">
          {/* Static Tech Icons - Replace with your actual DisplayTechIcons component */}
          <div className="flex gap-2">
            <span className="tech-badge">React</span>
            <span className="tech-badge">TypeScript</span>
            <span className="tech-badge">Next.js</span>
          </div>

          <Button className="btn-primary">
            <Link href="/interview/1/feedback">
              Check Feedback
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;