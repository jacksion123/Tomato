import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/Exploremenu/Exploremenu'
import FooDisplay from '../../components/Fooddisplay/FooDisplay'
import Appdown from '../../components/Appdownload/Appdown'
const Home = () => {
    const [category,setCategory] = useState("All")

  return (
    <div>
      <Header/>
      <Exploremenu category={category} setCategory={setCategory}/>
      <FooDisplay category={category}/>
      <Appdown/>
    </div>
  )
}

export default Home
