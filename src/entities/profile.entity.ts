import { LinkedInCompany } from './linkedin-company.entity';
import {
  LinkedInProfile,
  ProfileCourse,
  ProfileEducation,
  ProfileHonor,
  ProfileLanguage,
  ProfileOrganization,
  ProfilePosition,
  ProfileProject,
  ProfilePublication,
  ProfileSkill,
  ProfileVolunteerExperience,
  ProfileCertification,
  ProfilePositionGroup,
} from './linkedin-profile.entity';

export interface Profile extends LinkedInProfile {
  company: LinkedInCompany;

  courses: ProfileCourse[];

  educations: ProfileEducation[];

  honors: ProfileHonor[];

  languages: ProfileLanguage[];

  organizations: ProfileOrganization[];

  positions: ProfilePosition[];

  projects: ProfileProject[];

  publications: ProfilePublication[];

  skills: ProfileSkill[];

  volunteerExperiences: ProfileVolunteerExperience[];

  certifications: ProfileCertification[];

  positionGroups: ProfilePositionGroup[];

  pictureUrls: string[];
}
