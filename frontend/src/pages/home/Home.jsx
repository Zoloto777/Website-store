import React from 'react'
import OurProducts from '../../components/OurProducts/OurProducts'
import TopCategories from '../../components/TopCategories/TopCategories'
import white_chair from '../../assets/./white_chair.png'
import RecentlyAdded from '../../components/RecentlyAdded/RecentlyAdded'

const Home = () => {
  const items = [
    { title: 'Wing Chair', products: 3584, image: white_chair},
    { title: 'Wooden Chair', products: 157, image: white_chair },
    { title: 'Desk Chair', products: 154, image: white_chair },
  ];
  return (
    <div>
      <TopCategories items={items} />
      <OurProducts />
      <RecentlyAdded/>
    </div>
  )
}

export default Home