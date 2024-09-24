import React from 'react'
import { Pagination } from 'react-bootstrap'

function CommanPagination({ currentPage, totalPages, onPageChange }) {

    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    // Function to handle click on a page
    const handleClick = (page) => {
        if (onPageChange) onPageChange(page);
    };

    return (
        <>
            <div className="d-flex align-items-center gap-3 justify-content-end mt-3 pagination-main">
                {
                    (totalPages > 0) &&
                    <>
                        <Pagination className="pagination table-pagination mb-0">
                            <Pagination.Prev
                                className="page-item1"
                                onClick={() => handleClick(currentPage - 1)}
                                // disabled={currentPage === 1}
                                disabled={currentPage === 1 ? true : false} style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                            >
                                <svg
                                    width={10}
                                    height={20}
                                    viewBox="0 0 8 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className='pb-1'
                                >
                                    <path
                                        d="M6.5 1.32239L1 6.82239L6.5 12.3224"
                                        stroke="#202947"
                                        strokeWidth="1.375"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </Pagination.Prev>
                            {
                                (currentPage > 2) && (totalPages !== 3) &&
                                <Pagination.Ellipsis onClick={() => handleClick(currentPage - 2)} />
                            }
                            {
                                (currentPage == totalPages) && (totalPages > 2) &&
                                <Pagination.Item
                                    active={currentPage === (currentPage - 2)}
                                    onClick={() => handleClick(currentPage - 2)}
                                >
                                    {currentPage - 2}
                                </Pagination.Item>
                            }

                            {
                                (currentPage != 1) &&
                                <Pagination.Item
                                    active={currentPage === (currentPage - 1)}
                                    onClick={() => handleClick(currentPage - 1)}
                                >
                                    {currentPage - 1}
                                </Pagination.Item>
                            }
                            <Pagination.Item
                                active={currentPage === (currentPage)}
                                onClick={() => handleClick(currentPage)}
                            >
                                {currentPage}
                            </Pagination.Item>
                            {
                                (currentPage !== totalPages) &&
                                <Pagination.Item
                                    active={currentPage === (currentPage + 1)}
                                    onClick={() => handleClick(currentPage + 1)}
                                >
                                    {currentPage + 1}
                                </Pagination.Item>
                            }
                            {
                                (currentPage == 1) && (totalPages > (currentPage + 1)) &&
                                <Pagination.Item
                                    active={currentPage === (currentPage + 2)}
                                    onClick={() => handleClick(currentPage + 2)}
                                >
                                    {currentPage + 2}
                                </Pagination.Item>
                            }

                            {
                                (totalPages > (currentPage + 1)) && (totalPages !== 3) &&
                                <Pagination.Ellipsis onClick={() => handleClick(currentPage + 2)} />
                            }

                            <Pagination.Next
                                className="page-item1"
                                onClick={() => handleClick(currentPage + 1)}
                                // disabled={currentPage === totalPages}
                                disabled={currentPage === totalPages ? true : false} style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                            >
                                <svg
                                    width={10}
                                    height={20}
                                    viewBox="0 0 8 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className='pb-1'
                                >
                                    <path
                                        d="M1.5 1.32239L7 6.82239L1.5 12.3224"
                                        stroke="#202947"
                                        strokeWidth="1.375"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </Pagination.Next>
                        </Pagination>

                        <select id="industry-select" className="form-select" aria-label="Select ">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">100</option>
                        </select>
                    </>
                }

            </div>
        </>
    );
}

export default CommanPagination
