import { waitFor } from "@testing-library/react";
import { renderHookWithProviders } from "../../../../test-utils/render";
import {
  useTeamMembers,
  useTeamMember,
} from "../useTeamMember";
import { teamApi } from "../../../team/api/team.api";

jest.mock("../../../team/api/team.api");

describe("useTeamMembers", () => {
  it("fetches all team members", async () => {
    teamApi.getTeamMembers.mockResolvedValue([]);

    const { result } = renderHookWithProviders(() =>
      useTeamMembers()
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(teamApi.getTeamMembers).toHaveBeenCalledTimes(1);
  });
});

describe("useTeamMember", () => {
  it("does not fetch when id is missing", () => {
    const { result } = renderHookWithProviders(() =>
      useTeamMember(null)
    );

    expect(result.current.fetchStatus).toBe("idle");
  });

  it("fetches a team member when id exists", async () => {
    const member = { _id: "1", name: "Jane Doe" };

    teamApi.getTeamMember.mockResolvedValue(member);

    const { result } = renderHookWithProviders(() =>
      useTeamMember("1")
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(teamApi.getTeamMember).toHaveBeenCalledWith("1");
  });
});