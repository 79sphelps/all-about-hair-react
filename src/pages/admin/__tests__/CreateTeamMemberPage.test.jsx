import { render, screen, fireEvent } from "@testing-library/react";
import CreateTeamMemberPage from "../CreateTeamMemberPage";
import useAdminForm from "../../../features/admin/hooks/useAdminForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../features/admin/team/hooks", () => ({
  useCreateTeamMember: jest.fn(),
}));

jest.mock("../../../features/admin/hooks/useAdminForm");

jest.mock("../../../features/admin/components/AdminFormBuilder", () => () => (
  <div data-testid="form-builder" />
));

const { useNavigate } = require("react-router-dom");
const { useCreateTeamMember } = require("../../../features/admin/team/hooks");
// const useAdminForm = require("../../../features/admin/hooks/useAdminForm");

describe("CreateTeamMemberPage", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);

    useCreateTeamMember.mockReturnValue({
      mutate: jest.fn((_, { onSuccess }) => onSuccess()),
    });

    useAdminForm.mockReturnValue({
      values: {},
      resetForm: jest.fn(),
      validateBeforeSubmit: jest.fn(() => true),
    });
  });

  it("submits and shows success state", () => {
    render(<CreateTeamMemberPage />);
    fireEvent.click(screen.getByText("Create Team Member"));

    expect(screen.getByText("Team Member Created")).toBeInTheDocument();
  });

  it("navigates on cancel", () => {
    render(<CreateTeamMemberPage />);
    fireEvent.click(screen.getByText("Cancel"));

    expect(mockNavigate).toHaveBeenCalledWith("/admin/team-details");
  });
});
