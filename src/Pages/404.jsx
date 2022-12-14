import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 2000)
    },[]);

    return (
    <div className='mx-auto text-center '>
      <div className=' mt-[15rem]'>
        <h1 className='text-8xl font-bold text-txt'>Ooops....</h1>
        <br />
        <h1 className='text-3xl font-bold text-txt'>
          Halaman yang anda cari tidak ditemukan!
        </h1>
      </div>
    </div>
    );
}