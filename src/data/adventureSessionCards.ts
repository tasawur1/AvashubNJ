import type { CohortSessionCard } from "@/components/page/AdventureCohortsCarousel";
import { cohortsImages } from "@/data/pageImages/cohortsImages";

export { type CohortSessionCard };

export const adventureSessionCards: CohortSessionCard[] = [
  {
    name: "Car Wash Crew",
    image: cohortsImages.carWashCrew,
    pillColor: "teal",
    skills: ["Following Directions", "Motor Planning", "Sequencing", "Teamwork"],
  },
  {
    name: "Bakery Brigade",
    image: cohortsImages.bakeryBrigade,
    pillColor: "purple",
    skills: ["Fine Motor Skills", "Measuring", "Focus & Attention", "Creativity"],
  },
  {
    name: "Garden Explorers",
    image: cohortsImages.gardenExplorers,
    pillColor: "teal",
    skills: ["Sensory Exploration", "Responsibility", "Problem Solving", "Gross Motor Skills"],
  },
  {
    name: "Market Masters",
    image: cohortsImages.marketMasters,
    pillColor: "gold",
    skills: ["Social Interaction", "Math Concepts", "Decision Making", "Community Skills"],
  },
  {
    name: "Pet Care Academy",
    image: cohortsImages.petCareAcademy,
    pillColor: "purple",
    skills: ["Empathy", "Gentle Hands", "Communication", "Routine & Care"],
  },
  {
    name: "Rescue Rangers",
    image: cohortsImages.rescueRangers,
    pillColor: "teal",
    skills: ["Gross Motor Skills", "Motor Planning", "Teamwork", "Confidence"],
  },
];

export const lifeReadyCategoryCards: CohortSessionCard[] = [
  {
    name: "Self-Care & Grooming",
    image: cohortsImages.lifeReadySelfCare,
    pillColor: "purple",
    skills: [
      "Morning & evening routines",
      "Showering and hygiene",
      "Hair care",
      "Oral care",
      "Dressing for the weather",
      "Clothing selection",
      "Grooming",
      "Personal responsibility",
    ],
  },
  {
    name: "Home Independence",
    image: cohortsImages.lifeReadyHomeIndependence,
    pillColor: "teal",
    skills: [
      "Making the bed",
      "Laundry",
      "Folding clothes",
      "Closet organization",
      "Cleaning bedrooms",
      "Bathroom cleaning",
      "Household chores",
      "Organization systems",
    ],
  },
  {
    name: "Kitchen Confidence",
    image: cohortsImages.lifeReadyKitchen,
    pillColor: "gold",
    skills: [
      "Simple meal preparation",
      "Breakfast & lunch routines",
      "Kitchen safety",
      "Reading recipes",
      "Cleaning up",
      "Loading and unloading the dishwasher",
      "Food organization",
    ],
  },
  {
    name: "Community & Money Skills",
    image: cohortsImages.lifeReadyCommunity,
    pillColor: "teal",
    skills: [
      "Grocery shopping",
      "Budgeting",
      "Comparing prices",
      "Community safety",
      "Planning purchases",
      "Time management",
    ],
  },
  {
    name: "Job Ready & Beyond",
    image: cohortsImages.lifeReadyJobReady,
    pillColor: "purple",
    skills: [
      "Workplace routines",
      "Communication",
      "Interview basics",
      "Organization",
      "Self-advocacy",
      "Teamwork",
      "Responsibility",
    ],
  },
];
