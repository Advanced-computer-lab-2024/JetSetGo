import { useState } from "react"

const ProductForm = ()=>{
const [name, setname] = useState('');
const [description, setdescription] = useState('');
const [price, setprice] = useState('');
const [quantityAvailable, setquantity] = useState('');
const [picture, setpicture] = useState('');
const [seller, setseller] = useState('');
const [ratings, setratings] = useState('');
const [error, seterror] = useState(null);

const handleAddProduct = async(e) =>{
    e.preventDefault()
    const product = {name, description, price, quantityAvailable, seller, picture,ratings}

    const response = await fetch('/api/admin/createProduct' && '/api/sellers/createProduct' ,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)

    })

    const json = await response.json()

    if (!response.ok){
        seterror(json.error)
    }
    if (response.ok){
        setname('')
        setdescription('')
        setprice('')
        setquantity('')
        setpicture('')
        setseller('')
        setratings('')

        seterror(null)
        console.log('new product added')
    }
}
return(
    <form className="create product" onSubmit={handleAddProduct}>
        <h3>ADD a New Productttt</h3>
        <label>Product Name</label>
        <input
            type = "text"
            onChange={(e)=> setname(e.target.value)}
            value={name}
        />
        <label>Product description</label>
        <input
            type = "text"
            onChange={(e)=> setdescription(e.target.value)}
            value={description}
        />
        <label>Product price</label>
        <input
            type = "number"
            onChange={(e)=> setprice(e.target.value)}
            value={price}
        />
        <label>Product quantityAvailable</label>
        <input
            type = "number"
            onChange={(e)=> setquantity(e.target.value)}
            value={quantityAvailable}
        />
        <label>Product picture</label>
        <input
            type = "text"
            onChange={(e)=> setpicture(e.target.value)}
            value={picture}
        />
        <label>Product seller</label>
        <input
            type = "text"
            onChange={(e)=> setseller(e.target.value)}
            value={seller}
        />
        <label>Product ratings</label>
        <input
            type = "number"
            onChange={(e)=> setratings(e.target.value)}
            value={ratings}
        />
        <button>Add Product</button>
        {error && <div className="error">{error}</div>}


    </form>

)


}





export default ProductForm 