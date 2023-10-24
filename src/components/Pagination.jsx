import React from "react";
import styled from "styled-components";

const Pagination = ({ itemsPerPage, currentPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <PaginationUl>
        {pageNumbers.map((number) => (
          <PaginationList key={number}>
            <PaginationButton
              isCurrent={number === currentPage}
              onClick={() => paginate(number)}
            >
              {number}
            </PaginationButton>
          </PaginationList>
        ))}
      </PaginationUl>
    </nav>
  );
};

export default Pagination;

const PaginationUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
`;

const PaginationList = styled.li`
  margin: 0 4px;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  background-color: white;
  border: 1px solid ${({ isCurrent }) => (isCurrent ? "gray" : "lightgray")};

  &:hover {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
  }
`;
