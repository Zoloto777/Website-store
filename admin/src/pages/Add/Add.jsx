import React, { useEffect, useState } from 'react'
import './Add.css'
import upload_area from '../../assets/upload.png'
import axios from 'axios'
import {toast} from 'react-toastify'

const Add = () => {

    const url = "http://localhost:4000";
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description:"",
        price: "",
        category:"Option1"
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image", image)
        const response =  await axios.post(`${url}/api/product/add`, formData)
        if (response.data.success){
            setData(
                {
                    name: "",
                    description:"",
                    price: "",
                    category:"Option1"
                }
            )
            setImage(false)
        }
        else{
            toast.error(response.data.message)
        }
    }


  return (
    <div className ="add">
         <form className='flex-col' onSubmit = {onSubmitHandler}>
            <div className="add-image-upload flex-col">
                <p>Upload image</p>
                <label htmlFor = "image"> 
                    <img src = {image ? URL.createObjectURL(image):upload_area} alt =""/>
                </label>
                <input onChange = {(e) => setImage(e.target.files[0])} type = "file" id = "image"  hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p> Product name</p>
                <input onChange={onChangeHandler} value={data.name}  type = "text" name ="name" placeholder = "Type here"/>
            </div>
             <div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler}value={data.description}  name = "description" rows = "6" placeholder='Write content here' required></textarea>
                </div>
            </div>
            <div className="add-category-price flex-col">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name = "category" id = "">
                        <option value="Options1">Options1</option>
                        <option value="Options2">Options2</option>
                        <option value="Options3">Options3</option>
                        <option value="Options4">Options4</option>
                        <option value="Options5">Options5</option>
                        <option value="Options6">Options6</option>
                        <option value="Options7">Options7</option>
                        <option value="Options8">Options8</option>
                        <option value="Options9">Options9</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value = {data.price} type = "Number" name = 'price' placeholder='$20'/>
                </div>
            </div>
            <button type ='submit' className = 'add-btn'>Add</button>
        </form> 
    </div>
  )
}

export default Add