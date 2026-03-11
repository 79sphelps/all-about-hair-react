import { act } from "@testing-library/react";
import { renderHookWithProviders } from "../../../../test-utils/render";
import { useUpdateTeamMember } from "../useUpdateTeamMember";
import { teamApi } from "../../../team/api/team.api";

jest.mock("../../../team/api/team.api");

describe("useUpdateTeamMember", () => {
  it("calls updateTeamMember mutation", async () => {
    const updatedMember = {
      _id: "123",
      name: "Updated Name",
    };

    teamApi.updateTeamMember.mockResolvedValue(updatedMember);

    const { result } = renderHookWithProviders(() =>
      useUpdateTeamMember()
    );

    await act(async () => {
      await result.current.mutateAsync(updatedMember);
    });

    expect(teamApi.updateTeamMember).toHaveBeenCalledWith(
      updatedMember
    );
  });
});