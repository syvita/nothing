import React from 'react';
import { Flex, Box, Text } from '@blockstack/ui';

export const Header = () => {
  return (
    <Flex width="100%" justifyContent="space-between" px={4} py={3}>
      <Box alignItems onClick={() => (document.location = '/')} cursor="pointer">
        <Text ml={2} display="inline-block" fontWeight="600">
          Nothing Token
        </Text>
      </Box>
    </Flex>
  );
};
