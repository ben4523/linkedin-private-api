**[linkedin-private-api](../README.md)**

> [Globals](../globals.md) / ["src/repositories/message.repository"](../modules/_src_repositories_message_repository_.md) / MessageRepository

# Class: MessageRepository

## Hierarchy

* **MessageRepository**

## Index

### Constructors

* [constructor](_src_repositories_message_repository_.messagerepository.md#constructor)

### Methods

* [getAttachment](_src_repositories_message_repository_.messagerepository.md#getattachment)
* [getMessages](_src_repositories_message_repository_.messagerepository.md#getmessages)
* [sendMessage](_src_repositories_message_repository_.messagerepository.md#sendmessage)
* [uploadAttachment](_src_repositories_message_repository_.messagerepository.md#uploadattachment)
* [uploadAttachmentMetadata](_src_repositories_message_repository_.messagerepository.md#uploadattachmentmetadata)

## Constructors

### constructor

\+ **new MessageRepository**(`__namedParameters`: { client: [Client](_src_core_client_.client.md)  }): [MessageRepository](_src_repositories_message_repository_.messagerepository.md)

*Defined in [src/repositories/message.repository.ts:18](https://github.com/cosiall/linkedin-private-api/blob/7ebb094/src/repositories/message.repository.ts#L18)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { client: [Client](_src_core_client_.client.md)  } |

**Returns:** [MessageRepository](_src_repositories_message_repository_.messagerepository.md)

## Methods

### getAttachment

▸ **getAttachment**(`__namedParameters`: { url: string  }): Promise<unknown\>

*Defined in [src/repositories/message.repository.ts:49](https://github.com/cosiall/linkedin-private-api/blob/7ebb094/src/repositories/message.repository.ts#L49)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { url: string  } |

**Returns:** Promise<unknown\>

___

### getMessages

▸ **getMessages**(`__namedParameters`: { conversationId: string ; createdBefore: undefined \| Date  }): [MessageScroller](_src_scrollers_message_scroller_.messagescroller.md)

*Defined in [src/repositories/message.repository.ts:24](https://github.com/cosiall/linkedin-private-api/blob/7ebb094/src/repositories/message.repository.ts#L24)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { conversationId: string ; createdBefore: undefined \| Date  } |

**Returns:** [MessageScroller](_src_scrollers_message_scroller_.messagescroller.md)

___

### sendMessage

▸ **sendMessage**(`__namedParameters`: { attachments: any[] = []; conversationId: undefined \| string ; profileId: undefined \| string ; text: string  }): Promise<[MessageEventCreateResponse](../interfaces/_src_entities_message_create_response_entity_.messageeventcreateresponse.md)\>

*Defined in [src/repositories/message.repository.ts:28](https://github.com/cosiall/linkedin-private-api/blob/7ebb094/src/repositories/message.repository.ts#L28)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { attachments: any[] = []; conversationId: undefined \| string ; profileId: undefined \| string ; text: string  } |

**Returns:** Promise<[MessageEventCreateResponse](../interfaces/_src_entities_message_create_response_entity_.messageeventcreateresponse.md)\>

___

### uploadAttachment

▸ **uploadAttachment**(`__namedParameters`: { file: any ; fileSize: number ; mimetype: string ; uploadUrl: string  }): Promise<unknown\>

*Defined in [src/repositories/message.repository.ts:63](https://github.com/cosiall/linkedin-private-api/blob/7ebb094/src/repositories/message.repository.ts#L63)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { file: any ; fileSize: number ; mimetype: string ; uploadUrl: string  } |

**Returns:** Promise<unknown\>

___

### uploadAttachmentMetadata

▸ **uploadAttachmentMetadata**(`__namedParameters`: { fileSize: number ; filename: string  }): Promise<unknown\>

*Defined in [src/repositories/message.repository.ts:53](https://github.com/cosiall/linkedin-private-api/blob/7ebb094/src/repositories/message.repository.ts#L53)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { fileSize: number ; filename: string  } |

**Returns:** Promise<unknown\>
