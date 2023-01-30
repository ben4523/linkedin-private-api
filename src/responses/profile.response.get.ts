import { LinkedInCollectionResponse } from '../entities/linkedin-collection-response.entity';
import { LinkedInCompany } from '../entities/linkedin-company.entity';
import {
  LinkedInProfile,
  ProfileUrn,
  ProfileCourse,
  ProfileEducation,
  ProfileHonor,
  ProfileLanguage,
  ProfileOrganization,
  ProfilePosition,
  ProfileProject,
  ProfilePublication,
  ProfileSkill,
  ProfilePositionGroup,
  ProfileVolunteerExperience,
} from '../entities/linkedin-profile.entity';

export type GetProfileResponse = LinkedInCollectionResponse<
  ProfileUrn,
  | LinkedInProfile
  | ProfileCourse
  | ProfileEducation
  | LinkedInCompany
  | ProfileHonor
  | ProfileLanguage
  | ProfileOrganization
  | ProfilePosition
  | ProfileProject
  | ProfilePublication
  | ProfileSkill
  | ProfilePositionGroup
  | ProfileVolunteerExperience
>;
