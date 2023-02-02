import React, { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import Header from '../components/Header/Header'
import axios from 'axios';
import css from './Home.module.scss';
import ReactPaginate from 'react-paginate';

const Home = () => {

  const itemPerPage = 3

  const [pageCount, setPageCount] = useState(0)
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      await axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then((res) => {
          const d = paginate(res.data, itemPerPage, currentPageNo)
          setPageCount(Math.ceil(res.data.length / itemPerPage))
          setCurrentPageData(d)
        })
        .catch((e) => console.log(e))
    }
    getUsers()
  }, [currentPageNo])

  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, (page_number) * page_size);
  }

  function handlePageClick(e) {
    // console.log(e.selected + 1);
    setCurrentPageNo(e.selected + 1);
  }


  return (<>
    <Header />

    <div className={css.wrapper}>

      <div className={css.cardWrapper}>
        {currentPageData?.map((i) => (
          <div key={i.id}><Card data={i} /></div>
        ))}
      </div>


      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={`${css.pagination}`}
        disabledClassName={`${css.disabledPage}`}
        activeClassName={`${css.item} ${css.active} `}

      />

    </div>

  </>
  )
}

export default Home