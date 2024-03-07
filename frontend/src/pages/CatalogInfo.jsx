import { UserContext } from "@/context/userContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { PieChart } from "react-minimal-pie-chart";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const option = {
  responsive: true,
  plugins: {
    legend: { position: "chartArea" },
    title: {
      display: true,
      text: "Modular Bar Chart",
    },
  },
};
const data = {
  labels: ["compliance", "correctness", "completeness"],
  datasets: [
    {
      label: "",
      data: [20, 30, 40],
      backgroundColor: "white",
    },
  ],
};

const CatalogInfo = () => {
  const navigate = useNavigate();
  const { catalogId } = useParams();
  const { token } = useContext(UserContext);
  const [catalog, setCatalog] = useState(null);
  const [value, setValue] = useState(0); //score

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
  useEffect(() => {
    if (catalog) {
      let calculatedValue = 0;
      // Calculate the value based on catalog parameters
      if (catalog.has_foul_language) {
        calculatedValue += 25;
      }
      if (catalog.has_images) {
        calculatedValue += 25;
      }
      if (catalog.has_prices) {
        calculatedValue += 25;
      }
      // Set the value for the CircularProgressbar
      setValue(calculatedValue);
    }
  }, [catalog]);
  //   }
  const getRandomData = () => {
    const data = [];
    const titles = ["One", "Two", "Three"];
    const colors = ["#E38627", "#C13C37", "#6A2135"]; // Pre-defined colors
    for (let i = 0; i < titles.length; i++) {
      const value = Math.floor(Math.random() * 100) + 1; // Generate a random value between 1 and 100
      data.push({ title: titles[i], value, color: colors[i] });
    }
    return data;
  };

  return (
    // <div className='bg-neutral-600 min-h-screen text-white flex justify-center items-center'>
    //     {catalog && (<div>
    //         <img src={catalog.coverImgUrl} alt="coverImg" />
    //         <span>{catalog.name}</span>
    //     <button onClick={() => deleteCatalog(catalog._id)} className='px-4 p-2 rounded-md shadow-sm bg-red-600 text-white'>delete</button>
    //     </div>)}

    // </div>
    <>
      <div className="pt-32  bg-slate-800 flex flex-row min-h-screen justify-center items-center">
        {catalog && (
          <div className="w-[600px] h-[600px] pl-2">
            <img
              className="w-full h-full object-contain"
              src={catalog.coverImgUrl}
              alt="coverimg"
            />
          </div>
        )}
        {catalog && (
          <div className="text-white font-mono text-2xl pl-4">
            <h1>Catalog Name:{catalog.name}</h1>
            <h1>Seller&apos;s email:{catalog.creator.email}</h1>
            <div>
              <h2 className="mt-2 text-lg font-semibold text-white-900 dark:text-white">
                CATALOG DESCRIPTION
              </h2>
              <ul className="max-w-md space-y-1 text-white-500 list-disc list-inside dark:text-gray-400">
                <li>
                  {catalog.has_foul_language
                    ? "This catalog contains foul language. It's advisable to review and improve the language for a better experience."
                    : "No foul language was detected in this catalog."}
                </li>
                <li>
                  {catalog.has_images
                    ? "This catalog contains images, enhancing the visual experience."
                    : "No images were found in this catalog. Consider adding visuals to make it more appealing."}
                </li>
                <li>
                  {catalog.has_price
                    ? "This catalog includes prices, making it easier for customers to understand pricing."
                    : "No prices were listed in this catalog. Consider adding prices for clarity and transparency."}
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className="flex flex-wrap flex-col items-center pl-4">
          <div className="w-[300px] h-[300px]">
            <Bar options={option} data={data} />
          </div>
          <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar value={value} text={`${value}%`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogInfo;