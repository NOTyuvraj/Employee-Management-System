import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import api from "../../api.js";

const AddEmployee = forwardRef((props, ref) => {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      dialogRef.current.showModal();
    },
    closeModal: () => {
      dialogRef.current.close();
    },
  }));

  const [img, setImg] = useState("");
  const [empName, setEmpName] = useState("");
  const [empJobTitle, setEmpJobTitle] = useState("");
  const [empDep, setEmpDep] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empPhone, setEmpPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/", {
        img,
        empName,
        empJobTitle,
        empDep,
        empEmail,
        empPhone: Number(empPhone),
      });
      alert("Data Saved Succesfully");
      dialogRef.current.close();
    } catch (err) {
      console.error("Error Saving Data : ", err);
    }
  };

  return (
    <dialog
      className="top-[40%] left-[50%] translate-[-50%] h-140 w-70"
      ref={dialogRef}
      id="modal"
    >
      <div className="flex text-center px-3 mx-3 my-3 text-lg justify-around">
        <h2>Add Employee Data</h2>
        <button
          className="pl-5 text-sm"
          id="close-btn"
          onClick={() => {
            dialogRef.current?.close();
          }}
        >
          X
        </button>
      </div>
      <form className="flex flex-col mx-4" onSubmit={handleSubmit}>
        <label htmlFor="empName" className="mt-2 mb-1 w">
          Enter Name :
        </label>
        <input
          id="empName"
          type="textarea"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
          placeholder="Employee Name"
          required
          className="border-1 border-black px-2 py-1"
        />

        <label htmlFor="jobTitle" className="mt-2 mb-1 w">
          Enter Job Title
        </label>
        <input
          id="jobTitle"
          type="textarea"
          value={empJobTitle}
          onChange={(e) => setEmpJobTitle(e.target.value)}
          placeholder="Employee Job Title"
          required
          className="border-1 border-black px-2 py-1"
        />

        <label htmlFor="department" className="mt-2 mb-1 w">
          Enter Department
        </label>
        <input
          id="department"
          type="textarea"
          value={empDep}
          onChange={(e) => setEmpDep(e.target.value)}
          placeholder="Employee Department"
          required
          className="border-1 border-black px-2 py-1"
        />

        <label htmlFor="email" className="mt-2 mb-1 w">
          Enter E-mail
        </label>
        <input
          id="email"
          type="email"
          value={empEmail}
          onChange={(e) => setEmpEmail(e.target.value)}
          placeholder="Employee E-Mail"
          required
          className="border-1 border-black px-2 py-1"
        />

        <label htmlFor="phone" className="mt-2 mb-1 w">
          Enter Phone
        </label>
        <input
          id="phone"
          type="number"
          max={9999999999}
          min={0o00000000}
          value={empPhone}
          onChange={(e) => setEmpPhone(e.target.value)}
          placeholder="Employee Phone"
          required
          className="border-1 border-black px-2 py-1"
        />

        <label htmlFor="img" className="mt-2 mb-1 w">
          Enter Image URL
        </label>
        <input
          id="img"
          type="url"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="Employee Image URL"
          required
          className="border-1 border-black px-2 py-1"
        />
        <button
          className="mt-4 rounded bg-indigo-600 text-white hover:bg-indigo-300 hover:text-black  "
          type="submit"
        >
          Add
        </button>
      </form>
    </dialog>
  );
});

export default AddEmployee;
