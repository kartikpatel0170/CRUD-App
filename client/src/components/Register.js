import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

    const history = useHistory("");

    const [inpval, setINP] = useState({
        name:"",
        email:"",
        age:"",
        mobile:"",
        position:"",
        address:"",
        description:""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const {name, value} = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]:value
            }
        })

    }

    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, age, mobile, position, address, description} = inpval;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, age, mobile, position, address, description
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 404 || !data) {
            console.log("error ");
            alert("error");

        } else {
            history.push("/")
            setUdata(data)
            console.log("Data Added Sucessfully!");

        }
    }

  return (
    <div className="container">
        <NavLink to="/">home</NavLink>
        <form className="mt-5">
            <div  className="row">
                <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputPassword1">Age</label>
                    <input type="number" value={inpval.age} onChange={setdata} name="age" className="form-control" id="exampleInputPassword1" placeholder="age"/>
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputPassword1">Mobile</label>
                    <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" className="form-control" id="exampleInputPassword1" placeholder="xxx-xxx-xxxx"/>
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputPassword1">Position</label>
                    <input type="text" value={inpval.position} onChange={setdata} name="position" className="form-control" id="exampleInputPassword1" placeholder="position"/>
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input type="text" value={inpval.address} onChange={setdata} name="address" className="form-control" id="exampleInputPassword1" placeholder="position"/>
                </div>
                <div className="form-group mb-3 col-lg-12 col-md-12 col-12">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input type="text" value={inpval.description} onChange={setdata} name="description" className="form-control" id="" cols="30" rows="5" placeholder="..."/>
                </div>
                <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>

  );
}

export default Register;