import { NavigateNext } from '@mui/icons-material';
import { Suspense } from 'react';
import styled from 'styled-components';

import type { GetBookResponse } from '@wsh-2024/schema/src/api/books/GetBookResponse';

import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Link } from '../../../foundation/components/Link';
import { Separator } from '../../../foundation/components/Separator';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';

const _Wrapper = styled.li`
  width: 100%;
`;

const _Link = styled(Link)`
  width: 100%;
`;

const _ImgWrapper = styled.div`
  width: 96px;
  height: 96px;
  > img {
    border-radius: ${Radius.SMALL};
  }
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

type Props = {
  book: Omit<GetBookResponse, 'nameRuby'>;
};

const RankingCard: React.FC<Props> = ({ book }) => {
  return (
    <_Wrapper>
      <_Link href={`/books/${book.id}`}>
        <Spacer height={Space * 1.5} />
        <Flex align="flex-start" gap={Space * 2.5} justify="flex-start">
          <_ImgWrapper>
            <img
              alt={book.name}
              height={96}
              loading="lazy"
              src={`/images/${book.image.id}?format=jpg&width=96&height=96`}
              style={{ objectFit: 'cover' }}
              width={96}
            />
          </_ImgWrapper>
          <Box width="100%">
            <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
              <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                {book.name}
              </Text>
              <Text as="p" color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.description}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" gap={Space * 1} justify="flex-end">
              <_AvatarWrapper>
                <img
                  alt={`${book.author.name}のアイコン`}
                  height={32}
                  loading="lazy"
                  src={`/images/${book.author.image.id}?format=jpg&width=32&height=32`}
                  style={{ objectFit: 'cover' }}
                  width={32}
                />
              </_AvatarWrapper>
              <Text color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.author.name}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" justify="flex-end">
              <Text color={Color.Secondary} typography={Typography.NORMAL14} weight="bold">
                この漫画を読む
              </Text>
              <NavigateNext
                height={32}
                style={{
                  color: Color.Secondary,
                }}
                width={32}
              />
            </Flex>
          </Box>
        </Flex>
        <Spacer height={Space * 1.5} />
        <Separator />
      </_Link>
    </_Wrapper>
  );
};

const RankingCardWithSuspense: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={null}>
      <RankingCard {...props} />
    </Suspense>
  );
};

export { RankingCardWithSuspense as RankingCard };
