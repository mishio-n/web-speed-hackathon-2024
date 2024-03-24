import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';

import { EpisodeListItem } from '../../features/episode/components/EpisodeListItem';
import { useEpisode } from '../../features/episode/hooks/useEpisode';
import { useEpisodeList } from '../../features/episode/hooks/useEpisodeList';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Separator } from '../../foundation/components/Separator';
import { Space } from '../../foundation/styles/variables';

import { ComicViewer } from './internal/ComicViewer';

export const EpisodeDetailPage: React.FC = () => {
  const { bookId, episodeId } = useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();
  if (bookId === undefined) {
    throw new Error('bookId is required');
  }
  if (episodeId === undefined) {
    throw new Error('episodeId is required');
  }

  return (
    <Box>
      <Suspense fallback={null}>
        <ViewerSection episodeId={episodeId} />
      </Suspense>

      <Separator />

      <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
        <Suspense fallback={null}>
          <EpisodeListSection bookId={bookId} />
        </Suspense>
      </Box>
    </Box>
  );
};

const ViewerSection: React.FC<{ episodeId: string }> = ({ episodeId }) => {
  const { data: episode } = useEpisode({ params: { episodeId } });
  return (
    <section aria-label="漫画ビューアー">
      <ComicViewer episode={episode!} />
    </section>
  );
};

const EpisodeListSection: React.FC<{ bookId: string }> = ({ bookId }) => {
  const { data: episodes } = useEpisodeList({ query: { bookId } });
  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      {episodes.map((episode) => (
        <EpisodeListItem key={episode.id} bookId={bookId} episode={episode} />
      ))}
    </Flex>
  );
};
