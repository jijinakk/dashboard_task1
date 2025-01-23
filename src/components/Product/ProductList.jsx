import React, { useState, useEffect, useContext } from "react";
import { Pagination, Spinner } from "react-bootstrap";
import CommonTable from "../CommonTable";
import { axiosInstanceProduct } from "../axiosInstance";
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

const Product = () => {
  const { products, setProducts } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationItems, setPaginationItems] = useState([]);
  const itemsPerPage = 10;
  const [tableVisible, setTableVisible] = useState(true);
  const [params,setParams] =useSearchParams();

  const selectedCategory = params.get("category") || "";
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstanceProduct.get("/");
      setProducts(res.data);
  console.log(res.data);
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
  }, [ currentPage,products]);

  

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
 const handleFilter = (category) => {

  const newParams = { category: selectedCategory };
          if (category) newParams.category = category;
           setParams(newParams);
       };
 
       const filteredProducts = (products || []).filter((item) => {
        
        const matchesCategory = selectedCategory? item?.category.name === selectedCategory: true;
        console.log(matchesCategory);
        // const matchesSearch = searchQuery? title.toLowerCase().includes(searchQuery.toLowerCase()): true;
        return matchesCategory ;
      });
      console.log(filteredProducts);
      const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
   
      <h1 className="product-heading" >Products</h1>
   
  <div className="d-flex  justify-content-end mb-1">

  <DropdownButton id="dropdown-basic-button" title={selectedCategory || "Filter by Category"} onSelect={(e)=>handleFilter(e)} >
      {/* <Dropdown.Item eventKey="Shoes">Shoes</Dropdown.Item> */}
      <Dropdown.Item eventKey="Miscellaneous"> Miscellaneous</Dropdown.Item>
      <Dropdown.Item eventKey="Clothes">Clothes </Dropdown.Item>
      <Dropdown.Item eventKey="String">String </Dropdown.Item>

    </DropdownButton>
    <Link to="/add-product">
    <button variant="primary"className=" btn btn-primary add-product-btn" > <TiPlus size={25} /></button></Link>
    {tableVisible?(
    <button onClick={grid_view} className="btn btn-primary product-view-btn" >
     <BsFillGrid1X2Fill  size={25}/>
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
                  
                  <Card.Img variant="top" src={obj.images} style={{ height: "180px",width:"280px",padding:"10px"}} />
                  <div className="icon-overlay">
                    <button><FaInfoCircle /></button>
                    <button><FaRegEdit /></button>
                    <button><MdDeleteOutline /></button>
          </div>
                  <Card.Body>
                    <Card.Title>
                     <strong style={{ color: "#4e8cff"}}> {obj.title || "N/A"}</strong>
                    </Card.Title>             
                    <Card.Title>
                     <strong style={{ color: "black" }}>${obj.price || "N/A"}</strong> 
                     </Card.Title>
                     <Card.Title style={{display:"none"}}>
                     <strong style={{ color: "black" }}>{obj.category.name || "N/A"}</strong> 
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
