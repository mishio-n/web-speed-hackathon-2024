import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';

import { EpisodeListItem } from '../../features/episode/components/EpisodeListItem';
import { useEpisodeList } from '../../features/episode/hooks/useEpisodeList';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Separator } from '../../foundation/components/Separator';
import { Space } from '../../foundation/styles/variables';

import { ComicViewer } from './internal/ComicViewer';

const EpisodeDetailPage: React.FC = () => {
  const { bookId, episodeId } = useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();
  if (bookId === undefined) {
    throw new Error('bookId is required');
  }
  if (episodeId === undefined) {
    throw new Error('episodeId is required');
  }

  const { data: episodes } = useEpisodeList({ query: { bookId } });

  const episode = episodes.find((episode) => episode.id === episodeId);

  return (
    <Box>
      <section aria-label="漫画ビューアー">
        <ComicViewer episode={episode!} />
      </section>

      <Separator />

      <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
        <Flex align="center" as="ul" direction="column" justify="center">
          {episodes.map((episode) => (
            <EpisodeListItem key={episode.id} bookId={bookId} episode={episode} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const EpisodeDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <EpisodeDetailPage />
    </Suspense>
  );
};

export { EpisodeDetailPageWithSuspense as EpisodeDetailPage };
