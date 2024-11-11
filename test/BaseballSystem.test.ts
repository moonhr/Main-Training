import BaseballSystem from "../src/BaseballSystem";

describe("야구 시스템 메서드 테스트", () => {
  let baseballSystem: BaseballSystem;

  beforeEach(() => {
    baseballSystem = new BaseballSystem();
  });

  it("createTeam 메서드로 팀을 생성하고 UUID를 반환", () => {
    const teamData = { name: "Doosan Bears", city: "Seoul", founded: 1982 };
    const teamId = baseballSystem.createTeam(teamData);
    const team = baseballSystem.getTeam(teamId);

    expect(team).toBeDefined();
    expect(team?.name).toBe("Doosan Bears");
  });
});
