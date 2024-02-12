import React, { FormEvent, SetStateAction, useRef, useState, useEffect } from "react";

interface FormData {
  name: string,
  phone: string,
  _id: string,
}

interface ChildProps {
  setPressed: React.Dispatch<SetStateAction<boolean>>;
  updatePressed: FormData | null;
}

const Add: React.FC<ChildProps> = ({ setPressed, updatePressed }) => {
  const phoneInput = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    _id: ""
  });

  useEffect(() => {
    if (updatePressed) {
      setFormData(updatePressed);
    }
  }, [updatePressed]);

  const handleAdd = () => {
    setPressed(false);
  };

  const handleUpdateSubmit = (event: FormEvent) => {
    event.preventDefault();
    const endpoint = updatePressed ? '/update/' + updatePressed._id : '/addPhone';
    console.log(formData);
    
    fetch(endpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => response.json()).then((data) => {
      console.log('Form is Successfully Submitted.', data)
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    });
  }

  const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/\d/.test(event.key) && event.key !== "Backspace" && event.key !== 'Enter') {
      event.preventDefault();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = event.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone: phoneNumber });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <button
        onClick={handleAdd}
        className="btn btn-circle btn-outline outline-primary outline-5 text-primary hover:bg-primary"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="w-full h-full rounded-xl flex items-center">
        <form onSubmit={handleUpdateSubmit} className="w-full">
          <input
            required
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="rounded-3xl input input-bordered input-primary w-full my-2 bg-transparent outline-none"
            type="text"
            placeholder="Enter the Name"
          />
          <input
            ref={phoneInput}
            onKeyDown={handleKeypress}
            onInput={handleInput}
            value={formData.phone}
            required
            name="phone"
            type="tel"
            pattern="[0-9]*"
            className="rounded-3xl input input-bordered input-primary w-full my-2 bg-transparent outline-none"
            placeholder="Enter the Number"
          />
          <button
            className="btn btn-primary w-full my-2 hover:rounded-3xl transition-all duration-300 ease-in-out"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
      {submitted && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Contact Added Successfully!</span>
        </div>
      )}
    </>
  );
};

export default Add;
