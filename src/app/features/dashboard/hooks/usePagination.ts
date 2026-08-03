import { useEffect, useState } from "react";

export function usePagination<T>(items: T[], limit:number){
    
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(items.length / limit);

    useEffect(() => {
    setCurrentPage(prev => {
      const last = totalPages - 1;
      if (prev > last) return last;
      if (prev < 0) return 0;
      return prev;
    });
  }, [totalPages]);

 
    const startIndex = currentPage * limit;
    const endIndex = startIndex + limit;
    const currentItems = items.slice(startIndex, endIndex);
    
      const goNext = () => setCurrentPage(p => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setCurrentPage(p => Math.max(p - 1, 0));

  const start = items.length === 0 ? 0 : startIndex + 1;
  const end = items.length === 0 ? 0 : Math.min(endIndex, items.length);
  return {
    currentPage, setCurrentPage, totalPages, start, end, currentItems, goNext, goPrev
  }
}