import React, { useEffect, useState } from "react";
import "./Scroll.css";

const Scroll = () => {
  const [data, setdata] = useState([]);
  const[scrollpercentage,setscrollpercentage]=useState(0);
//   const scrollpercentage=0;

  const item = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const dataa = await response.json();
      // console.log(dataa);
      if (dataa) {
        setdata(dataa.products);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    item();
  }, []);

  function handleScrollPercentage() {
    const howmuchscrol = document.documentElement.scrollTop;
    const remaninigscroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
     
      setscrollpercentage((howmuchscrol / remaninigscroll) * 100);
    console.log(
      // document.body.scrollTop,

      scrollpercentage
    );
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  console.log(data);
  return (
    <div className="Scroll">
      <div className="heading">
        <h1 className="si">Scroll Indicator</h1>
        <div className="full">
          <div
            className="indicator"
            style={{ width: `${scrollpercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="items">
        {data && data.length > 0 ? (
          data.map((dataitem, index) => <p key={index}>{dataitem.title}</p>)
        ) : (
          <p>Item Not found</p>
        )}
      </div>
    </div>
  );
};

export default Scroll;
