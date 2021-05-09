/*const { principalCV } = require("@blockstack/stacks-transactions/lib/clarity/types/principalCV");
const { AnchorMode, PostConditionMode } = require("@blockstack/stacks-transactions/lib/constants");
const { StacksMainnet }  = require('@stacks/network')
const {
  uintCV,
  makeContractCall,
  broadcastTransaction,
  makeContractFungiblePostCondition,
  getNonce
}  = require('@stacks/transactions');
const BN = require("bn.js");*/

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleFaucet(request) {
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}

async function handle404(request) {
  return new Response('404!', {
    headers: { 'content-type': 'text/plain' },
  })
}

async function handleRequest(request) {
  const path = request.url.substring(request.url.indexOf('/') + 1)

  if (path == '/faucet') {
    return handleFaucet(request)
  } else if (path == '/') {
    return handle404(request)
  }
}
