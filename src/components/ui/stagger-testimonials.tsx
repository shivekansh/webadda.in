"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "My favorite solution in the market. We work 5x faster with webadda.in.",
    by: "Rajesh K., CEO at Veda Informatics",
    imgSrc: "https://images.unsplash.com/photo-1725567865912-6561e9908ad9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 1,
    testimonial: "I'm confident my data is safe with webadda.in. I can't say that about other providers.",
    by: "Rahul Sharma, CTO at Saffron Cloud Solutions", // Replaced Ananya S.
    imgSrc: "https://images.unsplash.com/photo-1538978939284-4ecb3fc4ad5e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 2,
    testimonial: "I know it's cliche, but we were lost before we found webadda.in. Can't thank you guys enough!",
    by: "Ravi Kumar, COO at Blue Horizon Digital", // Replaced Priya M.
    imgSrc: "https://images.unsplash.com/photo-1741454851818-678e9d16b412?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 3,
    testimonial: "webadda.in's products make planning for the future seamless. Can't recommend them enough!",
    by: "Vikram R., CFO at Bharat Financial Advisors", // Already male
    imgSrc: "https://images.unsplash.com/photo-1620578939447-f32be2f5cf7a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12.",
    by: "Aditya Patel, Head of Design at Lotus Web Designs", // Replaced Aditya P.
    imgSrc: "https://images.unsplash.com/photo-1727702079139-c5e78976dab5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 5,
    testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
    by: "Sanjay G., Product Manager at Aarohi Event Planners", // Already male
    imgSrc: "https://images.unsplash.com/photo-1718900109613-457f76a456b2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 6,
    testimonial: "Took some convincing, but now that we're on webadda.in, we're never going back.",
    by: "Rohit Singh, Marketing Director at Metro Digital Agency", // Replaced Neha K.
    imgSrc: "https://images.unsplash.com/photo-1744838724355-167aabff3610?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 7,
    testimonial: "I would be lost without webadda.in's in-depth analytics. The ROI is EASILY 100X for us.",
    by: "Rahul D., Data Scientist at Nandi Logistics", // Already male
    imgSrc: "https://images.unsplash.com/photo-1697096168580-16886cb51d1b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 8,
    testimonial: "It's just the best. Period.",
    by: "Farhan Ahmed, UX Designer at Tara Boutique", // Replaced Farhan A.
    imgSrc: "https://plus.unsplash.com/premium_photo-1725021058809-1433a29989d9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 9,
    testimonial: "I switched 5 years ago and never looked back.",
    by: "Arjun N., DevOps Engineer at Surya Electronics", // Already male
    imgSrc: "https://images.unsplash.com/photo-1712425718137-491250cfde88?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 10,
    testimonial: "I've been searching for a solution like webadda.in for YEARS. So glad I finally found one!",
    by: "Karthik S., Sales Director at Navya Real Estate", // Already male
    imgSrc: "https://images.unsplash.com/photo-1650378547737-23114cdce808?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 11,
    testimonial: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    by: "Amit Chauhan, HR Manager at Zenith Tutors", // Replaced Meera V.
    imgSrc: "https://images.unsplash.com/photo-1626544346705-1c0164970c41?q=80&w=903&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 12,
    testimonial: "webadda.in's customer support is unparalleled. They're always there when we need them.",
    by: "Suresh Menon, Customer Success Manager at Ananda Wellness Clinic", // Replaced Divya T.
    imgSrc: "https://plus.unsplash.com/premium_photo-1706803193101-f10b46f97ef7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 13,
    testimonial: "The efficiency gains we've seen since implementing webadda.in are off the charts!",
    by: "Ravi M., Operations Manager at Krishna Transport Co.", // Already male
    imgSrc: "https://plus.unsplash.com/premium_photo-1722682239201-21c8173e776b?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 14,
    testimonial: "webadda.in has revolutionized how we handle our workflow. It's a game-changer!",
    by: "Sneha L., Workflow Specialist at Sharma Sweets & Snacks", // Kept intact
    imgSrc: "https://plus.unsplash.com/premium_photo-1682092866811-6e21d00424e4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 15,
    testimonial: "The scalability of webadda.in's solution is impressive. It grows with our business seamlessly.",
    by: "Akansha K., Scaling Officer at Akansha Travels", // Kept intact
    imgSrc: "https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 16,
    testimonial: "I appreciate how webadda.in continually innovates. They're always one step ahead.",
    by: "Vikas Jain, Innovation Lead at Shivaay Productions", // Replaced Nandini R.
    imgSrc: "https://images.unsplash.com/photo-1559564424-d74d093d5b4e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 17,
    testimonial: "The ROI we've seen with webadda.in is incredible. It's paid for itself many times over.",
    by: "Varun Jain, Finance Analyst at Pinnacle Legal Associates", // Replaced Varun J.
    imgSrc: "https://images.unsplash.com/photo-1699607178193-7b87beae167f?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 18,
    testimonial: "webadda.in's platform is so robust, yet easy to use. It's the perfect balance.",
    by: "Yash W., Tech Lead at Aara Health Diagnostics", // Already male
    imgSrc: "https://plus.unsplash.com/premium_photo-1770512657206-51d30c75003c?q=80&w=1127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    tempId: 19,
    testimonial: "We've tried many solutions, but webadda.in stands out in terms of reliability and performance.",
    by: "Sandeep Rao, Performance Manager at Apex Dental Clinic", // Replaced Zoya H.
    imgSrc: "https://plus.unsplash.com/premium_photo-1723773707047-de0dbf24ca78?q=80&w=913&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-violet-600 text-white border-violet-500"
          : "z-0 bg-slate-900 text-slate-300 border-slate-800 hover:border-violet-500/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(139, 92, 246, 0.3)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-slate-800"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-14 rounded-full bg-slate-800 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px rgba(15, 23, 42, 1)"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium",
        isCenter ? "text-white" : "text-slate-100"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-white/80" : "text-slate-400"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-xl",
            "bg-slate-900 border-2 border-slate-800 text-slate-300 hover:bg-violet-600 hover:text-white hover:border-violet-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-xl",
            "bg-slate-900 border-2 border-slate-800 text-slate-300 hover:bg-violet-600 hover:text-white hover:border-violet-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
