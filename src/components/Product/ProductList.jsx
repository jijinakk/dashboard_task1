import React, { useState, useEffect, useContext, useCallback } from "react";
import { Pagination, Spinner } from "react-bootstrap";
import CommonTable from "../CommonTable";
import { axiosInstance, axiosInstanceProduct } from "../axiosInstance";
import { Card } from "react-bootstrap";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { Container, Row } from "react-bootstrap";
import { MdOutlineTableView } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { userContext } from "../UserContext";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import useFormInput from "../useFormInput";
import { Modal, Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";

const Product = () => {
  const {
    products,
    setProducts,
    showDeleteModal,
    setShowDeleteModal,
    showViewModal,
    setShowViewModal,
    showEditModal,
    setShowEditModal,
  } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationItems, setPaginationItems] = useState([]);
  const itemsPerPage = 10;
  const [tableVisible, setTableVisible] = useState(true);
  const [params, setParams] = useSearchParams();
  const { productFormInput, setProductFormInput } = useFormInput();
  const [selectedProduct, setSelectedProduct] = useState({});
  const selectedCategory = params.get("category") || "";
  const searchQuery =params.get("search") || "";
  const fetchProducts =useCallback( async () => {
    setLoading(true);
    try {
      const res = await axiosInstanceProduct.get("/");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  },[setProducts]);

  useEffect(() => {
    fetchProducts();
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage)); // Set page from localStorage
    } else {
      setCurrentPage(1); // Default to page 1 if no saved page
    }
  }, [fetchProducts]);

  const handlePageChange = (page) => {
    localStorage.setItem("currentPage", page); // Save the current page to localStorage
    setCurrentPage(page);
  };
  const filteredProducts = (products || []).filter((item) => {
    const title = item?.title || "";

    const matchesCategory = selectedCategory
      ? item?.category.name === selectedCategory
      : true;
      const matchesSearch = searchQuery? title.toLowerCase().includes(searchQuery.toLowerCase()): true;
      return matchesCategory && matchesSearch;
  });
  
  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const newPaginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      newPaginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    setPaginationItems(newPaginationItems);
  }, [currentPage, products,filteredProducts.length]);

  const handleAction = (product, actionType) => {
    setProductFormInput({
      id: product.id,
      title: product?.title,
      price: product.price,
      description: product.description,
      category: product.category,
      images: product.images,
    });

    if (actionType === "view") {
      setShowViewModal(true);
    } else if (actionType === "edit") {
      setShowEditModal(true);
    } else if (actionType === "delete") {
      setSelectedProduct(product);
      setShowDeleteModal(true);
    }
  };

  const actions = {
    view: (product) => {
      handleAction(product, "view");
    },
    edit: (product) => {
      handleAction(product, "edit");
    },
    delete: (product) => {
      handleAction(product, "delete");
    },
  };
  const grid_view = () => {
    setTableVisible(!tableVisible);
  };
  const handleFilter = (category) => {
    const newParams = { search: searchQuery }; // Preserve the search query
    if (category) newParams.category = category;
       setParams(newParams);
   };

  // Update query parameters for search
    const handleSearch = (e) => {

      const search = e.target.value;
      const newParams = { category: selectedCategory }; // Preserve the category
      if (search) newParams.search = search;
      setParams(newParams);
    };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name }, { value });
    setProductFormInput({ ...productFormInput, [name]: value });
  };
  const handleEditProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(
        `/products/${productFormInput.id}`,
        productFormInput
      );

      if (response.status === 200) {
        const updatedProduct = products.map((product) =>
          product.id === productFormInput.id ? response.data : product
        );
        console.log(updatedProduct);
        setProducts(updatedProduct);
        setShowEditModal(false);
        toast.success("User details updated successfully");
      }
    } catch (error) {
      // Handle any errors from the API call
      console.error("Error updating user:", error);
      toast.error("Failed to update user details. Please try again.");
    }
  };

  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to delete the user
      const response = await axiosInstance.delete(
        `/products/${selectedProduct.id}`
      );

      if (response.status === 200) {
        // Update the local state by filtering out the deleted user
        const updatedProduct = products.filter(
          (p) => p.id !== selectedProduct.id
        );
        setProducts(updatedProduct);
        setShowDeleteModal(false);
        toast.warn("User details deleted successfully");
      }
    } catch (error) {
      // Handle any errors from the API call
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };
  return (
    <>
      <h1 className="product-heading">Products</h1>

      <div className="d-flex  justify-content-end mb-1">
      <InputGroup  style={{ width: "300px", height:"19px",marginRight:"10px"}}>
              <Form.Control  placeholder="Search here..." value={searchQuery} onChange={handleSearch}  />
              </InputGroup>
        <DropdownButton
          
          title={selectedCategory || "Filter by Category"}
          onSelect={(e) => handleFilter(e)}
        >
          <Dropdown.Item eventKey="">All</Dropdown.Item>
          <Dropdown.Item eventKey="Clothes">Clothes </Dropdown.Item>
          <Dropdown.Item eventKey="Furniture">Furniture </Dropdown.Item>
          <Dropdown.Item eventKey="Shoes">Shoes </Dropdown.Item>

          
        </DropdownButton>
        <Link to="/add-product">
          <button
            variant="primary"
            className=" btn btn-primary add-product-btn"
          >
            {" "}
            <TiPlus size={25} />
          </button>
        </Link>
        {tableVisible ? (
          <button
            onClick={grid_view}
            className="btn btn-primary product-view-btn"
          >
            <BsFillGrid1X2Fill size={25} />
          </button>
        ) : (
          <button
            onClick={grid_view}
            className="btn btn-primary product-view-btn"
          >
            <MdOutlineTableView size={25} />
          </button>
        )}
      </div>
      <div>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            {tableVisible && (
              <CommonTable
                data={currentItems}
                columns={["ID", "Title", "Price"]}
                actions={actions}
              />
            )}
          </>
        )}

        <Container fluid>
          <Row>
            
            {!tableVisible &&
              currentItems.map((obj) => (
                <Card
                  className="product-card"
                  key={obj.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={3}
                  xxl={5}
                >
                  <Card.Img
                    variant="top"
                    src={obj.images}
                    style={{ height: "180px", width: "280px", padding: "10px" }}
                  />
                  <div className="icon-overlay">
                    <button onClick={() => actions.view(obj)}>
                      <FaInfoCircle />
                    </button>
                    <button onClick={() => actions.edit(obj)}>
                      <FaRegEdit />
                    </button>
                    <button onClick={() => actions.delete(obj)}>
                      <MdDeleteOutline />
                    </button>
                  </div>
                  <Card.Body>
                    <Card.Title>
                      <strong style={{ color: "#4e8cff" }}>
                        {" "}
                        {obj.title || "N/A"}
                      </strong>
                    </Card.Title>
                    <Card.Title>
                      <strong style={{ color: "black" }}>
                        ${obj.price || "N/A"}
                      </strong>
                    </Card.Title>
                    <Card.Title style={{ display: "none" }}>
                      <strong style={{ color: "black" }}>
                        {obj.category.name || "N/A"}
                      </strong>
                    </Card.Title>
                  </Card.Body>
                </Card>
              ))}
          </Row>
        </Container>
      </div>
      <div>
        {" "}
        <Pagination className="justify-content-center">
          {paginationItems}
        </Pagination>
      </div>
      {/* View Modal */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="profile-container">
            <Row className="mb-4" md={8} xs={12}>
              <Col >
                <img
                  src={productFormInput.images || " Image"}
                  alt="img"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col >
                <h5>{productFormInput.title}</h5>
                <h6>{productFormInput.price}</h6>
              </Col>
            </Row>
          </div>
          <div className="profile-container mt-4">
            
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formfirstname">
                    <Form.Label> Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      className="profile-input"
                      type="textArea"
                      name="description"
                      value={productFormInput?.description || " --- "}
                      rows={8}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <Form className="edit-user-form" onSubmit={handleEditProduct}>
              <Form.Group className="mb-3 " controlId="formBasicTitle">
                <div className="row">
                  <Form.Label className="col-sm-4 col-form-label text-start">
                    Title
                  </Form.Label>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      name="title"
                      value={productFormInput.title}
                      onChange={handleChange}
                      placeholder="Enter title"
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <div className="row">
                  <Form.Label className="col-sm-4 col-form-label text-start">
                    Price
                  </Form.Label>
                  <div className="col-sm-8">
                    <Form.Control
                      type="number"
                      name="price"
                      value={productFormInput.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="row">
                  <Form.Label className="col-sm-4 col-form-label text-start">
                    Images
                  </Form.Label>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      name="images"
                      value={(productFormInput.images || []).join(", ")} //Converts the array into a string of comma-separated values
                      onChange={(e) =>
                        setProductFormInput((prev) => ({
                          ...prev,
                          images: e.target.value
                            .split(",")
                            .map((url) => url.trim()),
                        }))
                      }
                      placeholder="Enter image URLs separated by commas"
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <div className="row">
                  <Form.Label className="col-sm-4 col-form-label text-start">
                    description
                  </Form.Label>
                  <div className="col-sm-12 col-md-10">
                    <textarea
                      style={{ width: "390px", height: "200px" }}
                      name="description"
                      value={productFormInput.description}
                      onChange={handleChange}
                      placeholder="description"
                    />
                  </div>
                </div>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="add-btn"
                >
                  Update
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        animation={false}
      >
        <Modal.Body>Do you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Product;
