export class StacksTransaction {
    version: TransactionVersion;
    chainId: ChainID;
    auth: Authorization;
    anchorMode: AnchorMode;
    payload: Payload;
    postConditionMode: PostConditionMode;
    postConditions: LengthPrefixedList;
  
    constructor(
      version: TransactionVersion,
      auth: Authorization,
      payload: Payload,
      postConditions?: LengthPrefixedList,
      postConditionMode?: PostConditionMode,
      anchorMode?: AnchorMode,
      chainId?: ChainID
    ) {
      this.version = version;
      this.auth = auth;
      this.payload = payload;
      this.chainId = chainId ?? DEFAULT_CHAIN_ID;
      this.postConditionMode = postConditionMode ?? PostConditionMode.Deny;
      this.postConditions = postConditions ?? createLPList([]);
  
      if (anchorMode) {
        this.anchorMode = anchorMode;
      } else {
        switch (payload.payloadType) {
          case PayloadType.Coinbase:
          case PayloadType.PoisonMicroblock: {
            this.anchorMode = AnchorMode.OnChainOnly;
            break;
          }
          case PayloadType.ContractCall:
          case PayloadType.SmartContract:
          case PayloadType.TokenTransfer: {
            this.anchorMode = AnchorMode.Any;
            break;
          }
        }
      }
    }