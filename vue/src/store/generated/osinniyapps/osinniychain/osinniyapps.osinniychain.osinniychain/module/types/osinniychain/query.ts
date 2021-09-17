/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination'
import { Message } from '../osinniychain/msg'

export const protobufPackage = 'osinniyapps.osinniychain.osinniychain'

/** this line is used by starport scaffolding # 3 */
export interface QueryMessagesRequest {
  /** Adding pagination to request */
  pagination: PageRequest | undefined
}

export interface QueryMessagesResponse {
  /**
   * string msg = 1;
   * Returning a list of posts
   */
  Msg: Message[]
  /** Adding pagination to response */
  pagination: PageResponse | undefined
}

const baseQueryMessagesRequest: object = {}

export const QueryMessagesRequest = {
  encode(message: QueryMessagesRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryMessagesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryMessagesRequest } as QueryMessagesRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryMessagesRequest {
    const message = { ...baseQueryMessagesRequest } as QueryMessagesRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryMessagesRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryMessagesRequest>): QueryMessagesRequest {
    const message = { ...baseQueryMessagesRequest } as QueryMessagesRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryMessagesResponse: object = {}

export const QueryMessagesResponse = {
  encode(message: QueryMessagesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.Msg) {
      Message.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryMessagesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryMessagesResponse } as QueryMessagesResponse
    message.Msg = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.Msg.push(Message.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryMessagesResponse {
    const message = { ...baseQueryMessagesResponse } as QueryMessagesResponse
    message.Msg = []
    if (object.Msg !== undefined && object.Msg !== null) {
      for (const e of object.Msg) {
        message.Msg.push(Message.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryMessagesResponse): unknown {
    const obj: any = {}
    if (message.Msg) {
      obj.Msg = message.Msg.map((e) => (e ? Message.toJSON(e) : undefined))
    } else {
      obj.Msg = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryMessagesResponse>): QueryMessagesResponse {
    const message = { ...baseQueryMessagesResponse } as QueryMessagesResponse
    message.Msg = []
    if (object.Msg !== undefined && object.Msg !== null) {
      for (const e of object.Msg) {
        message.Msg.push(Message.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a list of messages items. */
  Messages(request: QueryMessagesRequest): Promise<QueryMessagesResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  Messages(request: QueryMessagesRequest): Promise<QueryMessagesResponse> {
    const data = QueryMessagesRequest.encode(request).finish()
    const promise = this.rpc.request('osinniyapps.osinniychain.osinniychain.Query', 'Messages', data)
    return promise.then((data) => QueryMessagesResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>
