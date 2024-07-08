import React, { useEffect, useState } from 'react'
import { BackendUrl } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
// import Cookies from "js-cookie";


//<--------for now game card img wil hard provided from client side will add multer func later----------->

interface postgameprops{
    title: string,
    description: string
    tokenreq: string
}

export default function PostGames() {
    const [postGameinputs, setpostGameinputs] = useState<postgameprops>({title:"", description:"" ,tokenreq: ""})
    const navigate = useNavigate()
    console.log(postGameinputs)

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-4 border border-black rounded-xl p-4 min-w-[40rem] text-black">
        <h1 className="font-bold text-2xl mb-4">Create Games</h1>
        <input
          type="text"
          placeholder="Title"
          className="rounded-lg border border-black w-full px-2 py-1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setpostGameinputs((c) => ({ ...c, title: e.target.value }))
          }
          value={postGameinputs.title}
        />
        <input
          type="text"
          placeholder="Description"
          className="rounded-lg border border-black w-full px-2 py-1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setpostGameinputs((c) => ({ ...c, description: e.target.value }))
          }
          value={postGameinputs.description}
        />
        <input
          type="number"
          placeholder="token req for each game to start"
          className="rounded-lg border border-black w-full px-2 py-1"
          onChange={(e) =>
            //@ts-ignore
            setpostGameinputs((c) => ({ ...c, tokenreq: e.target.value }))
          }
          value={postGameinputs.tokenreq}
        />
        <button
          className="px-3 py-2 rounded-lg border bg-black text-white border-black font-bold text-xl"
          onClick={async () => {
            try {
              const res = await axios.post(`${BackendUrl}/admin/postgame`, {
                title: postGameinputs.title,
                description: postGameinputs.description,
                tokenreq: postGameinputs.tokenreq,
              },{
                headers:{
                  Authorization: localStorage.getItem("admintoken")
                }
              });
              if(res.status === 200){
                toast.success(res.data.msg)
                setpostGameinputs({title:"",description:"",tokenreq:""})
              }

               
              

              console.log(res.data);
            } catch (error) {
              console.log(error);
              toast.error("Imposter Admin");
            }
          }}
        >
          {" "}
          PostGame
        </button>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            
            duration: 3000,
            
          },
        }}
      />
    </div>
  );
}
