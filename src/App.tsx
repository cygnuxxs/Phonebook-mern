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
  const [toggleDelete, setToggleDelete] = useState<boolean>(false)
  const [pressed, setPressed] = useState<boolean>(false);
  const [updatePressed, setUpdatePressed] = useState<PhoneData | null>(null);
  const [deletePressed, setDeletePressed] = useState<boolean>(false);

  const fetchData = () => {
    fetch("/fetchData")
      .then((response) => response.json())
      .then((results) => setData(results));
  };

  const toggleDeleteFunc = () => {
    if (toggleDelete) {
      setToggleDelete(false)
    } else {
      setToggleDelete(true)
    }
  }

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
              toggleDelete = {toggleDelete}
              setPressed={setPressed}
            />
            <div className="w-full flex pt-4 justify-between">
              <button
                onClick={toggleDeleteFunc}
                data-tip={toggleDelete ? 'Hide Delete' : 'Show Delete'}
                className="tooltip tooltip-bottom tooltip-primary flex items-center justify-center btn btn-circle btn-primary btn-outline"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.33 16.5H13.66"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 12.5H14.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleAdd}
                data-tip="Add"
                className="tooltip tooltip-bottom tooltip-primary flex items-center justify-center btn btn-circle btn-primary btn-outline"
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
