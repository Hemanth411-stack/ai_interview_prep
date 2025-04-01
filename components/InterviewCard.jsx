"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const InterviewCard = ({ role, type, techstack, date, actionText, actionLink }) => {
  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-800">
            <p className="badge-text capitalize">{type || 'Technical'}</p>
          </div>

          {/* Cover Image - Using the first tech as placeholder */}
          <Image
            src={`/tech-icons/${techstack?.[0]?.toLowerCase() || 'default'}.png`} 
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />
          {/* Interview Role */}
          <h3 className="mt-5 capitalize">{role || 'Interview'}</h3>

          {/* Date */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{date || 'No date'}</p>
            </div>
          </div>

          {/* Placeholder Feedback Text */}
          <p className="line-clamp-2 mt-5">
            Practice questions for {role || 'this position'} focusing on {type || 'technical'} aspects.
          </p>
        </div>

        <div className="flex flex-row justify-between">
          {/* Tech Stack */}
          <div className="flex gap-2 flex-wrap">
            {techstack?.map((tech, index) => (
              <span key={index} className="tech-badge capitalize">
                {tech}
              </span>
            ))}
          </div>

          <Button className="btn-primary">
            <Link href={actionLink || '#'}>
              {actionText || 'Start Now'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;