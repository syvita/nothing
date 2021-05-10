import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { validateStacksAddress } from '@stacks/transactions';
import { Flex, Box, Text, Input, Button } from '@blockstack/ui';

const getContractBalance = async () => {
  const contractBalance = await fetch(
    `https://api.nothingtoken.com/faucet-balance`
  ).then(res => res.json());
  return contractBalance;
};

const getNothings = async stxAddress => {
  const contractResult = await fetch(`https://api.nothingtoken.com/faucet`, {
    method: 'POST',
    body: JSON.stringify({
      address: stxAddress,
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json());
  return contractResult;
};

const StackingResult = () => {
  const [result, setResult] = useState('');
  const [stxAddress, setStxAddress] = useState('');
  const [errMsg,setErrMsg] = useState('')
  const isValidAddress = true
  /*useMemo(() => stxAddress && validateStacksAddress(stxAddress), [
    stxAddress,
  ]);*/
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = useCallback(e => {
    setStxAddress(e.target.value);
  }, []);

  const [contractBalance, setContractBalance] = useState({
    stx: 0,
    nothings: 0,
  });

  useEffect(() => {
    getContractBalance().then(data => {
      setIsLoading(false);
      setContractBalance({
        stx: Math.floor(data.stx.balance / 1000000),
        nothings:
          data.fungible_tokens[
            'SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.wrapped-nothing-v6::wrapped-nthng'
          ].balance,
      });
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (isValidAddress) {
      setIsLoading(true);
      setResult('');
      setErrMsg('');
      getNothings(stxAddress)
        .then(result => {
          if (result.message) {
            setErrMsg(result.message)
          } else {
            setResult(result);
          }
          setIsLoading(false);
        })
        .catch(async (res) => {
          console.log(res)
          setIsLoading(false);
        });
    }
  }, [stxAddress, isValidAddress]);
  return (
    <Flex>
      <Box maxWidth="660px" width="100%" mx="auto" mt="75px">
        <Flex width="100%" flexWrap="wrap">
          <Box mb={4} width="100%">
            <Input
              placeholder="Enter your stacks address here"
              onChange={handleChange}
              value={stxAddress}
            />
            {stxAddress && !isValidAddress && (
              <Text color="red" textStyle="caption">
                Invalid address
              </Text>
            )}
          </Box>
          <Box mb={4} width="100%">
            <Button disabled={isLoading || !isValidAddress} onClick={handleSubmit}>
              Get nothings
            </Button>
          </Box>
          <Box mb={4} width="100%">
            Contract has {contractBalance.stx} STX and {contractBalance.nothings} WMNO (wrapped Nothings)
          </Box>
          {errMsg && !isLoading && (
            <>
              <Box fontWeight='bold' mb={4} width="100%">
                <Text fontWeight='bold' fontSize='display.medium' color="red">
                  {errMsg}
                </Text>
              </Box>
            </>
          )}
          {result && isValidAddress && !isLoading && (
            <>
              <Box fontWeight='bold' mb={4} width="100%">
                Transaction submitted:
                <a
                  target="_blank"
                  rel="noopener noreferrer "
                  href={`https://explorer.syvita.org/txid/0x${result}?chain=mainnet`}
                >
                  View here
                </a>
              </Box>
            </>
          )}

          <Box mb={4} width="100%">
            <Text size="display.medium"  fontWeight="bold"></Text>
            <Text size="display.medium">
            Want to donate STX so Nothing can keep on giving? Send here!
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer "
                href={`https://explorer.syvita.org/address/SP31596TY1N33159BQCVEC9H16HP0KQ2VTD140157?chain=mainnet`}
              >
                SP31596TY1N33159BQCVEC9H16HP0KQ2VTD140157
              </a>{' '}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default StackingResult;
