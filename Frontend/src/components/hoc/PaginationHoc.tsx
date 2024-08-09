import React, { useState } from "react";
export type PropsType = {
    currentPage:number;
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>;
}

const PaginationHoc = (Component: React.ComponentType<PropsType>) => {
  return () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    return <Component currentPage={currentPage} setCurrentPage={setCurrentPage} />;
  };
};

export default PaginationHoc;
