import { castArray } from 'lodash';

import { LinkedInRequest } from '../core/linkedin-request';
import { ConversationId } from '../entities/conversation.entity';
import { ProfileId } from '../entities/mini-profile.entity';
import { GetConversationResponse } from '../responses/conversation.response.get';
import { GetConversationsResponse } from '../responses/conversations.response.get';

export class ConversationRequest {
  private request: LinkedInRequest;

  constructor({ request }: { request: LinkedInRequest }) {
    this.request = request;
  }

  markConversationAsRead({ sdkEntityUrn }: { sdkEntityUrn: string }): Promise<void> {
    const requestPayload = {
      entities: {
        [sdkEntityUrn]: {
          patch: {
            $set: {
              read: true,
            },
          },
        },
      },
    };

    const encodedEntity = encodeURIComponent(sdkEntityUrn).replace('(', '%28').replace(')', '%29');
    return this.request.post(`voyagerMessagingDashMessengerConversations?ids=List(${encodedEntity})`, requestPayload);
  }

  getConversation({ conversationId }: { conversationId: ConversationId }): Promise<GetConversationResponse> {
    return this.request.get<GetConversationResponse>(`messaging/conversations/${conversationId}`);
  }

  getConversations({
    recipients,
    createdBefore,
    unread,
  }: {
    recipients?: ProfileId | ProfileId[];
    createdBefore?: Date;
    unread?: boolean;
  }): Promise<GetConversationsResponse> {
    const queryParams = {
      ...(recipients && { q: 'participants', recipients: castArray(recipients) }),
      ...(createdBefore && { createdBefore: createdBefore.getTime() }),
      ...(unread && { filters: castArray('UNREAD') }),
      ...(unread && { q: 'search' }),
    };

    return this.request.get<GetConversationsResponse>('messaging/conversations', {
      params: queryParams,
    });
  }
}
