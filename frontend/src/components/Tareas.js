import React, { useState, useEffect } from "react";
import { addNewTarea } from "../redux/tareaSlice";
import { useDispatch, useSelector } from "react-redux";

export const Tareas = () => {
  const [tarea, setTarea] = useState("")
  const [vigente, setVigente] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  // @ts-ignore
  const tareaStatus = useSelector((state) => state.status)
  const dispatch = useDispatch()

  const add = async () => {
    if (tarea === "") {
      alert("Debe ingresar descripción de la tarea");
    } else {
      setDisabledButton(true)
      await dispatch(
        addNewTarea({
          descripcion: tarea,
          vigente: vigente,
        })
      ).unwrap();
      setTarea("");
      setVigente(false);
    }
  };

  useEffect(() => {
    if (tareaStatus === "idle" || tareaStatus === "succeeded") {
      setDisabledButton(false)
    }
  }, [tareaStatus, dispatch]);

  const handleChange = (e) => {
    setTarea(e.target.value);
  };

  const handleChangeVigente = (e) => {
    setVigente(e.target.checked);
  };

  return (
    <div className="addTareas">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="tarea-input"
        value={tarea}
        maxLength={100}
        title="Descripción"
      />
      <div className="vigente">
        Vigente:
        <input type="checkbox" onChange={(e) => handleChangeVigente(e)} />
      </div>
      <button className="add-btn" onClick={() => add()} disabled={disabledButton}>
        Nueva
      </button>
    </div>
  );
};
