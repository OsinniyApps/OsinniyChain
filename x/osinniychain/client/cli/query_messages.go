package cli

import (
    "strconv"
	"github.com/spf13/cobra"

    "github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/osinniyapps/osinniychain/x/osinniychain/types"
)

var _ = strconv.Itoa(0)

func CmdMessages() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "messages",
		Short: "Query messages",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) error {
      
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryMessagesRequest{
                
            }

            

			res, err := queryClient.Messages(cmd.Context(), params)
            if err != nil {
                return err
            }

            return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

    return cmd
}