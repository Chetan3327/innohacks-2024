import React from 'react'

const Catalog = () => {
  return (
  <div className='relative flex hover:cursor-pointer'>
    <img width={400} className='rounded-md' src="https://img.freepik.com/free-vector/gradient-product-catalog-template_23-2149877177.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=ais" alt="" />
    <span className='absolute bottom-2 left-2 font-bold text-black'>John</span>
  </div>)
}

const Catalogs = () => {
  return (
    <div className='p-20 flex gap-5 flex-wrap'>
      <Catalog />
      <Catalog />
      <Catalog />
      <Catalog />
    </div>
  )
}

export default Catalogs
