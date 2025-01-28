import React, { useContext } from "react";
import useFormInput from "../useFormInput";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosInstanceProduct } from "../axiosInstance";
import { userContext } from "../UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import isURL from "validator/lib/isURL"; // Add this package for URL validation

const AddProduct = () => {
  const { productFormInput, setProductFormInput } = useFormInput();
  const { products, setProducts } = useContext(userContext);
  const navigate = useNavigate();
  const getFormInput = (e) => {
    setProductFormInput({
      ...productFormInput,
      [e.target.name]: e.target.value,
    });
  };
  const addProduct = async (e) => {
    e.preventDefault();
    if (!productFormInput.images.length) {
      toast.error("Please add at least one image.");
      return;
    }
    try {
      const productid = products.length + 1;
      const newInput = { ...productFormInput, id: productid };
      //   const formData = new FormData(newInput);
      const response = await axiosInstanceProduct.post("/", newInput);
      setProducts([response.data, ...products]);
      toast.success("Product added successfully");
      navigate("/product");
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to add product. Please try again.");
    }
  };
  const uploadImage = () => {
    const imageInput = document.getElementById("imageInput");
    const imageUrl = imageInput.value.trim();
    // Validate the URL before adding
    if (!isURL(imageUrl, { require_protocol: true })) {
      toast.error("Please enter a valid URL starting with http or https.");
      return;
    }

    // Update the state with the new image
    setProductFormInput((prev) => {
      return {
        ...prev,
        images: [...(prev.images || []), imageUrl],
      };
    });
  };

  return (
    <>
      <h1>Add Product</h1>

      <div className="d-flex justify-content-center align-items-center ">
        <Form onSubmit={addProduct} className="add-forms">
          <Form.Group className="mb-3" controlId="formfirstname">
            <div className="row">
              <Form.Label className="col-sm-4 col-form-label text-start">
                Title *
              </Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter the Title"
                  onChange={getFormInput}
                  required
                />
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className="row">
              <Form.Label className="col-sm-4 col-form-label text-start">
                Price *
              </Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  onChange={getFormInput}
                  required
                />
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategory">
            <div className="row">
              <Form.Label className="col-sm-4 col-form-label text-start">
                Category *
              </Form.Label>
              <div className="col-sm-8">
                <Form.Select
                  name="categoryId"
                  onChange={getFormInput}
                  defaultValue=""
                >
                  <option value="">Select Category</option>
                  <option value="1">Clothes</option>
                  <option value="3">Furniture</option>
                  <option value="4">Shoes</option>


                </Form.Select>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="row">
              <Form.Label className="col-sm-4 col-form-label text-start">
                Images
              </Form.Label>
              <div className="col-sm-8">
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Enter Image URL"
                    id="imageInput"  onChange={uploadImage}
                  />
                  
                </div>
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <div className="row">
              <Form.Label className="col-sm-4 col-form-label text-start">
                Description *
              </Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={getFormInput}
                  required
                />
              </div>
            </div>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Link to="/product">
              <Button type="button" className="cancel-btn">
                cancel
              </Button>
            </Link>
            <Button variant="primary" type="submit" className="add-btn">
              Add Product
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;
