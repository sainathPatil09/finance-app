import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function RecentTransaction({...probs}) {
  const formattedDate = new Date(probs.date).toLocaleDateString();

  const handleDelete= async(id)=>{
    console.log(id)
    try {
      // await axios.delete('/api/users/delete')
      const response = await axios.delete(`/api/users/delete/${id}`)
      
      console.log(response, "Trancation deleted succesfully");

    } catch (error) {
      console.log(error, " error in deleting transaction")
    }
  }


  return (
    <>
      {/* <div> */}
      <div className=" w-full text-white rounded-lg h-28 flex justify-around  items-center space-x-5 hover:scale-95 duration-300 shadow-xl hover:shadow-slate-800 ">
        <div className="w-5 h-5 bg-green-500 blur-sm  border rounded-full text-center p-3"></div>

        <div className="space-y-2 w-72 text-lg ">
          <div className="flex gap-8  justify-between">
            <p>salary{"  "}  <span className="font-semibold">{probs.amount}</span></p>
            {/* <p className="font-semibold">{probs.amount}</p> */}
            <p className="">{formattedDate}</p>
          </div>
          <p>{probs.note}</p>
        </div>

        <div>
          <MdDelete onClick={()=>{handleDelete(probs.id)}} className="cursor-pointer" size={30} />
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
