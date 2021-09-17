import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "osinniyapps.osinniychain.osinniychain";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgSend {
    creator: string;
    msg: string;
}
export interface MsgSendResponse {
    id: number;
}
export declare const MsgSend: {
    encode(message: MsgSend, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSend;
    fromJSON(object: any): MsgSend;
    toJSON(message: MsgSend): unknown;
    fromPartial(object: DeepPartial<MsgSend>): MsgSend;
};
export declare const MsgSendResponse: {
    encode(message: MsgSendResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSendResponse;
    fromJSON(object: any): MsgSendResponse;
    toJSON(message: MsgSendResponse): unknown;
    fromPartial(object: DeepPartial<MsgSendResponse>): MsgSendResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    Send(request: MsgSend): Promise<MsgSendResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    Send(request: MsgSend): Promise<MsgSendResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
