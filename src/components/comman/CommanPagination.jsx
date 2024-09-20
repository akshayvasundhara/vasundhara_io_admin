import React from 'react'
import { Pagination } from 'react-bootstrap'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function CommanPagination() {
    return (
        <>
            <div className='d-flex justify-content-end pagination-main'>
                <Pagination>
                    <li class="page-item">
                        <a class="page-link" role="button" tabindex="0" href="#">
                            <span aria-hidden="true">
                                <FaChevronLeft />
                            </span>
                        </a>
                    </li>
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <li class="page-item">
                        <a class="page-link" role="button" tabindex="0" href="#">
                            <span aria-hidden="true">
                                <FaChevronRight />
                            </span>
                        </a>
                    </li>
                </Pagination>
            </div>
        </>
    )
}

export default CommanPagination
