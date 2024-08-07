import { useNavigate } from "react-router-dom";

function Paginate({ pages, page, keyword = "", isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }
  const navigate = useNavigate();
  const pageChangeHandler = (pageNumber) => {
    if (!isAdmin) {
      navigate(`/?keyword=${keyword}&page=${pageNumber}`);
    } else {
      navigate(`/admin/productlist/?keyword=${keyword}&page=${pageNumber}`);
    }
  };

  return (
    pages > 1 && (
      <ul style={{ display: "flex", marginTop: "50px" }}>
        {[...Array(pages).keys()].map((x) => (
          <li
            key={x + 1}
            onClick={() => pageChangeHandler(x + 1)}
            style={{
              cursor: "pointer",
              userSelect: "none",
              listStyleType: "none",
              margin: "0px 0px",
              padding: "10px 15px",
              backgroundColor: `${x + 1 === page ? "black" : "white"}`,
              color: `${x + 1 === page ? "white" : "black"}`,
            }}
          >
            {x + 1}
          </li>
        ))}
      </ul>
    )
  );
}

export default Paginate;
