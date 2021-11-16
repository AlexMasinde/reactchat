import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("Button component", () => {
  it("button renders", () => {
    const handleClick = jest.fn();
    render(
      <Button
        loading={false}
        text="Test Button"
        type="submit"
        onClick={handleClick}
      />
    );
    expect(
      screen.getByRole("button", { name: /test button/i })
    ).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /test button/i });
    userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("loading state updates button style and disabled status", () => {
    const handleClick = jest.fn();
    render(
      <Button
        loading={true}
        text="test button"
        type="submit"
        onClick={handleClick}
      />
    );
    expect(screen.getByRole("button", { name: /test button/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /test button/i })).toHaveClass(
      "loading"
    );
  });
});
