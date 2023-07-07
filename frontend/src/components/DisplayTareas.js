import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTareas, fetchTareas } from '../redux/tareaSlice'
import TareaItem from "./TareaItem";

export const DisplayTareas = (props) => {
  const dispatch = useDispatch()
  // @ts-ignore
  const tareaStatus = useSelector((state) => state.status)
  // @ts-ignore
  const error = useSelector((state) => state.error)
  const tareas = useSelector(selectAllTareas)

  useEffect(() => {
    if (tareaStatus === 'idle') {
      dispatch(fetchTareas())
    }
  }, [tareaStatus, dispatch, tareas])

  let content

  if (tareaStatus === 'loading') {
    content = <h3>Leyendo...</h3>
  } else if (tareaStatus === 'succeeded') {

    content = tareas.map((tarea) => {
      return (
        <TareaItem
          key={tarea.id}
          item={tarea}
          removeTarea={props.removeTarea}
          updateTarea={props.updateTarea}
        />
      );
    })
  }

  return (
    <div className="displaytareas">
      { tareaStatus === 'failed' && (<div>{error}</div>)}
      <ul>
          {content}
      </ul>
    </div>
  );
};