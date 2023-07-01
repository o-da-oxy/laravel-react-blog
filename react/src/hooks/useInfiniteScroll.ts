import {useState, useEffect} from 'react';

export const useInfiniteScroll = (fetchData: () => Promise<boolean>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEndOfList, setIsEndOfList] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !isLoading && !isEndOfList) {
        setIsLoading(true);
        const hasMore = await fetchData();
        setIsLoading(false);
        if (!hasMore) {
          setIsEndOfList(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchData, isLoading, isEndOfList]);

  return {isLoading, setIsLoading, isEndOfList, setIsEndOfList};
};
