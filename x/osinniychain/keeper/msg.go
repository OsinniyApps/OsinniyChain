package keeper

import (
	"encoding/binary"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/osinniyapps/osinniychain/x/osinniychain/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
)

func (k Keeper) AppendMsg(ctx sdk.Context, msg types.Message) uint64 {
	// Get the current number of messages in the store
	count := k.GetMsgCount(ctx)
	// Assign an ID to the message based on the number of messages in the store
	msg.Id = count
	// Get the store
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.MsgKey))
	// Convert the message ID into bytes
	byteKey := make([]byte, 8)
	binary.BigEndian.PutUint64(byteKey, msg.Id)
	// Marshal the message into bytes
	appendedValue := k.cdc.MustMarshalBinaryBare(&msg)
	// Insert the message bytes using message ID as a key
	store.Set(byteKey, appendedValue)
	// Update the message count
	k.SetMsgCount(ctx, count+1)
	return count
}

func (k Keeper) GetMsgCount(ctx sdk.Context) uint64 {
	// Get the store using storeKey (which is "osinniychain") and MsgCountKey (which is "Msg-count-")
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.MsgCountKey))
	// Convert the MsgCountKey to bytes
	byteKey := []byte(types.MsgCountKey)
	// Get the value of the count
	bz := store.Get(byteKey)
	// Return zero if the count value is not found (for example, it's the first message)
	if bz == nil {
		return 0
	}
	// Convert the count into a uint64
	return binary.BigEndian.Uint64(bz)
}

func (k Keeper) SetMsgCount(ctx sdk.Context, count uint64) {
	// Get the store using storeKey (which is "blog") and MsgCountKey (which is "Msg-count-")
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.MsgCountKey))
	// Convert the MsgCountKey to bytes
	byteKey := []byte(types.MsgCountKey)
	// Convert count from uint64 to string and get bytes
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	// Set the value of Msg-count- to count
	store.Set(byteKey, bz)
}
