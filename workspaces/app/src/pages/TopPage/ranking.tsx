import { RankingCard } from '../../features/ranking/components/RankingCard';
import { useRankingList } from '../../features/ranking/hooks/useRankingList';
import { Flex } from '../../foundation/components/Flex';

export const Ranking: React.FC = () => {
  const { data: rankingList } = useRankingList({ query: {} });

  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      {rankingList.map((ranking) => (
        <RankingCard key={ranking.id} book={ranking.book} />
      ))}
    </Flex>
  );
};
