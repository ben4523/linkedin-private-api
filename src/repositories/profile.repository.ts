import { filter, get, keyBy, map } from 'lodash';

import { Client } from '../core/client';
import { COMPANY_TYPE, LinkedInCompany } from '../entities/linkedin-company.entity';
import { LinkedInMiniProfile, MINI_PROFILE_TYPE } from '../entities/linkedin-mini-profile.entity';
import { LinkedInProfile, PROFILE_TYPE } from '../entities/linkedin-profile.entity';
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
    this.client.request.updateHeaders({accept:'application/vnd.linkedin.normalized+json+2.1'});

    publicIdentifier = extractPublicIdentifier(publicIdentifier);

    const response = await this.client.request.profile.getProfile({ publicIdentifier });

    const results = response.included || [];

    const profile = results.find(r => r.$type === PROFILE_TYPE && r.publicIdentifier === publicIdentifier) as LinkedInProfile;

    if(!profile){
      throw new Error('Profile with publicIdedntifier '+ publicIdentifier +' not found!');
    }

    let company = null as unknown as LinkedInCompany;
    if(profile.headline)
           company = results.find(r => r.$type === COMPANY_TYPE && profile.headline.includes(r.name)) as LinkedInCompany;

    if(!company){
      let allCompanies = results.filter(r => r.$type === COMPANY_TYPE);
      if(allCompanies.length > 0){
        company = allCompanies[allCompanies.length-1] as LinkedInCompany;
      }
    }
           
    const pictureUrls = getProfilePictureUrls(get(profile, 'profilePicture.displayImageReference.vectorImage', {}));

    return {
      ...profile,
      company,
      pictureUrls,
    };
  }

  async getOwnProfile(): Promise<Profile | null> {
    const response = await this.client.request.profile.getOwnProfile();

    const miniProfile = response?.included?.find(r => r.$type === MINI_PROFILE_TYPE);

    if (!miniProfile) {
      return null;
    }

    return this.getProfile(miniProfile);
  }
}
