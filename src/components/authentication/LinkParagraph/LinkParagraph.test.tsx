import LinkParagraph from "./index";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

describe("LinkParagraph", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <LinkParagraph
          linkHref="/login"
          paragraphText="paragraphText"
          linkText="linkText"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
