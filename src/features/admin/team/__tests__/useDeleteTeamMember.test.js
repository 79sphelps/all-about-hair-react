import { act } from "@testing-library/react";
import { renderHookWithProviders } from "../../../../test-utils/render";
import { useDeleteTeamMember } from "../useDeleteTeamMember";
import { teamApi } from "../../../team/api/team.api";

jest.mock("../../../team/api/team.api");

describe("useDeleteTeamMember", () => {
  it("calls deleteTeamMember mutation", async () => {
    teamApi.deleteTeamMember.mockResolvedValue({});

    const { result } = renderHookWithProviders(() =>
      useDeleteTeamMember()
    );

    await act(async () => {
      await result.current.mutateAsync("123");
    });

    expect(teamApi.deleteTeamMember).toHaveBeenCalledWith("123");
  });
});