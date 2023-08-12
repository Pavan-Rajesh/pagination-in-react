"use client";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";

async function getData() {
  const myresults = await fetch("https://dummyjson.com/products?limit=100");
  const myres = await myresults.json();
  return myres;
}

const Page = () => {
  const [results, setResults] = useState({});
  const [page, setPage] = useState(2);

  function changePage(disp) {
    if (disp == "prev") {
      if (page != 0 && page > 0) {
        setPage((prevPage) => prevPage - 1);
      }
    } else {
      if (
        page != results.products.length / 10 &&
        page < results.products.length
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }

  useEffect(() => {
    let data = getData();
    data.then((data) => {
      setResults(data);
    });
  }, []);
  return (
    <>
      <ul>
        {results.products ? (
          results.products.slice(page * 10 - 10, page * 10).map((data) => (
            <li key={data.id}>
              <h1>{data.brand}</h1>
              <img src={data.thumbnail} alt={data.description} />
            </li>
          ))
        ) : (
          <h2>loading</h2>
        )}
      </ul>

      {results.products ? (
        <div>
          <button
            onClick={() => {
              changePage("prev");
            }}
          >
            previous
          </button>
          {[...Array(results.products.length / 10)].map((x, index) => (
            <button
              style={
                index == page
                  ? { backgroundColor: "red" }
                  : { backgroundColor: "blue" }
              }
              key={index}
              onClick={() => {
                setPage(index);
              }}
            >
              {index}
            </button>
          ))}
          <button
            onClick={() => {
              changePage("next");
            }}
          >
            next
          </button>
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </>
  );
};

export default Page;
