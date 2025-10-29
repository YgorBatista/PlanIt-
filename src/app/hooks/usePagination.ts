import { useState } from "react";

export function usePagination<T>(items: T[], limit:number){
    
    const [currentPage, setCurrentPage] = useState(0);
    
  

 const totalPages = Math.ceil(items.length / limit);
    const start = currentPage * limit;
    const end = start + limit;
    const currentItems = items.slice(start, end);
    
    return{
        currentPage, setCurrentPage, totalPages, start, end, currentItems

    }
}