import React, { useState, useEffect } from "react";
import { Pagination, Spinner } from "react-bootstrap";
import CommonTable from "../CommonTable";
import { axiosInstanceProduct } from "../axiosInstance";
import { Card } from "react-bootstrap";
import { BiGridVertical } from "react-icons/bi";
import { Container, Row } from "react-bootstrap";
import { MdOutlineTableView } from "react-icons/md";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationItems, setPaginationItems] = useState([]);
  const itemsPerPage = 8;
  const [tableVisible, setTableVisible] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstanceProduct.get("/");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage)); // Set page from localStorage
    } else {
      setCurrentPage(1); // Default to page 1 if no saved page
    }
  }, []);

  const handlePageChange = (page) => {
    localStorage.setItem("currentPage", page); // Save the current page to localStorage
    setCurrentPage(page);
  };

  useEffect(() => {
    const totalPages = Math.ceil(products.length / itemsPerPage);
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
  }, [currentPage, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const actions = {
    view: (product) => {
      console.log("View product:", product);
    },
    edit: (product) => {
      console.log("Edit product:", product);
    },
    delete: (product) => {
      console.log("Delete product:", product);
    },
  };
 const grid_view = () => {
  setTableVisible(!tableVisible);
 }
  return (
    <>
  <div className="d-flex  justify-content-end mb-1">
    <button variant="primary"className="add-product-btn" >Add New Product</button>
    {tableVisible?(
    <button onClick={grid_view} className="btn btn-primary product-view-btn" >
     <BiGridVertical size={50}/>
    </button>
  ):(
    <button onClick={grid_view} className="btn btn-primary product-view-btn" >
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
        <>{tableVisible && 
          <CommonTable
            data={currentItems}
            columns={["ID", "Title", "Price"]}
            actions={actions}
          />
        }
        </>
      )}

        <Container fluid>
        <Row>
        {!tableVisible && (currentItems.map((obj) => (

        <Card  className="product-card" key={obj.id}  xs={12} sm={6} md={4} lg={3} xl={3} xxl={5} >
                  
                  <Card.Img variant="top" src={obj.images[0]} style={{ height: "200px",padding:"10px"}} />
                  <Card.Body>
                    <Card.Title>
                     <strong style={{ color: "#520785"}}> {obj.title || "N/A"}</strong>
                    </Card.Title>
                    {/* <Card.Title>
                     <strong style={{ color: "green" }}>{obj.description || "N/A"}</strong> 
                    </Card.Title> */}
                    
                    <Card.Title>
                     <strong style={{ color: "black" }}>${obj.price || "N/A"}</strong> 
                     </Card.Title>
                   </Card.Body>
               </Card>
     )))}
        </Row>
      </Container>
      </div>
    <div>       <Pagination className="justify-content-center">{paginationItems}</Pagination>
    </div>
    </>
    
  );
};




export default Product;
