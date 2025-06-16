import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Ring");
  const [subCategory, setSubCategory] = useState("Diamond");
  const [size, setSize] = useState("3");
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", size);
      formData.append("bestseller", bestseller);
0
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // console.log("Token before request:", token);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {token},
        }
      );

      if(response.data.success) {
       toast.success(response.data.message)
       setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)  
        setImage4(false)
        setPrice('')
      }else {
        toast.error(response.data.message)
      }
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div className="flex flex-col w-full">
        <p className="mb-2">Upload image</p>

        {/* Flex container for all image uploads */}
        <div className="flex gap-4 mb-4 p-4 rounded">
          <label htmlFor="image1" className="cursor-pointer">
            <img
              className="w-20 border border-black p-1"
              src={
                !image1 ? assets.upload_image_icon : URL.createObjectURL(image1)
              }
              alt="Upload 1"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2" className="cursor-pointer">
            <img
              className="w-20 border border-black p-1"
              src={
                !image2 ? assets.upload_image_icon : URL.createObjectURL(image2)
              }
              alt="Upload 2"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3" className="cursor-pointer">
            <img
              className="w-20 border border-black p-1"
              src={
                !image3 ? assets.upload_image_icon : URL.createObjectURL(image3)
              }
              alt="Upload 3"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4" className="cursor-pointer">
            <img
              className="w-20 border border-black p-1"
              src={
                !image4 ? assets.upload_image_icon : URL.createObjectURL(image4)
              }
              alt="Upload 4"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setCategory(e.target.value)}>
            <option value="Ring">Ring</option>
            <option value="Necklace">Necklace</option>
            <option value="Earing">Earing</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Pendant">Pendant</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub-Category</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setSubCategory(e.target.value)}>
            <option value="Diamond">Diamond</option>
            <option value="Gold">Gold</option>
            <option value="White Gold">White Gold</option>
            <option value="Silver">Silver</option>
            <option value="Artificial">Artificial</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      {/* Show only if Ring is selected */}
      {category === "Ring" && (
        <div className="w-full sm:w-[200px]">
          <p className="mb-2">Ring Size</p>
          <input
            onChange={(e) => setSize(e.target.value)}
            value={size}
            className="w-full px-3 py-2"
            type="number"
            placeholder="e.g., 6, 7, 8"
          />
        </div>
      )}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          onChange={(e) => setBestseller(e.target.checked)}
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};
