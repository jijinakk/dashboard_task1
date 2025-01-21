import React from 'react'

const Product = () => {
  
  return (
    <div>
    <div
      className="btn btn-primary"
      style={{
        display: "inline-block",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        borderRadius: "4px",
        textAlign: "center",
        cursor: "pointer",
      }}
      // Inline JavaScript for click event
      onClick={() => {
        alert("Product Cancelled");
        console.log("Product Cancelled");
      }}
    >
      Product
    </div>
  </div>
  )
}

export default Product