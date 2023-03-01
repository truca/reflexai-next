import FormField from "./index";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

describe("FormField", () => {
  it("renders correctly the empty state", () => {
    const tree = renderer
      .create(
        <FormField
          label="Field"
          placeholder="Fill the field"
          value=""
          onChange={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly a state with value", () => {
    const tree = renderer
      .create(
        <FormField
          label="Field"
          placeholder="Fill the field"
          value="value for the field"
          onChange={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls onChange function", () => {
    const handleOnChange = jest.fn();
    render(
      <FormField
        label="Field"
        placeholder="Fill the field"
        value=""
        onChange={handleOnChange}
      />
    );
    const input = screen.getByLabelText(/Field/i);
    fireEvent.change(input, { target: { value: "23" } });
    expect(handleOnChange).toHaveBeenCalled();
  });
});
