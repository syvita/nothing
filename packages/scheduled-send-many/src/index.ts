import { makeContractCall, broadcastTransaction, listCV, tupleCV, uintCV, standardPrincipalCV } from '@stacks/transactions';
import { HiroMainnet } from './network';

// use SyvitaMainnet() when it is up
const network = new HiroMainnet();

addEventListener("fetch", event => {
  event.respondWith(handleRequest())
})

async function handleRequest() {
  const value = await FAUCET_DB.list({ limit: 200 })
  console.log("retrieved list")

  const thatAllOfThem = value.list_complete

  if (thatAllOfThem) {
    console.log("there are under or exactly 200 addresses for the last 2 minutes. all will receive an airdrop.")
  } else {
    console.log("there are over 200 requests in the last 2 minutes\nones over 200 won't receive an airdrop and will expire")
  }

  let i
  let addressList = []

  for (i = 0; i < value.keys.length; i++) {
    addressList.push(tupleCV({ to: standardPrincipalCV(value.keys[i].name), amount: uintCV(1000000) }))
  }

  if (addressList.length > 0) {
    const txOptions = {
      contractAddress: 'SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ',
      contractName: 'wrapped-nothing-v6',
      functionName: 'send-many',
      functionArgs: [listCV(addressList)],
      senderKey: PRIV_KEY,
      validateWithAbi: true,
      network
    };

    const transaction = await makeContractCall(txOptions);

    broadcastTransaction(transaction, network);
    console.log("transaction broadcast")

  } else {
    console.log("there are no airdrop requests.")
  }

  console.log("responded with stringified keys")
  return new Response(JSON.stringify(addressList))
}