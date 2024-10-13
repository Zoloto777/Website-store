import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {
  const url = "http://localhost:4000"
  const [list, setList] = useState([])
  const [images, setImages] = useState({});

  // Handle file input change
  const handleFileChange = (e, itemID) => {
    const file = e.target.files[0];
    setImages(prevImages => ({ ...prevImages, [itemID]: file }));
  };

  // fetch list
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`)

    if (response.data.success) {
      setList(response.data.data)
    }
    else {
      toast.error("Error");
    }
  }

  // remove product
  const removeProduct = async (productID) => {
    const response = await axios.post(`${url}/api/product/remove`, { id: productID })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error("Error")
    }
  }

  // update product
  const updateProduct = async (productID, data, variable) => {
    try {
      const response = await axios.put(`${url}/api/product/update?id=${productID}`, { field: data, value: variable });

      if (response.data.success) {
        console.log(response.data.data)
      } else {
        console.log("Error: Update failed");
      }
    } catch (error) {
      console.error("Error in updateProduct:", error);
    }
  }

  // Upload image for a specific product
  const uploadImage = async (productID) => {
    const file = images[productID];
    if (!file) return;

    try {
      const response = await axios.put(`${url}/api/product/update?id=${productID}`, { image: file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
      if (response.data.success) {
        await fetchList(); // Refetch list after uploading
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Error uploading image");
      }
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  useEffect(() => {
    fetchList();
  }, [])


  return (
    <div className='list add flex-col'>
      <p>List of products</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <div>
                  <label htmlFor={`image-${item._id}`}>
                    <img type="file" src={images[item._id] ? URL.createObjectURL(images[item._id]) : `${url}/images/${item.image}`} alt="" />
                  </label>
                  <input onChange={(e) => handleFileChange(e, item._id)} type="file" id={`image-${item._id}`} hidden required />
                  <button onClick={() => uploadImage(item._id)}>Upload Image</button>
                </div>
                <p contenteditable="true" onBlur={(e) => updateProduct(item._id, "name", e.target.innerText)}> {item.name} </p>
                <p contenteditable="true" onBlur={(e) => updateProduct(item._id, "description", e.target.innerText)}> {item.description} </p>
                <p contenteditable="true" onBlur={(e) => updateProduct(item._id, "category", e.target.innerText)}> {item.category} </p>
                <p contenteditable="true" onBlur={(e) => updateProduct(item._id, "price", e.target.innerText)}> {item.price} </p>
                <button onClick={() => removeProduct(item._id)} className='cursor'>Delete</button>
              </div>
            )
          })}



      </div>
    </div>
  )
}


export default List