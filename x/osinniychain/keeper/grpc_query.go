package keeper

import (
	"github.com/osinniyapps/osinniychain/x/osinniychain/types"
)

var _ types.QueryServer = Keeper{}
