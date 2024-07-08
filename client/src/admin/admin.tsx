import axios from "axios";
import { BackendUrl } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
    const [adminInputs, setadminInputs] = useState({email: "", password: ""})
    const navigate = useNavigate()
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-4 border border-black rounded-xl p-4 min-w-[40rem] text-black">
        <h1 className="font-bold text-2xl mb-4">Admin signin</h1>
        <input
          type="text"
          placeholder="email"
          className="rounded-lg border border-black w-full px-2 py-1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setadminInputs((c) => ({ ...c, email: e.target.value }))
          }
        />
        <input
          type="password"
          placeholder="password"
          className="rounded-lg border border-black w-full px-2 py-1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setadminInputs((c) => ({ ...c, password: e.target.value }))
          }
        />
        <button
          className="px-3 py-2 rounded-lg border bg-black text-white border-black font-bold text-xl"
          onClick={async () => {
            const res = await axios.post(`${BackendUrl}/admin/signin`, {
                email: adminInputs.email,
                password: adminInputs.password
            });
            console.log(res.data);
            if(res.status === 200){
                navigate('/postgames')
            }
          }}
        >
          {" "}
          Signin
        </button>
      </div>
    </div>
  );
}
