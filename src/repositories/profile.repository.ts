import { filter, get, keyBy, map } from 'lodash';
import { LinkedinContactInfo } from 'src/entities/linkedin-contact-info-response.entity';

import { Client } from '../core/client';
import { COMPANY_TYPE, LinkedInCompany } from '../entities/linkedin-company.entity';
import { LinkedInMiniProfile, MINI_PROFILE_TYPE } from '../entities/linkedin-mini-profile.entity';
import {
  LinkedInProfile,
  PROFILE_TYPE,
  ProfileCourse,
  PROFILE_COURSE_TYPE,
  ProfileEducation,
  PROFILE_EDUCATION_TYPE,
  PROFILE_HONOR_TYPE,
  ProfileHonor,
  PROFILE_LANGUAGE_TYPE,
  ProfileLanguage,
  PROFILE_ORGANIZATION_TYPE,
  ProfileOrganization,
  PROFILE_POSITION_TYPE,
  ProfilePosition,
  PROFILE_PROJECT_TYPE,
  ProfileProject,
  PROFILE_PUBLICATION_TYPE,
  ProfilePublication,
  PROFILE_SKILL_TYPE,
  ProfileSkill,
  PROFILE_VOLUNTEER_EXPERIENCE_TYPE,
  ProfileVolunteerExperience,
  ProfileCertification,
  PROFILE_UPDATE_V2,
  PROFILE_CERTIFICATION_TYPE,
  LinkedInProfileSharedFeed,
  PROFILE_POSITION_GROUP_TYPE,
  ProfilePositionGroup,
} from '../entities/linkedin-profile.entity';
import { LinkedInVectorImage } from '../entities/linkedin-vector-image.entity';
import { MiniProfile, ProfileId } from '../entities/mini-profile.entity';
import { Profile } from '../entities/profile.entity';
import { extractPublicIdentifier } from '../utils/common-li';

const getProfilePictureUrls = (picture?: LinkedInVectorImage): string[] =>
  map(picture?.artifacts, artifact => `${picture?.rootUrl}${artifact.fileIdentifyingUrlPathSegment}`);

const transformMiniProfile = (miniProfile: LinkedInMiniProfile): MiniProfile => ({
  ...miniProfile,
  pictureUrls: getProfilePictureUrls(miniProfile.picture),
  profileId: (miniProfile.entityUrn || '').replace('urn:li:fs_miniProfile:', ''),
});

export const getProfilesFromResponse = <T extends { included: (LinkedInMiniProfile | { $type: string })[] }>(
  response: T,
): Record<ProfileId, MiniProfile> => {
  const miniProfiles = filter(response.included, p => p.$type === MINI_PROFILE_TYPE) as LinkedInMiniProfile[];

  const transformedMiniProfiles = miniProfiles.map((miniProfile: LinkedInMiniProfile) => transformMiniProfile(miniProfile));

  return keyBy(transformedMiniProfiles, 'profileId');
};

export class ProfileRepository {
  private client: Client;

  constructor({ client }: { client: Client }) {
    this.client = client;
  }

  async getProfile({ publicIdentifier }: { publicIdentifier: string }): Promise<Profile> {
    this.client.request.updateHeaders({ accept: 'application/vnd.linkedin.normalized+json+2.1' });

    publicIdentifier = extractPublicIdentifier(publicIdentifier);
    publicIdentifier = decodeURIComponent(publicIdentifier);
    const response = await this.client.request.profile.getProfile({ publicIdentifier });

    const results = response.included || [];

    // Profile
    const profile = results.find(
      r => r.$type === PROFILE_TYPE && (r as LinkedInProfile).publicIdentifier === publicIdentifier,
    ) as LinkedInProfile;

    // Company
    const company = results.find(
      r => r.$type === COMPANY_TYPE && profile.headline.includes((r as LinkedInCompany).name),
    ) as LinkedInCompany;

    // Certifications
    const certifications = results.filter(r => r.$type === PROFILE_CERTIFICATION_TYPE) as ProfileCertification[];

    // Courses
    const courses = results.filter(r => r.$type === PROFILE_COURSE_TYPE) as ProfileCourse[];

    // Educations
    const educations = results.filter(r => r.$type === PROFILE_EDUCATION_TYPE) as ProfileEducation[];

    // Honors
    const honors = results.filter(r => r.$type === PROFILE_HONOR_TYPE) as ProfileHonor[];

    // Languages
    const languages = results.filter(r => r.$type === PROFILE_LANGUAGE_TYPE) as ProfileLanguage[];

    // Organizations
    const organizations = results.filter(r => r.$type === PROFILE_ORGANIZATION_TYPE) as ProfileOrganization[];

    // Positions
    const positions = results.filter(r => r.$type === PROFILE_POSITION_TYPE) as ProfilePosition[];

    // PositionGroups
    const positionGroups = results.filter(r => r.$type === PROFILE_POSITION_GROUP_TYPE) as ProfilePositionGroup[];

    // Projects
    const projects = results.filter(r => r.$type === PROFILE_PROJECT_TYPE) as ProfileProject[];

    // Publications
    const publications = results.filter(r => r.$type === PROFILE_PUBLICATION_TYPE) as ProfilePublication[];

    // Skills
    const skills = results.filter(r => r.$type === PROFILE_SKILL_TYPE) as ProfileSkill[];

    // VolunteerExperiences
    const volunteerExperiences = results.filter(
      r => r.$type === PROFILE_VOLUNTEER_EXPERIENCE_TYPE,
    ) as ProfileVolunteerExperience[];

    const pictureUrls = getProfilePictureUrls(get(profile, 'profilePicture.displayImageReference.vectorImage', {}));

    const res = {
      ...profile,
      company,
      positionGroups,
      certifications,
      educations,
      courses,
      pictureUrls,
      honors,
      languages,
      organizations,
      positions,
      projects,
      publications,
      skills,
      volunteerExperiences,
    };

    return res;
  }

  async getProfileSharedFeed({ profileUrn }: { profileUrn: string }): Promise<LinkedInProfileSharedFeed[]> {
    const latestPosts = await this.client.request.profile
      .getProfileSharedFeed({
        profileUrn,
      })
      .then(postsActivities => (postsActivities.included || []).filter(r => r.$type === PROFILE_UPDATE_V2));

    return latestPosts;
  }

  async getOwnProfile(): Promise<Profile | null> {
    const response = await this.client.request.profile.getOwnProfile();

    const miniProfile = response?.included?.find(r => r.$type === MINI_PROFILE_TYPE);

    if (!miniProfile) {
      return null;
    }

    return this.getProfile(miniProfile);
  }

  async getContactInfo({ publicIdentifier }: { publicIdentifier: string }): Promise<LinkedinContactInfo> {
    this.client.request.updateHeaders({ accept: 'application/vnd.linkedin.normalized+json+2.1' });

    publicIdentifier = extractPublicIdentifier(publicIdentifier);
    publicIdentifier = decodeURIComponent(publicIdentifier);
    const response = await this.client.request.profile.getContactInfo({ publicIdentifier });
    const results = response.data;
    return results;
  }
}
