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

  getConversation({ conversationId }: { conversationId: ConversationId }): Promise<GetConversationResponse> {
    const queryParams = {
      keyVersion: 'LEGACY_INBOX',
    };

    return this.request.get<GetConversationResponse>(`messaging/conversations/${conversationId}`, {
      params: queryParams,
    });
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
      keyVersion: 'LEGACY_INBOX',
      ...(recipients && { q: 'participants', recipients: castArray(recipients) }),
      ...(createdBefore && { createdBefore: createdBefore.getTime() }),
    };

    const queryParamsUnread = {
      filters: 'List(UNREAD)',
      q: 'search',
    };
    
    if(unread){
      return this.request.get<GetConversationsResponse>('messaging/conversations', {
        params: queryParamsUnread,
      });
    }

    return this.request.get<GetConversationsResponse>('messaging/conversations', {
      params: queryParams,
    });
  }
}
