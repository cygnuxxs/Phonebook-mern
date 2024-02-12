import React, { SetStateAction, useCallback } from "react";

interface PhoneBook {
  name: string;
  phone: string;
  _id: string;
}

interface Props {
  data: PhoneBook[];
  setPressed: React.Dispatch<SetStateAction<boolean>>;
  setUpdatePressed: React.Dispatch<SetStateAction<PhoneBook | null>>;
  setDeletePressed: React.Dispatch<SetStateAction<boolean>>;
}

const Table: React.FC<Props> = ({
  data,
  setPressed,
  setUpdatePressed,
  setDeletePressed,
}) => {
  const handleUpdate = useCallback(
    (form: PhoneBook) => {
      setPressed(true);
      setUpdatePressed(form);
    },
    [setPressed, setUpdatePressed]
  );

  const handleDelete = useCallback(
    (form: PhoneBook) => {
      fetch("/delete/" + form._id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Contact Deleted Successfully", data);
        });
      setDeletePressed(true);
      setTimeout(() => setDeletePressed(false), 1000);
    },
    [setDeletePressed]
  );

  return (
    <div className="w-full h-full rounded-xl overflow-y-scroll">
      {data.length !== 0 ? (
        <table className="table table-pin-rows">
          <thead>
            <tr className="bg-inherit">
              <th className="text-center w-2/5">Name</th>
              <th className="text-center w-2/5">Mobile</th>
              <th className="text-center w-1/5"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((result, key) => (
              <tr key={key} className="hover">
                <td className="overflow-x-scroll text-center">{result.name}</td>
                <td className="text-center">{result.phone}</td>
                <td className="text-center flex items-center">
                  <a
                    onClick={() => handleUpdate(result)}
                    className="cursor-pointer mr-4"
                  >
                    <svg
                      className="text-primary hover:text-success"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    className="cursor-pointer"
                    onClick={() => handleDelete(result)}
                  >
                    <svg
                    className="text-primary hover:text-secondary"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.16998 14.83L14.83 9.17004"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.83 14.83L9.16998 9.17004"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-lg">No Data Found in the Database.</h1>
        </div>
      )}
    </div>
  );
};

export default Table;
