import { renderHook, act } from "@testing-library/react-hooks";
import { useChat } from "./useChat.hook";
import { GitHubRepository } from "domain/repositories/GitHubRepository";
import { RepositoryEntity } from "domain/entities/RepositoryEntity";
import { MessageEntity } from "domain/entities/MessageEntity";
import { v4 as uuid } from "uuid";

// Mock the GitHubRepository
jest.mock("domain/repositories/GitHubRepository");

describe("useChat hook", () => {
  let gitHubRepoMock: jest.Mocked<GitHubRepository>;

  beforeEach(() => {
    gitHubRepoMock = new GitHubRepository() as jest.Mocked<GitHubRepository>;
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toEqual([]);
    expect(result.current.input).toBe("");
    expect(result.current.loading).toBe(true);
    expect(result.current.loadingText).toBe("Carregando");
  });

  it("should handle input change", () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInput("test input");
    });

    expect(result.current.input).toBe("test input");
  });

  it("should handle sending a message", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useChat());

    gitHubRepoMock.getUserRepos.mockResolvedValueOnce([
      new RepositoryEntity({
        id: 1,
        name: "repo1",
        full_name: "user/repo1",
        description: "A sample repository",
        html_url: "https://github.com/user/repo1",
        stargazers_count: 100,
        forks_count: 10,
        language: "TypeScript",
      }),
    ]);

    act(() => {
      result.current.setInput("testUser");
    });

    await act(async () => {
      result.current.handleSendMessage();
      await waitForNextUpdate();
    });

    expect(result.current.messages.length).toBeGreaterThan(1);
    expect(result.current.messages[0].role).toBe("user");
    expect(result.current.messages[0].content).toBe("testUser");
  });

  it("should handle help command", () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.handleHelp();
    });

    expect(result.current.input).toBe("LGustavoBarbosa");
  });

  it("should handle bootGh", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useChat());

    await waitForNextUpdate();

    expect(result.current.messages.length).toBe(1);
    expect(result.current.messages[0].role).toBe("system");
    expect(result.current.messages[0].content).toContain(
      "Eu sou o seu assistente buscador de repositórios no GitHub!"
    );
  });

  it("should handle loading text", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useChat());

    act(() => {
      result.current.setInput("testUser");
    });

    await act(async () => {
      result.current.handleSendMessage();
      await waitForNextUpdate();
    });

    expect(result.current.loadingText).toBe("");
  });

  it("should handle showing bounce messages", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useChat());

    const messages = [
      new MessageEntity({
        id: uuid(),
        role: "assistant",
        content: "Test message",
      }),
    ];

    act(() => {
      result.current.setInput("testUser");
    });

    await act(async () => {
      result.current.handleSendMessage();
      await waitForNextUpdate();
    });

    act(() => {
      result.current.showBounceMessages(messages);
    });

    expect(result.current.messages.length).toBeGreaterThan(1);
    expect(
      result.current.messages[result.current.messages.length - 1].content
    ).toBe("Test message");
  });
});
