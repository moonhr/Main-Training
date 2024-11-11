/**
 * Baseball Data Management System
 * UUID 기반의 야구 데이터 관리 시스템
 *
 * 이 시스템은 다음과 같은 주요 기능을 제공합니다:
 * 1. UUID 기반의 고유 식별자 생성
 * 2. 팀, 선수, 게임, 경기 기록의 CRUD 작업
 * 3. 데이터 간의 관계 조회
 * 4. 선수 통계 계산
 */

// 기본 인터페이스 정의
interface BaseballPlayer {
  uuid: string; // 선수 고유 식별자
  name: string; // 선수 이름
  number: number; // 등번호
  position: string; // 포지션
  teamId: string; // 소속 팀 UUID
}

interface Team {
  uuid: string; // 팀 고유 식별자
  name: string; // 팀 이름
  city: string; // 연고지
  founded: number; // 창단년도
}

interface GameRecord {
  uuid: string; // 기록 고유 식별자
  playerId: string; // 선수 UUID
  gameId: string; // 게임 UUID
  hits: number; // 안타 수
  runs: number; // 득점
  errors: number; // 실책
}

interface Game {
  uuid: string; // 게임 고유 식별자
  date: Date; // 경기 날짜
  homeTeamId: string; // 홈팀 UUID
  awayTeamId: string; // 원정팀 UUID
  stadium: string; // 경기장
}

/**
 * 야구 데이터 관리 시스템 클래스
 * Map 자료구조를 사용하여 UUID를 키로 하는 데이터 저장소를 구현합니다.
 */
class BaseballSystem {
  // UUID를 키로 사용하는 Map 자료구조로 데이터 저장
  private players: Map<string, BaseballPlayer>;
  private teams: Map<string, Team>;
  private games: Map<string, Game>;
  private gameRecords: Map<string, GameRecord>;

  constructor() {
    // 각 데이터 타입별 저장소 초기화
    this.players = new Map();
    this.teams = new Map();
    this.games = new Map();
    this.gameRecords = new Map();
  }

  /**
   * UUID 생성 메서드
   * UUID v4 표준을 준수하는 고유 식별자를 생성합니다.
   *
   * 구현 방식:
   * 1. 8자리 랜덤 hex + '-'
   * 2. 4자리 랜덤 hex + '-'
   * 3. '4'로 시작하는 4자리 hex (버전 4 표시) + '-'
   * 4. '8','9','a','b' 중 하나로 시작하는 4자리 hex + '-'
   * 5. 12자리 랜덤 hex
   *
   * @returns {string} 생성된 UUID
   */
  private generateUUID(): string {
    const hex = "0123456789abcdef";
    let uuid = "";

    // 첫 번째 그룹: 8자리 랜덤 값
    for (let i = 0; i < 8; i++) {
      uuid += hex[Math.floor(Math.random() * 16)];
    }
    uuid += "-";

    // 두 번째 그룹: 4자리 랜덤 값
    for (let i = 0; i < 4; i++) {
      uuid += hex[Math.floor(Math.random() * 16)];
    }
    uuid += "-";

    // 세 번째 그룹: 버전 4를 나타내는 4자리
    uuid += "4"; // UUID 버전 4 표시
    for (let i = 0; i < 3; i++) {
      uuid += hex[Math.floor(Math.random() * 16)];
    }
    uuid += "-";

    // 네 번째 그룹: 특수 비트 포함
    uuid += hex[8 + Math.floor(Math.random() * 4)]; // 8,9,a,b 중 하나
    for (let i = 0; i < 3; i++) {
      uuid += hex[Math.floor(Math.random() * 16)];
    }
    uuid += "-";

    // 다섯 번째 그룹: 12자리 랜덤 값
    for (let i = 0; i < 12; i++) {
      uuid += hex[Math.floor(Math.random() * 16)];
    }

    return uuid;
  }

  /**
   * 팀 생성 메서드
   * 새로운 팀을 생성하고 UUID를 할당합니다.
   *
   * @param teamData - UUID를 제외한 팀 정보
   * @returns {string} 생성된 팀의 UUID
   */
  createTeam(teamData: Omit<Team, "uuid">): string {
    const uuid = this.generateUUID();
    const team: Team = { ...teamData, uuid };
    this.teams.set(uuid, team);
    return uuid;
  }

  /**
   * 선수 생성 메서드
   * 새로운 선수를 생성하고 UUID를 할당합니다.
   * teamId를 통해 소속 팀과의 관계를 설정합니다.
   *
   * @param playerData - UUID를 제외한 선수 정보
   * @returns {string} 생성된 선수의 UUID
   */
  createPlayer(playerData: Omit<BaseballPlayer, "uuid">): string {
    const uuid = this.generateUUID();
    const player: BaseballPlayer = { ...playerData, uuid };
    this.players.set(uuid, player);
    return uuid;
  }

  /**
   * 게임 생성 메서드
   * 새로운 게임을 생성하고 UUID를 할당합니다.
   * homeTeamId와 awayTeamId를 통해 참가 팀과의 관계를 설정합니다.
   *
   * @param gameData - UUID를 제외한 게임 정보
   * @returns {string} 생성된 게임의 UUID
   */
  createGame(gameData: Omit<Game, "uuid">): string {
    const uuid = this.generateUUID();
    const game: Game = { ...gameData, uuid };
    this.games.set(uuid, game);
    return uuid;
  }

  /**
   * 경기 기록 생성 메서드
   * 새로운 경기 기록을 생성하고 UUID를 할당합니다.
   * playerId와 gameId를 통해 선수 및 게임과의 관계를 설정합니다.
   *
   * @param recordData - UUID를 제외한 경기 기록 정보
   * @returns {string} 생성된 기록의 UUID
   */
  createGameRecord(recordData: Omit<GameRecord, "uuid">): string {
    const uuid = this.generateUUID();
    const record: GameRecord = { ...recordData, uuid };
    this.gameRecords.set(uuid, record);
    return uuid;
  }

  /**
   * 데이터 조회 메서드들
   * Map에서 UUID를 키로 사용하여 데이터를 조회합니다.
   */
  getTeam(uuid: string): Team | undefined {
    return this.teams.get(uuid);
  }

  getPlayer(uuid: string): BaseballPlayer | undefined {
    return this.players.get(uuid);
  }

  getGame(uuid: string): Game | undefined {
    return this.games.get(uuid);
  }

  getGameRecord(uuid: string): GameRecord | undefined {
    return this.gameRecords.get(uuid);
  }

  /**
   * 팀 소속 선수 조회 메서드
   * 특정 팀에 소속된 모든 선수를 조회합니다.
   *
   * @param teamId - 팀 UUID
   * @returns {BaseballPlayer[]} 해당 팀 소속 선수 배열
   */
  getTeamPlayers(teamId: string): BaseballPlayer[] {
    // players Map의 모든 값을 배열로 변환하고 teamId가 일치하는 선수만 필터링
    return Array.from(this.players.values()).filter(
      (player) => player.teamId === teamId
    );
  }

  /**
   * 선수 경기 기록 조회 메서드
   * 특정 선수의 모든 경기 기록을 조회합니다.
   *
   * @param playerId - 선수 UUID
   * @returns {GameRecord[]} 해당 선수의 경기 기록 배열
   */
  getPlayerGameRecords(playerId: string): GameRecord[] {
    // gameRecords Map의 모든 값을 배열로 변환하고 playerId가 일치하는 기록만 필터링
    return Array.from(this.gameRecords.values()).filter(
      (record) => record.playerId === playerId
    );
  }

  /**
   * 팀 경기 조회 메서드
   * 특정 팀이 참가한 모든 경기를 조회합니다.
   * 홈팀 또는 원정팀으로 참가한 경우 모두 포함됩니다.
   *
   * @param teamId - 팀 UUID
   * @returns {Game[]} 해당 팀이 참가한 경기 배열
   */
  getTeamGames(teamId: string): Game[] {
    return Array.from(this.games.values()).filter(
      (game) => game.homeTeamId === teamId || game.awayTeamId === teamId
    );
  }

  /**
   * 선수 통계 계산 메서드
   * 특정 선수의 모든 경기 기록을 분석하여 통계를 계산합니다.
   *
   * 계산되는 통계:
   * - 총 경기 수
   * - 총 안타 수
   * - 총 득점
   * - 총 실책
   * - 타율 (안타수/경기수)
   *
   * @param playerId - 선수 UUID
   * @returns {Object | null} 계산된 통계 객체 또는 선수가 없는 경우 null
   */
  calculatePlayerStats(playerId: string) {
    const records = this.getPlayerGameRecords(playerId);
    const player = this.getPlayer(playerId);

    if (!player) return null;

    const stats = {
      totalGames: records.length,
      totalHits: records.reduce((sum, record) => sum + record.hits, 0),
      totalRuns: records.reduce((sum, record) => sum + record.runs, 0),
      totalErrors: records.reduce((sum, record) => sum + record.errors, 0),
      battingAverage: 0,
    };

    // 타율 계산 (소수점 3자리까지)
    stats.battingAverage =
      stats.totalGames > 0
        ? Number((stats.totalHits / stats.totalGames).toFixed(3))
        : 0;

    return stats;
  }
}

// 사용 예시
const baseball = new BaseballSystem();

// 예시 데이터 생성 및 사용
const doosanId = baseball.createTeam({
  name: "Doosan Bears",
  city: "Seoul",
  founded: 1982,
});

const kimId = baseball.createPlayer({
  name: "Kim Hyun-soo",
  number: 50,
  position: "Outfielder",
  teamId: doosanId,
});

export default BaseballSystem;

// 데이터 조회 및 통계 확인
console.log("선수 정보:", baseball.getPlayer(kimId));
console.log("선수 통계:", baseball.calculatePlayerStats(kimId));
