import { UserContext } from "@/context/userContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { PieChart } from "react-minimal-pie-chart";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const CatalogInfo = () => {
  const navigate = useNavigate();
  const { catalogId } = useParams();
  const { token } = useContext(UserContext);
  const [catalog, setCatalog] = useState(null);
  const deleteCatalog = (id) => {
    axios
      .delete(`${BACKEND_URL}/api/catalog/${id}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        navigate("/");
      });
  };
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${BACKEND_URL}/api/catalog/${catalogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setCatalog(res.data);
      });
  }, [token]);
  return (
    // <div className='bg-neutral-600 min-h-screen text-white flex justify-center items-center'>
    //     {catalog && (<div>
    //         <img src={catalog.coverImgUrl} alt="coverImg" />
    //         <span>{catalog.name}</span>
    //     <button onClick={() => deleteCatalog(catalog._id)} className='px-4 p-2 rounded-md shadow-sm bg-red-600 text-white'>delete</button>
    //     </div>)}

    // </div>
    <>
      <div className="pt-32 bg-slate-800 flex flex-row min-h-screen">
        {catalog && (
          <div className="w-[600px] h-[600px]">
            <img
              className="w-full h-full object-contain"
              src={catalog.coverImgUrl}
              alt="coverimg"
            />
            {/* {
              <button
                onClick={() => deleteCatalog(catalog._id)}
                className="px-4 p-2 rounded-md shadow-sm bg-red-600 text-white"
              >
                delete
              </button>
            } */}
            {/* <span>{catalog.name}</span> */}
          </div>
        )}
        {catalog && (
          <div className="text-white font-mono text-2xl">
            <h1>Catalog Name:{catalog.name}</h1>
            <h1>Seller&apos;s email:{catalog.creator.email}</h1>
          </div>
        )}
        <div className="flex flex-wrap flex-col items-center pl-4">
          <div className="w-[300px] h-[300px]">
            <PieChart
              radius={30}
              data={[
                { title: "One", value: 10, color: "#E38627" },
                { title: "Two", value: 15, color: "#C13C37" },
                { title: "Three", value: 20, color: "#6A2135" },
              ]}
            />
          </div>
          <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar value={66} text={`${66}%`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogInfo;
