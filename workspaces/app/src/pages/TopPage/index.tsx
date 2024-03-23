import { Suspense } from 'react';

import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Space } from '../../foundation/styles/variables';

import { Contents } from './contents';
import { CoverSection } from './internal/CoverSection';

export const TopPage: React.FC = () => {
  return (
    <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
      <Box as="header" maxWidth="100%" width="100%">
        <CoverSection />
      </Box>
      <Suspense fallback={null}>
        <Contents />
      </Suspense>
    </Flex>
  );
};
