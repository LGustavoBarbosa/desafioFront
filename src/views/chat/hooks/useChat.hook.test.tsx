import { renderHook, act } from "@testing-library/react-hooks";
import { useChat } from "./useChat.hook";
import { OpenAIRepository } from "domain/repositories/OpenAIRepository";
import { SuggestionsEntity } from "domain/entities/SuggestionsEntity";

jest.mock("domain/repositories/OpenAIRepository");

const mockSuggestions: SuggestionsEntity[] = [
  {
    name: "Repository 1",
    description: "Description for repository 1",
    stars: 150,
    languages: ["JavaScript", "TypeScript"],
    owner: "Owner1",
    url: "https://github.com/owner1/repo1",
    curiosity: "Curiosity about repository 1",
    youKnew: "Did you know fact about repository 1",
    integration: "Integration details for repository 1",
    llm: [
      {
        example_code: "console.log('Hello, world!');",
        pattern_usage: "Pattern usage for repository 1",
        real_world_application: "Real world application for repository 1",
        suggestion_better_this_repo: "Suggestion for repository 1",
      },
    ],
  },
  {
    name: "Repository 2",
    description: "Description for repository 2",
    stars: 250,
    languages: ["Python", "Django"],
    owner: "Owner2",
    url: "https://github.com/owner2/repo2",
    curiosity: "Curiosity about repository 2",
    youKnew: "Did you know fact about repository 2",
    integration: "Integration details for repository 2",
    llm: [
      {
        example_code: "print('Hello, world!')",
        pattern_usage: "Pattern usage for repository 2",
        real_world_application: "Real world application for repository 2",
        suggestion_better_this_repo: "Suggestion for repository 2",
      },
    ],
  },
  {
    name: "Repository 3",
    description: "Description for repository 3",
    stars: 350,
    languages: ["Java", "Spring Boot"],
    owner: "Owner3",
    url: "https://github.com/owner3/repo3",
    curiosity: "Curiosity about repository 3",
    youKnew: "Did you know fact about repository 3",
    integration: "Integration details for repository 3",
    llm: [
      {
        example_code: "System.out.println('Hello, world!');",
        pattern_usage: "Pattern usage for repository 3",
        real_world_application: "Real world application for repository 3",
        suggestion_better_this_repo: "Suggestion for repository 3",
      },
    ],
  },
];

describe("useChat hook", () => {
  let openAIRepoMock: jest.Mocked<OpenAIRepository>;

  beforeEach(() => {
    openAIRepoMock = new OpenAIRepository() as jest.Mocked<OpenAIRepository>;
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useChat());
    expect(Array.isArray(result.current.messages)).toBe(true);
    expect(result.current.input).toBe("");
    expect(result.current.loading).toBe(true);
    expect(result.current.loadingText).toBe("Carregando");
  });

  it("should handle input change", () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInput("Hello");
    });

    expect(result.current.input).toBe("Hello");
  });

  it("should handle sending a message", async () => {
    openAIRepoMock.getSuggestion.mockResolvedValueOnce(mockSuggestions);

    const { result, waitForNextUpdate } = renderHook(() => useChat());

    act(() => {
      result.current.setInput("Hello");
    });

    await act(async () => {
      await result.current.handleSendMessage();
    });

    await waitForNextUpdate();

    expect(result.current.messages.length).toBe(4);
    expect(result.current.messages[0].content).toBe(
      "Aqui estão algumas tendências de tecnologias front-end mais populares no GitHub no último semestre."
    );
    expect(Array.isArray(result.current.messages)).toBe(true);
  });

  it("should handle help input", () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.handleHelp();
    });

    expect(result.current.input).toBe(
      "Explore as tendências atuais em gerenciamento de estado funcional no React."
    );
  });

  it("should boot with initial message and suggestions", async () => {
    openAIRepoMock.getSuggestion.mockResolvedValueOnce(mockSuggestions);

    const { result, waitForNextUpdate } = renderHook(() => useChat());

    await waitForNextUpdate();

    expect(result.current.messages.length).toBe(2);
  });
});
