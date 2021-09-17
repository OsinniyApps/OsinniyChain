import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "osinniyapps.osinniychain.osinniychain";
export interface Message {
    creator: string;
    id: number;
    msg: string;
}
export declare const Message: {
    encode(message: Message, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Message;
    fromJSON(object: any): Message;
    toJSON(message: Message): unknown;
    fromPartial(object: DeepPartial<Message>): Message;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
