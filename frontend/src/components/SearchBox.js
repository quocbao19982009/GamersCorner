import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const SearchBox = () => {
  const [keyword, setKeyword] = useState("");

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <FormControl
        type="search"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products"
        aria-label="Search"
        className="me-sm-2 ms-sm-5"
      ></FormControl>
      <Button type="submit" variant="outline-success" className="btn-block">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
