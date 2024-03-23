import { Suspense, useId } from 'react';

import { Box } from '../../foundation/components/Box';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { NewRelease } from './newRelease';
import { Pickup } from './pickup';
import { Ranking } from './ranking';

export const Contents: React.FC = () => {
  const pickupA11yId = useId();
  const rankingA11yId = useId();
  const todayA11yId = useId();

  return (
    <Box as="main" maxWidth="100%" width="100%">
      <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
        <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
          ピックアップ
        </Text>
        <Spacer height={Space * 2} />
        {/* レイアウトシフトが発生しないように固定する */}
        <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
          <Suspense fallback={<div style={{height: "206px"}} />}>
            <Pickup />
          </Suspense>
        </Box>
      </Box>

      <Spacer height={Space * 2} />

      <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
        <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
          ランキング
        </Text>
        <Spacer height={Space * 2} />
        <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
          <Suspense fallback={<div style={{height: "7350px"}} />}>
            <Ranking />
          </Suspense>
        </Box>
      </Box>

      <Spacer height={Space * 2} />

      <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
        <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
          本日更新
        </Text>
        <Spacer height={Space * 2} />
        {/* レイアウトシフトが発生しないように固定する */}
        <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
          <Suspense fallback={<div style={{height: "244px"}} />}>
            <NewRelease />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};
