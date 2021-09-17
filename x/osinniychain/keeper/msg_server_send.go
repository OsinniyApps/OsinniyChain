package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/osinniyapps/osinniychain/x/osinniychain/types"
)

func (k msgServer) Send(goCtx context.Context, msg *types.MsgSend) (*types.MsgSendResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var wMsg = types.Message{
		Creator: msg.Creator,
		Msg: msg.Msg,
	}

	id := k.AppendMsg(ctx, wMsg)

	return &types.MsgSendResponse{Id: id}, nil
}
