import { reducer } from "../redux/tareaSlice";

test("reducers tareas/fetchTareas/pending", () => {
  let state;
  state = reducer(
    { tareas: [], status: "idle", error: null },
    {
      type: "tareas/fetchTareas/pending",
      meta: { requestId: "VGqUGGWUpY5E4NpSc4TlC", requestStatus: "pending" },
    }
  );
  expect(state).toEqual({ tareas: [], status: "loading", error: null });
});

test("reducers tareas/fetchTareas/fulfilled", () => {
  let state;
  state = reducer(
    {
      tareas: [
        {
          id: 10,
          descripcion: "Tarea 6.1",
          fechaCreacion: "2023-07-03T20:10:27.708+00:00",
          vigente: true,
        },
      ],
      status: "succeeded",
      error: null,
    },
    {
      type: "tareas/fetchTareas/fulfilled",
      payload: [
        {
          id: 10,
          descripcion: "Tarea 6.1",
          fechaCreacion: "2023-07-03T20:10:27.708+00:00",
          vigente: true,
        },
      ],
      meta: { requestId: "MGOVXB_5JwCipKLSOjdeq", requestStatus: "fulfilled" },
    }
  );
  expect(state).toEqual({
    tareas: [
      {
        id: 10,
        descripcion: "Tarea 6.1",
        fechaCreacion: "2023-07-03T20:10:27.708+00:00",
        vigente: true,
      },
    ],
    status: "succeeded",
    error: null,
  });
});

test("reducers tareas/fetchTareas/rejected", () => {
  let state;
  state = reducer(
    { tareas: [], status: "loading", error: null },
    {
      type: "tareas/fetchTareas/rejected",
      meta: {
        requestId: "S-xUAlCQ6VBQysh7jkZTu",
        rejectedWithValue: false,
        requestStatus: "rejected",
        aborted: false,
        condition: false,
      },
      error: {
        name: "Error",
        message: "Error obteniendo tareas",
      },
    }
  );
  expect(state).toEqual({
    tareas: [],
    status: "failed",
    error: "Error obteniendo tareas",
  });
});

test("reducers tareas/addNewTarea/pending", () => {
  let state;
  state = reducer(
    {
      tareas: [
        {
          id: 33,
          descripcion: "test",
          fechaCreacion: "2023-07-10T22:05:09.882+00:00",
          vigente: true,
        },
      ],
      status: "succeeded",
      error: null,
    },
    {
      type: "tareas/addNewTarea/pending",
      meta: {
        arg: { descripcion: "test 2", vigente: false },
        requestId: "4JepWR6CgmxujuyJ6Zc0b",
        requestStatus: "pending",
      },
    }
  );
  expect(state).toEqual({
    tareas: [
      {
        id: 33,
        descripcion: "test",
        fechaCreacion: "2023-07-10T22:05:09.882+00:00",
        vigente: true,
      },
    ],
    status: "loading",
    error: null,
  });
});

test("reducers tareas/addNewTarea/fulfilled", () => {
  let state;
  state = reducer(
    {
      tareas: [
        {
          id: 33,
          descripcion: "test",
          fechaCreacion: "2023-07-10T22:05:09.882+00:00",
          vigente: true,
        },
      ],
      status: "loading",
      error: null,
    },
    {
      type: "tareas/addNewTarea/fulfilled",
      payload: {
        id: 34,
        descripcion: "test 2",
        fechaCreacion: null,
        vigente: false,
      },
      meta: {
        arg: { descripcion: "test 2", vigente: false },
        requestId: "4JepWR6CgmxujuyJ6Zc0b",
        requestStatus: "fulfilled",
      },
    }
  );
  expect(state).toEqual({
    tareas: [
      {
        id: 33,
        descripcion: "test",
        fechaCreacion: "2023-07-10T22:05:09.882+00:00",
        vigente: true,
      },
      { id: 34, descripcion: "test 2", fechaCreacion: null, vigente: false },
    ],
    status: "succeeded",
    error: null,
  });
});

test("reducers tareas/addNewTarea/rejected", () => {
  let state;
  state = reducer(
    {
      tareas: [
        {
          id: 33,
          descripcion: "test",
          fechaCreacion: "2023-07-10T22:05:09.882+00:00",
          vigente: true,
        },
        { id: 34, descripcion: "test 2", fechaCreacion: null, vigente: false },
      ],
      status: "loading",
      error: null,
    },
    {
      type: "tareas/addNewTarea/rejected",
      meta: {
        arg: { descripcion: "tre", vigente: false },
        requestId: "UKOPYvbP8OkyESwSza2_J",
        rejectedWithValue: false,
        requestStatus: "rejected",
        aborted: false,
        condition: false,
      },
      error: {
        name: "Error",
        message: "Error guardando tarea",
      },
    }
  );
  expect(state).toEqual({
    tareas: [
      {
        id: 33,
        descripcion: "test",
        fechaCreacion: "2023-07-10T22:05:09.882+00:00",
        vigente: true,
      },
      { id: 34, descripcion: "test 2", fechaCreacion: null, vigente: false },
    ],
    status: "failed",
    error: "Error guardando tarea",
  });
});

test("reducers tareas/updateTarea/pending", () => {
  let state;
  state = reducer(
    {
      tareas: [
        {
          id: 10,
          descripcion: "Tarea 6.1",
          fechaCreacion: "2023-07-03T20:10:27.708+00:00",
          vigente: true,
        },
      ],
      status: "succeeded",
      error: null,
    },
    {
      type: "tareas/updateTarea/pending",
      meta: {
        arg: { id: 10, descripcion: "Tarea 6", vigente: true },
        requestId: "Nk5UJOceVU3G7b8mZdEMV",
        requestStatus: "pending",
      },
    }
  );
  expect(state).toEqual({
    tareas: [
      {
        id: 10,
        descripcion: "Tarea 6.1",
        fechaCreacion: "2023-07-03T20:10:27.708+00:00",
        vigente: true,
      },
    ],
    status: "loading",
    error: null,
  });
});

test("reducers tareas/updateTarea/fulfilled", () => {
  let state;
  state = reducer(
    {
      tareas: [
        {
          id: 10,
          descripcion: "Tarea 6.1",
          fechaCreacion: "2023-07-03T20:10:27.708+00:00",
          vigente: true,
        },
      ],
      status: "loading",
      error: null,
    },
    {
      type: "tareas/updateTarea/fulfilled",
      payload: {
        id: 10,
        descripcion: "Tarea 6",
        fechaCreacion: "2023-07-03T20:10:27.708+00:00",
        vigente: true,
      },
      meta: {
        arg: { id: 10, descripcion: "Tarea 6", vigente: true },
        requestId: "Nk5UJOceVU3G7b8mZdEMV",
        requestStatus: "fulfilled",
      },
    }
  );
  expect(state).toEqual({
    tareas: [
      {
        id: 10,
        descripcion: "Tarea 6",
        fechaCreacion: "2023-07-03T20:10:27.708+00:00",
        vigente: true,
      },
    ],
    status: "succeeded",
    error: null,
  });
});

test("reducers tareas/updateTarea/rejected", () => {
  let state;
  state = reducer(
    {
      tareas: [
        {
          id: 10,
          descripcion: "Tarea 6",
          fechaCreacion: "2023-07-03T20:10:27.708+00:00",
          vigente: true,
        },
      ],
      status: "loading",
      error: null,
    },
    {
      type: "tareas/updateTarea/rejected",
      meta: {
        arg: { id: 10, descripcion: "Tarea 6.", vigente: true },
        requestId: "tfJCEr9FbfsxLJONwmNfE",
        rejectedWithValue: false,
        requestStatus: "rejected",
        aborted: false,
        condition: false,
      },
      error: {
        name: "Error",
        message: "Error actualizando tarea",
      },
    }
  );
  expect(state).toEqual({
    tareas: [
      {
        id: 10,
        descripcion: "Tarea 6",
        fechaCreacion: "2023-07-03T20:10:27.708+00:00",
        vigente: true,
      },
    ],
    status: "failed",
    error: "Error actualizando tarea",
  });
});

test("reducers tareas/deleteTarea/pending", () => {
  let state;
  state = reducer(
    {
      tareas: [
        {
          id: 10,
          descripcion: "Tarea 6",
          fechaCreacion: "2023-07-03T20:10:27.708+00:00",
          vigente: true,
        },
      ],
      status: "succeeded",
      error: null,
    },
    {
      type: "tareas/deleteTarea/pending",
      meta: {
        arg: 10,
        requestId: "_D4-r2KZ6do6MeXC-Mmbe",
        requestStatus: "pending",
      },
    }
  );
  expect(state).toEqual({
    tareas: [
      {
        id: 10,
        descripcion: "Tarea 6",
        fechaCreacion: "2023-07-03T20:10:27.708+00:00",
        vigente: true,
      },
    ],
    status: "loading",
    error: null,
  });
});

test("reducers tareas/deleteTarea/fulfilled", () => {
  let state;
  state = reducer(
    {
      tareas: [
        {
          id: 10,
          descripcion: "Tarea 6",
          fechaCreacion: "2023-07-03T20:10:27.708+00:00",
          vigente: true,
        },
      ],
      status: "loading",
      error: null,
    },
    {
      type: "tareas/deleteTarea/fulfilled",
      payload: 10,
      meta: {
        arg: 10,
        requestId: "_D4-r2KZ6do6MeXC-Mmbe",
        requestStatus: "fulfilled",
      },
    }
  );
  expect(state).toEqual({ tareas: [], status: "succeeded", error: null });
});

test("reducers tareas/deleteTarea/rejected", () => {
  let state;
  state = reducer(
    {
      tareas: [
        { id: 33, descripcion: "test", fechaCreacion: null, vigente: true },
      ],
      status: "loading",
      error: null,
    },
    {
      type: "tareas/deleteTarea/rejected",
      meta: {
        arg: 33,
        requestId: "LD8lvHNoCa6tZURsehCti",
        rejectedWithValue: false,
        requestStatus: "rejected",
        aborted: false,
        condition: false,
      },
      error: {
        name: "Error",
        message: "Error eliminando tarea",
      },
    }
  );
  expect(state).toEqual({
    tareas: [
      { id: 33, descripcion: "test", fechaCreacion: null, vigente: true },
    ],
    status: "failed",
    error: "Error eliminando tarea",
  });
});
