import { act } from "@testing-library/react";
import { renderHookWithProviders } from "../../../../test-utils/render";
import { useCreateTeamMember } from "../useCreateTeamMember";
import { teamApi } from "../../../team/api/team.api";

jest.mock("../../../team/api/team.api");

describe("useCreateTeamMember", () => {
  it("calls createTeamMember mutation", async () => {
    const payload = {
      name: "Jane Doe",
      role: "Senior Stylist",
    };

    teamApi.createTeamMember.mockResolvedValue({});

    const { result } = renderHookWithProviders(() =>
      useCreateTeamMember()
    );

    await act(async () => {
      await result.current.mutateAsync(payload);
    });

    expect(teamApi.createTeamMember).toHaveBeenCalledWith(payload);
  });
});