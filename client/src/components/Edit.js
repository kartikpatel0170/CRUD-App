import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useHistory } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'


const Edit = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const {updata, setUPdata} = useContext(updatedata)

    const history = useHistory("");

    const [inpval, setINP] = useState({ 
        name: "",
        email: "",
        age: "",
        mobile: "",
        position: "",
        address: "",
        description: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const {name,email,age,mobile,position,address,description} = inpval;

        const res2 = await fetch(`/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,email,age,mobile,position,address,description
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("Invalid data!!");
        }else{
            history.push("/")
            setUPdata(data2);
        }

    }
    
    return (
        <div className="container">
            <NavLink to="/">home2</NavLink>
            <form className="mt-5">
                <div  className="row">
                    <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1">Age</label>
                        <input type="number" value={inpval.age} onChange={setdata} name="age" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1">Mobile</label>
                        <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" className="form-control" id="exampleInputPassword1" placeholder="xxx-xxx-xxxx"/>
                    </div>
                    <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1">Position</label>
                        <input type="text" value={inpval.position} onChange={setdata} name="position" className="form-control" id="exampleInputPassword1" placeholder="position"/>
                    </div>
                    <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1">Address</label>
                        <input type="text" value={inpval.address} onChange={setdata} name="address" className="form-control" id="exampleInputPassword1" placeholder="position"/>
                    </div>
                    <div className="form-group mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1">Description</label>
                        <input type="text" value={inpval.description} onChange={setdata} name="description" className="form-control" id="" cols="30" rows="5" placeholder="..."/>
                    </div>
                    <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
      );
}

export default Edit