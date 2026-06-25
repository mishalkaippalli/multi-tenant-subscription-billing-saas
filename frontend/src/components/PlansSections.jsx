import { useEffect, useState } from "react";
import api from "../services/api";

function PlansSection() {

    const [plans, setPlans] = useState([]);

    const [formData, setFormData] = useState({
        name:"",
        price:"",
        billingInterval:"monthly"
    });

    useEffect(()=>{
        fetchPlans();
    },[]);

    const fetchPlans = async()=>{

        try{

            const response = await api.get("/plans");

            setPlans(response.data.plans);

        }catch(error){

            console.log(error);

        }

    };

    const handleChange=(e)=>{

        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            await api.post("/plans",formData);

            fetchPlans();

            setFormData({
                name:"",
                price:"",
                billingInterval:"monthly"
            });

        }catch(error){

            alert(error.response.data.message);

        }

    };

    const deletePlan=async(id)=>{

        if(!window.confirm("Delete this plan?")) return;

        try{

            await api.delete(`/plans/${id}`);

            fetchPlans();

        }catch(error){

            console.log(error);

        }

    };

    return(

        <div className="bg-white rounded-xl shadow p-6 mt-8">

            <h2 className="text-2xl font-semibold text-slate-800">
                Plans
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-3 gap-4 mb-8"
            >

                <input
                    className="border rounded-lg p-3"
                    name="name"
                    placeholder="Plan Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    className="border rounded-lg p-3"
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <button
                    className="bg-blue-600 text-white rounded-lg"
                >
                    Add Plan
                </button>

            </form>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">
                            Name
                        </th>

                        <th className="text-left">
                            Price
                        </th>

                        <th className="text-left">
                            Interval
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        plans.map(plan=>(

                            <tr
                                key={plan._id}
                                className="border-b"
                            >

                                <td className="py-4">
                                    {plan.name}
                                </td>

                                <td>
                                    ₹{plan.price}
                                </td>

                                <td>
                                    {plan.billingInterval}
                                </td>

                                <td>

                                    <button
                                        className="bg-red-500 text-white px-3 py-2 rounded"
                                        onClick={()=>deletePlan(plan._id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default PlansSection;