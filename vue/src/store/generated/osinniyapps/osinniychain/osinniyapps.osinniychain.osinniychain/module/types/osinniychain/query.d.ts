import { Reader, Writer } from 'protobufjs/minimal';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
import { Message } from '../osinniychain/msg';
export declare const protobufPackage = "osinniyapps.osinniychain.osinniychain";
/** this line is used by starport scaffolding # 3 */
export interface QueryMessagesRequest {
    /** Adding pagination to request */
    pagination: PageRequest | undefined;
}
export interface QueryMessagesResponse {
    /**
     * string msg = 1;
     * Returning a list of posts
     */
    Msg: Message[];
    /** Adding pagination to response */
    pagination: PageResponse | undefined;
}
export declare const QueryMessagesRequest: {
    encode(message: QueryMessagesRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryMessagesRequest;
    fromJSON(object: any): QueryMessagesRequest;
    toJSON(message: QueryMessagesRequest): unknown;
    fromPartial(object: DeepPartial<QueryMessagesRequest>): QueryMessagesRequest;
};
export declare const QueryMessagesResponse: {
    encode(message: QueryMessagesResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryMessagesResponse;
    fromJSON(object: any): QueryMessagesResponse;
    toJSON(message: QueryMessagesResponse): unknown;
    fromPartial(object: DeepPartial<QueryMessagesResponse>): QueryMessagesResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a list of messages items. */
    Messages(request: QueryMessagesRequest): Promise<QueryMessagesResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Messages(request: QueryMessagesRequest): Promise<QueryMessagesResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
