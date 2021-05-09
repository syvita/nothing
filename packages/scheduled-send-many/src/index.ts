import { bufferCVFromString, UIntCV, ListCV, TupleCV, PrincipalCV, makeContractCall, broadcastTransaction, listCV, tupleCV, uintCV } from '@stacks/transactions';
import { principalCV } from '@stacks/transactions/dist/transactions/src/clarity/types/principalCV';
import { HiroMainnet } from './network';

const network = new HiroMainnet();

/*addEventListener("scheduled", event => {
  event.waitUntil(handleScheduled(event))
})

async function handleScheduled(request) {
  // get first 200 addresses from the DB
  const addressList = await FAUCET_DB.list({ limit: 200 })

  // a list of the keys
  const addresses = addressList.keys
  const thatAllOfThem = addressList.list_complete

  if (thatAllOfThem) {
    console.log("there are under or exactly 200 addresses for the last 2 minutes. all will receive an airdrop.")
  } else {
    console.log("there are over 200 addresses in the last 2 minutes. ones over 200 won't receive an airdrop.")
  }

  const txOptions = {
    contractAddress: 'SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ',
    contractName: 'wrapped-nothing-v6',
    functionName: 'send-many',
    functionArgs: [bufferCVFromString('foo')],
    senderKey: PRIV_KEY,
    validateWithAbi: true,
    network
  };

  const transaction = await makeContractCall(txOptions);

  broadcastTransaction(transaction, network);
}*/

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await FAUCET_DB.list({ limit: 200 })
  console.log("retrieved list")

  const thatAllOfThem = value.list_complete

  if (thatAllOfThem) {
    console.log("there are under or exactly 200 addresses for the last 2 minutes. all will receive an airdrop.")
  } else {
    console.log("there are over 200 addresses in the last 2 minutes. ones over 200 won't receive an airdrop.")
  }

  let i
  let addressList = []
  for (i = 0; i < value.keys.length; i++) { 
    addressList.push({to: [principalCV(value.keys[i].name)], amount: [uintCV(1000000)]})
  }

  const txOptions = {
    contractAddress: 'SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ',
    contractName: 'wrapped-nothing-v6',
    functionName: 'send-many',
    functionArgs: [listCV(tupleCV(addressList))],
    senderKey: PRIV_KEY,
    validateWithAbi: true,
    network
  };

  broadcastTransaction(i, network);

  console.log("responded with stringified keys")
  return new Response(JSON.stringify(addresList))
  
}