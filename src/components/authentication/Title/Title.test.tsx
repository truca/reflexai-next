import Title from "./index";
import renderer from "react-test-renderer";

describe("Title", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Title title="title" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
