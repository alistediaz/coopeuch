import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tareas: [],
  status: "idle",
  error: null,
};

const ApiUrl = "http://localhost:8080/tareas";

export const fetchTareas = createAsyncThunk("tareas/fetchTareas", async () => {
  try {
    const response = await axios.get(ApiUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error obteniendo tareas");
  }
});

export const addNewTarea = createAsyncThunk(
  "tareas/addNewTarea",
  async (tarea) => {
    try {
      const response = await axios.post(ApiUrl, tarea);
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
      const response = await axios.put(ApiUrl, tarea);
      return response.data;
    } catch (error) {
      throw new Error("Error actualizando tarea");
    }
  }
);

export const deleteTarea = createAsyncThunk(
  "tareas/deleteTarea",
  async (tareaId) => {
    try {
      await axios.delete(`http://localhost:8080/tareas/${tareaId}`);
      return tareaId;
    } catch (error) {
      throw new Error("Error eliminando tarea");
    }
  }
);

const tareaSlice = createSlice({
  name: "tareas",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTareas.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTareas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tareas = action.payload;
      })
      .addCase(fetchTareas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTarea.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewTarea.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tareas.push(action.payload);
      })
      .addCase(addNewTarea.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTarea.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTarea.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tareas = state.tareas.map((tarea) =>
          tarea.id === action.payload.id ? action.payload : tarea
        );
      })
      .addCase(updateTarea.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTarea.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTarea.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tareas = state.tareas.filter((tarea) => tarea.id !== action.payload);
      })
      .addCase(deleteTarea.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const reducer = tareaSlice.reducer;

export const selectAllTareas = (state) => state.tareas;

export const selectTareaById = (state, tareaId) =>
  state.tareas.find((tarea) => tarea.id === tareaId);
