import { render, screen, fireEvent } from "@testing-library/react";
import TeamMemberEditPage from "../TeamMemberEditPage";
import useAdminForm from "../../../features/admin/hooks/useAdminForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock("../../../features/admin/team/hooks", () => ({
  useTeamMember: jest.fn(),
  useUpdateTeamMember: jest.fn(),
}));

jest.mock("../../../features/admin/hooks/useAdminForm");

jest.mock("../../../features/admin/components/AdminFormBuilder", () => () => (
  <div data-testid="form-builder" />
));

const { useNavigate, useLocation } = require("react-router-dom");
const {
  useTeamMember,
  useUpdateTeamMember,
} = require("../../../features/admin/team/hooks");

// const useAdminForm = require("../../../features/admin/hooks/useAdminForm");

describe("TeamMemberEditPage", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ state: { id: "1" } });

    useTeamMember.mockReturnValue({
      isLoading: false,
      data: { name: "John", role: "Stylist" },
    });

    useUpdateTeamMember.mockReturnValue({
      mutate: (_, { onSuccess }) => onSuccess(),
    });

    useAdminForm.mockReturnValue({
      values: {},
      setValues: jest.fn(),
      validateBeforeSubmit: jest.fn(() => true),
    });
  });

  it("submits and navigates on success", () => {
    render(<TeamMemberEditPage />);
    fireEvent.click(screen.getByText("Update"));

    expect(mockNavigate).toHaveBeenCalledWith("/admin/team-details");
  });

  it("navigates on cancel", () => {
    render(<TeamMemberEditPage />);
    fireEvent.click(screen.getByText("Cancel"));

    expect(mockNavigate).toHaveBeenCalledWith("/admin/team-details");
  });
});
