import { useEffect, useState } from "react";
import Table from "./Table";
import Add from "./Add";

interface PhoneData {
  name: string;
  phone: string;
  _id: string;
}

const App = () => {
  const [data, setData] = useState<PhoneData[]>([]);
  const [pressed, setPressed] = useState<boolean>(false);
  const [updatePressed, setUpdatePressed] = useState<PhoneData | null>(null);
  const [deletePressed, setDeletePressed] = useState<boolean>(false);

  const fetchData = () => {
    fetch("/fetchData")
      .then((response) => response.json())
      .then((results) => setData(results));
  };

  const handleAdd = () => {
    setPressed(true);
    setUpdatePressed(null);
  };

  useEffect(() => {
    if (!pressed) {
      fetchData();
    }
  }, [pressed]);

  useEffect(() => {
    if (deletePressed) {
      fetchData();
    }
  }, [!deletePressed]);

  return (
    <div className="w-screen h-screen bg-neutral-200 flex items-center justify-center ">
      {deletePressed && (
        <div
          role="alert"
          className="alert absolute top-4 left-1/2 transform -translate-x-1/2 w-3/4 alert-success"
        >
          <span>Contact Deleted Successfully.</span>
        </div>
      )}
      <div className="px-6 pb-6 w-[28rem] h-3/4 bg-white rounded-2xl flex flex-col justify-center max-sm:mx-4">
        <h1 className="text-3xl font-black my-4 text-primary max-sm:text-2xl self-center">
          Phone Book
        </h1>
        {pressed ? (
          <Add updatePressed={updatePressed} setPressed={setPressed} />
        ) : (
          <>
            <Table
              setDeletePressed={setDeletePressed}
              setUpdatePressed={setUpdatePressed}
              data={data}
              setPressed={setPressed}
            />
            <div className="w-full flex pt-4">
              <button
                onClick={handleAdd}
                data-tip="Add"
                className="ml-auto tooltip tooltip-bottom tooltip-primary flex items-center justify-center btn btn-circle btn-primary btn-outline"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12H16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
