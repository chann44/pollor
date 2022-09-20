import axios from "axios";
import React from "react";
import { useState } from "react";


const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleChange = (e) => {
    if(e.target.name == 'name'){
      setName(e.target.value);
    } 
    else if(e.target.name == 'email'){
      setEmail(e.target.value);
    } 
    else if(e.target.name == 'password'){
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { name, email, password }
    let res = await axios.post('http://localhost:3000/api/signup', {
        email: data?.email,
        name: data?.name,
        password: data?.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    let response = await res.json();
    console.log(response);
   
    setName('')
    setEmail('')
    setPassword('')
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <form onSubmit={handleSubmit} className='mt-8 space-y-10' method="POST">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            value={name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="name"
            type="text"
            placeholder="name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            value={email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="email"
            type="email"
            placeholder="email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            value={password}
            onChange={handleChange}
            required
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="Password"
          />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
... (64 lines left)