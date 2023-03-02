import SubmitButton from "./index";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

describe("SubmitButton", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<SubmitButton buttonText="buttonText" onSubmit={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls onSubmit function", () => {
    const handleOnSubmit = jest.fn();
    render(<SubmitButton buttonText="buttonText" onSubmit={handleOnSubmit} />);
    fireEvent.click(screen.getByText(/buttonText/i));
    expect(handleOnSubmit).toHaveBeenCalled();
  });
});
