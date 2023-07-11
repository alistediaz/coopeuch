import React, { useRef, useState } from "react";
import { deleteTarea, updateTarea } from "../redux/tareaSlice";
import { selectTareaById } from "../redux/tareaSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineForm,
  AiFillSave,
  AiOutlineCarryOut,
  AiOutlineDelete,
  AiOutlineStop,
} from "react-icons/ai";

export const TareaItem = (props) => {
  const { item } = props;
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(true);
  const tarea = useSelector((state) => selectTareaById(state, item.id));
  const dispatch = useDispatch();

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
    setIsEditing(!isEditing);
  };

  const callUpdateTarea = async (tarea) => {
    await dispatch(updateTarea(tarea));
  };

  const update = (id, value) => {
    if (value === "") {
      alert("Debe ingresar descripción de la tarea");
      inputRef.current.value = tarea.descripcion;
    } else {
      if (value !== tarea.descripcions) {
        callUpdateTarea({ id, descripcion: value, vigente: tarea.vigente });
      }
      setIsEditing(false);
      inputRef.current.disabled = true;
    }
  };

  const updateVigente = (item) => {
    callUpdateTarea({ ...item, vigente: !item.vigente });
  };

  const eliminaTarea = async (tareaId) => {
    await dispatch(deleteTarea(tareaId));
  };
  return (
    <li
      key={item.id}
      className="card"
      style={!item.vigente ? { backgroundColor: "Ivory" } : {}}
    >
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.descripcion}
        maxLength={100}
      />
      <div className="btns">
        {!isEditing && (
          <button onClick={() => changeFocus()} title="Editar">
            <AiOutlineForm />
          </button>
        )}
        {isEditing && (
          <button
            onClick={() => update(item.id, inputRef.current.value)}
            title="Grabar"
          >
            <AiFillSave />
          </button>
        )}
        {item.vigente && (
          <button onClick={() => updateVigente(item)} title="Vigente">
            <AiOutlineCarryOut />
          </button>
        )}
        {!item.vigente && (
          <button
            style={{ color: "grey" }}
            onClick={() => updateVigente(item)}
            title="No Vigente"
          >
            <AiOutlineStop />
          </button>
        )}

        <button style={{ color: "red" }} onClick={() => eliminaTarea(item.id)} title="Eliminar">
          <AiOutlineDelete />
        </button>
      </div>

      {item.completed && <span className="completed">done</span>}
    </li>
  );
};
