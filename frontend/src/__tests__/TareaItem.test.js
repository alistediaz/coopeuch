import React from "react";
import renderer from "react-test-renderer";
import { TareaItem } from "../components/TareaItem";

const tarea = {
  id: 33,
  descripcion: "test",
  fechaCreacion: "2023-07-10T22:05:09.882+00:00",
  vigente: true,
};

jest.mock("react-redux", () => {
  return {
    useDispatch: jest.fn(),
    useSelector: () => {
      return tarea;
    },
  };
});

describe("<TareaItem />", () => {
  const defaultProps = { key: 33, item: tarea };
  const wrapper = renderer.create(
      <TareaItem {...defaultProps} />
  );

  test("render TareaItem", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
