// data.ts

export type TabType = "nearMe" | "forYou";

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  distance?: string; // For "Near Me"
  relevance?: number; // For "For You"
  bio: string;
  interests: string[];
  imageUrl: string;
  gender: "male" | "female";
  location: string;
  mutuals: number;
}

const commonInterests = [
  "Photography",
  "Hiking",
  "Coffee",
  "Tech",
  "Music",
  "Design",
  "Fitness",
  "Travel",
];

// Dummy Images from Unsplash (using specific IDs for consistency)
const images = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop",
];

export const nearMeData: UserProfile[] = [
  {
    id: "n1",
    name: "Sarah",
    age: 24,
    distance: "0.5 km away",
    bio: "Love outdoor adventures and finding new coffee spots in the city.",
    interests: ["Hiking", "Coffee", "Dogs"],
    imageUrl: images[0],
    gender: "female",
    location: "New York, NY",
    mutuals: 2,
  },
  {
    id: "n2",
    name: "Michael",
    age: 29,
    distance: "1.2 km away",
    bio: "Tech entrepreneur. Always building something new. Lets chat about startups.",
    interests: ["Tech", "Fitness", "Reading"],
    imageUrl: images[1],
    gender: "male",
    location: "San Francisco, CA",
    mutuals: 3,
  },
  {
    id: "n3",
    name: "Jessica",
    age: 26,
    distance: "3 km away",
    bio: "Digital nomad currently in town. Looking for photography buddies.",
    interests: ["Photography", "Travel", "Art"],
    imageUrl: images[2],
    gender: "female",
    location: "Los Angeles, CA",
    mutuals: 1,
  },
  {
    id: "n4",
    name: "David",
    age: 31,
    distance: "4.5 km away",
    bio: "Musician and sound engineer. Catch me at the local jazz clubs.",
    interests: ["Music", "Vinyl", "Whiskey"],
    imageUrl: images[3],
    gender: "male",
    location: "New York, NY",
    mutuals: 2,
  },
  {
    id: "f1",
    name: "Emily",
    age: 27,
    relevance: 95,
    bio: "UX Designer. Passionate about clean aesthetics and sustainable living.",
    interests: ["Design", "Yoga", "Plants"],
    imageUrl: images[4],
    gender: "female",
    location: "New York, NY",
    mutuals: 2,
  },
  {
    id: "f2",
    name: "Chris",
    age: 25,
    relevance: 88,
    bio: "Front-end dev and weekend surfer. Seeking genuine connections.",
    interests: ["Tech", "Surfing", "Gaming"],
    imageUrl: images[3],
    gender: "male",
    location: "New York, NY",
    mutuals: 2,
  },
  {
    id: "f3",
    name: "Amanda",
    age: 23,
    relevance: 82,
    bio: "Aspiring chef. I show love through food. Wanna try my new recipe?",
    interests: ["Cooking", "Wine", "Travel"],
    imageUrl: images[0],
    gender: "female",
    location: "New York, NY",
    mutuals: 2,
  },
];
