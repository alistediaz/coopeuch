import React, { useRef, useState } from "react";
import {
  AiOutlineForm,
  AiFillSave,
  AiOutlineCarryOut,
  AiOutlineDelete,
  AiOutlineStop,
} from "react-icons/ai";

const TareaItem = (props) => {
  const { item, updateTarea, removeTarea } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [tarea, setTarea] = useState(item.descripcion);
  const [vigente, setVigente] = useState(item.vigente);
  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
    setIsEditing(!isEditing);
  };

  const update = (id, value) => {
    if (value === "") {
      alert("Debe ingresar descripción de la tarea");
      inputRef.current.value = tarea;
    } else {
      if (value !== tarea) {
        //updateTarea({ id, tarea: value, vigente: vigente });
        setTarea(value);
      }
      setIsEditing(false);
      inputRef.current.disabled = true;
    }
  };

  const updateVigente = (item, e) => {
    updateTarea({ ...item, vigente: e.target.checked });
    setVigente(e.target.checked);
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

        <button
          style={{ color: "red" }}
          onClick={() => removeTarea(item.id)}
          title="Eliminar"
        >
          <AiOutlineDelete />
        </button>
      </div>

      {item.completed && <span className="completed">done</span>}
    </li>
  );
};

export default TareaItem;
