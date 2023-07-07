// @ts-ignore
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// @ts-ignore
import axios from "axios";

const initialState = {
  tareas: [],
  status: "idle",
  error: null,
};

export const fetchTareas = createAsyncThunk("tareas/fetchTareas", async () => {
  try {
    const response = await axios.get("http://localhost:8080/tareas");
    return response.data;
  } catch (error) {
    throw new Error("Error obteniendo tareas");
  }
});

export const addNewTarea = createAsyncThunk(
  "tareas/addNewTarea",
  async (tarea) => {
    try {
      const response = await axios.post("http://localhost:8080/tareas", tarea);
      return response.data;
    } catch (error) {
      throw new Error("Error guardando tarea");
    }
  }
);

export const updateTarea = createAsyncThunk(
  "tareas/updateTarea",
  async (tarea) => {
    try {
      const response = await axios.put("http://localhost:8080/tareas", tarea);
      return response.data;
    } catch (error) {
      throw new Error("Error actualizando tarea");
    }
  }
);

const tareaSlice = createSlice({
  name: "tareas",
  initialState,
  reducers: {
    removeTareas: (state, action) => {
      return state.tareas.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchTareas.pending || addNewTarea.pending || updateTarea.pending,
        (state, action) => {
          state.status = "loading";
        }
      )
      .addCase(
        fetchTareas.fulfilled || addNewTarea.fulfilled || updateTarea.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.tareas = action.payload;
        }
      )
      .addCase(
        fetchTareas.rejected || addNewTarea.rejected || updateTarea.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addCase(updateTarea.fulfilled, (state, action) => {
        state.tareas.push(action.payload);
        state.status = "succeeded";
      });
  },
});

export const { removeTareas } = tareaSlice.actions;

export const reducer = tareaSlice.reducer;

export const selectAllTareas = (state) => state.tareas;

export const selectTareaById = (state, tareaId) =>
  state.tareas.tareas.find((tareas) => tareas.id === tareaId);
