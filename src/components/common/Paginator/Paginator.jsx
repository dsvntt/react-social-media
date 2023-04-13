import React, { useState } from 'react'
import s from './Paginator.module.css'
import cn from 'classnames'

const Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  const startingPage = 1
  const adjustedTotalItemsCount = totalItemsCount - startingPage * pageSize
  const pagesCount = Math.ceil(adjustedTotalItemsCount / pageSize)
  const pages = []

  for (let i = startingPage; i <= pagesCount + startingPage - 1; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pagesCount / portionSize)
  const [portionNumber, setPortionNumber] = useState(1)
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  const rightPortionPageNumber = portionNumber * portionSize

  return (
    <div className={cn(s.paginator)}>
      {portionNumber > 1 && (
        <button
          className={cn(s.paginationButton)}
          onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}>
          PREV
        </button>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              className={cn(
                {
                  [s.selectedPage]: currentPage === p,
                },
                s.pageNumber
              )}
              key={p}
              onClick={(e) => {
                onPageChanged(p)
              }}>
              {p}
            </span>
          )
        })}
      {portionCount > portionNumber && (
        <button
          className={cn(s.paginationButton)}
          onClick={() => {
            setPortionNumber(portionNumber + 1)
          }}>
          NEXT
        </button>
      )}
    </div>
  )
}

export default Paginator
