import { orderBy } from 'lodash';

import { Client } from '../core/client';
import { ConversationId } from '../entities/conversation.entity';
import { EVENT_TYPE } from '../entities/linkedin-event.entity';
import { LinkedInMessageEvent } from '../entities/linkedin-message-event.entity';
import { MessageEventCreateResponse } from '../entities/message-create-response.entity';
import { MessageEvent } from '../entities/message-event.entity';
import { ProfileId } from '../entities/mini-profile.entity';
import { GetMessagesResponse } from '../responses/messages.response.get';
import { MessageScroller } from '../scrollers';
import { getProfilesFromResponse } from './profile.repository';

const participantToProfileId = (participant: string): string =>
  participant.replace(/urn:li:fs_messagingMember:\(|\)/g, '').split(',')[1];

export class MessageRepository {
  private client: Client;

  constructor({ client }: { client: Client }) {
    this.client = client;
  }

  getMessages({ conversationId, createdBefore }: { conversationId: ConversationId; createdBefore?: Date }): MessageScroller {
    return new MessageScroller({ conversationId, createdBefore, fetchMessages: this.fetchMessages.bind(this) });
  }

  async sendMessage({
    profileId,
    conversationId,
    text,
    attachments = [],
  }: {
    profileId?: ProfileId;
    conversationId?: ConversationId;
    text: string;
    attachments?: any[];
  }): Promise<MessageEventCreateResponse> {
    const response = await this.client.request.message.sendMessage({ 
      profileId, 
      conversationId, 
      text,
      attachments
    });

    return { ...response?.data?.value, text };
  }

  getAttachment({ url }: { url: string }): Promise<unknown> {
    return this.client.request.message.getAttachment({ url });
  }

  uploadAttachmentMetadata({ 
    filename, 
    fileSize 
  }: { 
    filename: string, 
    fileSize: number 
  }): Promise<unknown> {
    return this.client.request.message.uploadAttachmentMetadata({ filename, fileSize });
  }

  uploadAttachment({ 
    file,
    uploadUrl,
    fileSize,
    mimetype
  }: {
    file: any,
    uploadUrl: string,
    fileSize: number,
    mimetype: string
  }): Promise<unknown> {
    return this.client.request.message.uploadAttachment({ file, uploadUrl, fileSize, mimetype });
  }

  private async fetchMessages({
    conversationId,
    createdBefore,
  }: {
    conversationId: ConversationId;
    createdBefore?: Date;
  }): Promise<MessageEvent[]> {
    this.client.request.updateHeaders({accept:'application/vnd.linkedin.normalized+json+2.1'});
    
    const response = await this.client.request.message.getMessages({ conversationId, createdBefore });
    const messages = response.included.filter(p => p.$type === EVENT_TYPE) as LinkedInMessageEvent[];
    const profiles = getProfilesFromResponse<GetMessagesResponse>(response);

    return orderBy(messages, 'createdAt', 'desc').map(message => ({
      ...message,
      text: message?.eventContent?.attributedBody?.text,
      sentFrom: profiles[participantToProfileId(message['*from'])],
    }));
  }
}
