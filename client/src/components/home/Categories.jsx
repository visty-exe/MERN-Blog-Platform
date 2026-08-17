import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { category } from "../../constants/Category";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
  margin: 18px;
  width: 85%;
  background: #6495ed;
  color: #fff;

  &:hover {
    background: #4f7fd8;
  }

  @media (max-width: 800px) {
    width: fit-content;
    min-width: 0;
    background: #6495ed;
    color: #fff;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const Categories = () => {
  const [searchParam] = useSearchParams();

  const selectedCategory = searchParam.get("category");

  return (
    <div className="bg-white rounded-2xl m-2">
      {/* Create Button */}
      <Link
        to={`/create?category=${selectedCategory || ""}`}
        style={{ textDecoration: "none" }}
      >
        <StyledButton>Create</StyledButton>
      </Link>

      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">All Categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {category.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <StyledLink to={`/?category=${c.type}`}>{c.type}</StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </div>
  );
};

export default Categories;
