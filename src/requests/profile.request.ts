import { GetContactInfoResponse } from 'src/responses/contact-info.response.get';
import { LinkedInRequest } from '../core/linkedin-request';
import { GetOwnProfileResponse } from '../responses/own-profile.response.get';
import { GetProfileResponse } from '../responses/profile.response.get';
import { LinkedInProfileSharedFeed } from '../entities/linkedin-profile.entity';
import { LinkedInCollectionResponse } from '../entities/linkedin-collection-response.entity';
export class ProfileRequest {
  private request: LinkedInRequest;

  constructor({ request }: { request: LinkedInRequest }) {
    this.request = request;
  }

  getProfile({
    publicIdentifier,
    decorationId,
    q,
  }: {
    publicIdentifier: string;
    decorationId?: string;
    q?: string;
  }): Promise<GetProfileResponse> {
    const queryParams = {
      q: q || 'memberIdentity',
      memberIdentity: publicIdentifier,
      decorationId: decorationId || 'com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-35',
    };

    return this.request.get<GetProfileResponse>('identity/dash/profiles', {
      params: queryParams,
    });
  }

  getProfileSharedFeed({
    profileUrn,
    count,
    includeLongTermHistory,
    numComments,
    numLikes,
  }: {
    profileUrn: string;
    count?: number;
    includeLongTermHistory?: boolean;
    numComments?: number;
    numLikes?: number;
  }): Promise<LinkedInCollectionResponse<never, LinkedInProfileSharedFeed>> {
    const queryParams = {
      q: 'memberShareFeed',
      count: count || 30,
      includeLongTermHistory: includeLongTermHistory || true,
      moduleKey: 'member-shares:phone',
      numComments: numComments || 0,
      numLikes: numLikes || 0,
      profileUrn,
    };

    return this.request.get<LinkedInCollectionResponse<never, LinkedInProfileSharedFeed>>('identity/profileUpdatesV2', {
      params: queryParams,
    });
  }

  getContactInfo({ publicIdentifier }: { publicIdentifier: string }): Promise<GetContactInfoResponse> {
    return this.request.get<GetContactInfoResponse>(`identity/profiles/${publicIdentifier}/profileContactInfo`);
  }

  getOwnProfile(): Promise<GetOwnProfileResponse> {
    return this.request.get<GetOwnProfileResponse>('me');
  }
}
