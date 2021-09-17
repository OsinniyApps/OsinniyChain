/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'osinniyapps.osinniychain.osinniychain'

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgSend {
  creator: string
  msg: string
}

export interface MsgSendResponse {
  id: number
}

const baseMsgSend: object = { creator: '', msg: '' }

export const MsgSend = {
  encode(message: MsgSend, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.msg !== '') {
      writer.uint32(18).string(message.msg)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSend {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSend } as MsgSend
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.msg = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgSend {
    const message = { ...baseMsgSend } as MsgSend
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = String(object.msg)
    } else {
      message.msg = ''
    }
    return message
  },

  toJSON(message: MsgSend): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.msg !== undefined && (obj.msg = message.msg)
    return obj
  },

  fromPartial(object: DeepPartial<MsgSend>): MsgSend {
    const message = { ...baseMsgSend } as MsgSend
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = object.msg
    } else {
      message.msg = ''
    }
    return message
  }
}

const baseMsgSendResponse: object = { id: 0 }

export const MsgSendResponse = {
  encode(message: MsgSendResponse, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSendResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSendResponse } as MsgSendResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgSendResponse {
    const message = { ...baseMsgSendResponse } as MsgSendResponse
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id)
    } else {
      message.id = 0
    }
    return message
  },

  toJSON(message: MsgSendResponse): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    return obj
  },

  fromPartial(object: DeepPartial<MsgSendResponse>): MsgSendResponse {
    const message = { ...baseMsgSendResponse } as MsgSendResponse
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = 0
    }
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  Send(request: MsgSend): Promise<MsgSendResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  Send(request: MsgSend): Promise<MsgSendResponse> {
    const data = MsgSend.encode(request).finish()
    const promise = this.rpc.request('osinniyapps.osinniychain.osinniychain.Msg', 'Send', data)
    return promise.then((data) => MsgSendResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
