import React from 'react'
import OurProducts from '../../components/OurProducts/OurProducts'
import TopCategories from '../../components/TopCategories/TopCategories'
import white_chair from '../../assets/./white_chair.png'
import RecentlyAdded from '../../components/RecentlyAdded/RecentlyAdded'
import Testimonial from '../../components/Testimonial/Testimonial'
import Header from '../../components/Header/header'
import Feature from '../../components/Feature/Feature'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'

const Home = () => {
  const items = [
    { title: 'Wing Chair', products: 3584, image: white_chair},
    { title: 'Wooden Chair', products: 157, image: white_chair },
    { title: 'Desk Chair', products: 154, image: white_chair },
  ];
  return (
    <div>
      <Header />
      <Feature />
      <FeaturedProducts items={items}/>
      <TopCategories items={items} />
      <OurProducts />
      <Testimonial />
      <RecentlyAdded/>
    </div>
  )
}

export default Home