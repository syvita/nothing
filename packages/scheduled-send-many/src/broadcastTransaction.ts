export async function broadcastTransaction(
    transaction: StacksTransaction,
    network: StacksNetwork,
    attachment?: Buffer
  ): Promise<TxBroadcastResult> {
    const rawTx = transaction.serialize();
    const url = network.getBroadcastApiUrl();
  
    return broadcastRawTransaction(rawTx, url, attachment);
  }