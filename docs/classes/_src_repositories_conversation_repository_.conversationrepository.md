**[linkedin-private-api](../README.md)**

> [Globals](../globals.md) / ["src/repositories/conversation.repository"](../modules/_src_repositories_conversation_repository_.md) / ConversationRepository

# Class: ConversationRepository

## Hierarchy

* **ConversationRepository**

## Index

### Constructors

* [constructor](_src_repositories_conversation_repository_.conversationrepository.md#constructor)

### Methods

* [getConversation](_src_repositories_conversation_repository_.conversationrepository.md#getconversation)
* [getConversations](_src_repositories_conversation_repository_.conversationrepository.md#getconversations)
* [markConversationAsRead](_src_repositories_conversation_repository_.conversationrepository.md#markconversationasread)

## Constructors

### constructor

\+ **new ConversationRepository**(`__namedParameters`: { client: [Client](_src_core_client_.client.md)  }): [ConversationRepository](_src_repositories_conversation_repository_.conversationrepository.md)

*Defined in [src/repositories/conversation.repository.ts:36](https://github.com/cosiall/linkedin-private-api/blob/e4e3ce2/src/repositories/conversation.repository.ts#L36)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { client: [Client](_src_core_client_.client.md)  } |

**Returns:** [ConversationRepository](_src_repositories_conversation_repository_.conversationrepository.md)

## Methods

### getConversation

▸ **getConversation**(`__namedParameters`: { conversationId: string  }): Promise<[Conversation](../interfaces/_src_entities_conversation_entity_.conversation.md)\>

*Defined in [src/repositories/conversation.repository.ts:48](https://github.com/cosiall/linkedin-private-api/blob/e4e3ce2/src/repositories/conversation.repository.ts#L48)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { conversationId: string  } |

**Returns:** Promise<[Conversation](../interfaces/_src_entities_conversation_entity_.conversation.md)\>

___

### getConversations

▸ **getConversations**(`__namedParameters?`: { createdBefore: undefined \| Date ; recipients: undefined \| string \| string[] ; unread: undefined \| false \| true  }): [ConversationScroller](_src_scrollers_conversation_scroller_.conversationscroller.md)

*Defined in [src/repositories/conversation.repository.ts:60](https://github.com/cosiall/linkedin-private-api/blob/e4e3ce2/src/repositories/conversation.repository.ts#L60)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { createdBefore: undefined \| Date ; recipients: undefined \| string \| string[] ; unread: undefined \| false \| true  } | {} |

**Returns:** [ConversationScroller](_src_scrollers_conversation_scroller_.conversationscroller.md)

___

### markConversationAsRead

▸ **markConversationAsRead**(`__namedParameters`: { sdkEntityUrn: string  }): Promise<void\>

*Defined in [src/repositories/conversation.repository.ts:42](https://github.com/cosiall/linkedin-private-api/blob/e4e3ce2/src/repositories/conversation.repository.ts#L42)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { sdkEntityUrn: string  } |

**Returns:** Promise<void\>
