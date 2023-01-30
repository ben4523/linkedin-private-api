import { LinkedInRequest } from '../core/linkedin-request';
import { GetReceivedInvitationResponse } from '../responses/received-invitations.response.get';
import { GetSentInvitationResponse } from '../responses/sent-invitations.response.get';
import { extractProfileId } from '../utils/common-li';

export class InvitationRequest {
  private request: LinkedInRequest;

  constructor({ request }: { request: LinkedInRequest }) {
    this.request = request;
  }

  public randomTransactionId(): string {
    const result = [];

    let strLength = 22;
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    while (strLength--) {
      result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
    }

    return result.join('') + '==';
  }

  sendEmailsInvitations({ emailsByComma, message }: { emailsByComma: string; message?: string }): Promise<void> {
    const emailsAsArray = emailsByComma.split(',');
    const invitations = [];

    for (let i = 0; i < emailsAsArray.length; i++) {
      const email = emailsAsArray[i];
      const trackingId = this.randomTransactionId();

      const invitation = {
        emberEntityName: 'growth/invitation/norm-invitation',
        invitee: {
          'com.linkedin.voyager.growth.invitation.InviteeEmail': {
            email,
          },
        },
        trackingId,
        message,
      };

      invitations.push(invitation);
    }

    const defaultCountryCode = 'ca';
    const uploadTransactionId = this.randomTransactionId();

    const requestPayload = {
      invitations,
      uploadTransactionId,
      defaultCountryCode,
    };

    return this.request.post('growth/normInvitations?action=batchCreate', requestPayload);
  }

  sendNoLimitInvitation({ profileId, message }: { profileId: string; message?: string }): Promise<void> {
    const invitations = [];
    const trackingId = this.randomTransactionId();
    const uploadTransactionId = this.randomTransactionId();

    const invitation = {
      emberEntityName: 'growth/invitation/norm-invitation',
      invitee: {
        'com.linkedin.voyager.growth.invitation.InviteeProfile': {
          profileId,
        },
      },
      message,
      trackingId,
    };

    invitations.push(invitation);

    const requestPayload = {
      uploadTransactionId,
      invitations,
    };

    return this.request.post('growth/normInvitations?action=batchCreate', requestPayload);
  }

  sendInvitation({ profileId, message }: { profileId: string; message?: string }): Promise<void> {
    profileId = extractProfileId(profileId);

    const requestPayload = {
      trackingId: this.randomTransactionId(),
      emberEntityName: 'growth/invitation/norm-invitation',
      invitee: {
        'com.linkedin.voyager.growth.invitation.InviteeProfile': {
          profileId,
        },
      },
      ...(message && { message }),
    };

    return this.request.post('growth/normInvitations', requestPayload);
  }

  getReceivedInvitations({ skip = 0, limit = 100 } = {}): Promise<GetReceivedInvitationResponse> {
    const queryParams = {
      start: skip,
      count: limit,
      q: 'receivedInvitation',
    };

    return this.request.get<GetReceivedInvitationResponse>('relationships/invitationViews', {
      params: queryParams,
    });
  }

  getSentInvitations({ skip = 0, limit = 100 } = {}): Promise<GetSentInvitationResponse> {
    const queryParams = {
      start: skip,
      count: limit,
      invitationType: 'CONNECTION',
      q: 'invitationType',
    };

    return this.request.get<GetSentInvitationResponse>('relationships/sentInvitationViewsV2', {
      params: queryParams,
    });
  }
}
