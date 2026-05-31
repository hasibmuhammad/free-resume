import { FeaturedSkill } from "@/types/parsedResume";

export const initialFeaturedSkills: FeaturedSkill[] = Array.from(
  { length: 6 },
  () => ({ skill: "", rating: 4 })
);
