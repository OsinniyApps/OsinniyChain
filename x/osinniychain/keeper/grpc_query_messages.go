package keeper

import (
	"context"

    "github.com/osinniyapps/osinniychain/x/osinniychain/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Messages(goCtx context.Context, req *types.QueryMessagesRequest) (*types.QueryMessagesResponse, error) {
	// Throw an error if request is nil
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	// Define a variable that will store a list of messages
	var messages []*types.Message
	// Get context with the information about the environment
	ctx := sdk.UnwrapSDKContext(goCtx)
	// Get the key-value module store using the store key (in our case store key is "osinniychain")
	store := ctx.KVStore(k.storeKey)
	// Get the part of the store that keeps messages (using msg key, which is "Msg-value-")
	msgStore := prefix.NewStore(store, []byte(types.MsgKey))
	// Paginate the messages store based on PageRequest
	pageRes, err := query.Paginate(msgStore, req.Pagination, func(key []byte, value []byte) error {
		var msg types.Message
		if err := k.cdc.UnmarshalBinaryBare(value, &msg); err != nil {
			return err
		}
		messages = append(messages, &msg)
		return nil
	})
	// Throw an error if pagination failed
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	// Return a struct containing a list of messages and pagination info
	return &types.QueryMessagesResponse{Msg: messages, Pagination: pageRes}, nil
}
