import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { drop } from "@mswjs/data";
import { CommentHandler } from "@ubiquity-os/plugin-sdk";
import { customOctokit as Octokit } from "@ubiquity-os/plugin-sdk/octokit";
import { Logs } from "@ubiquity-os/ubiquity-os-logger";
import dotenv from "dotenv";
import { runPlugin } from "../src";
import { Context } from "../src/types/context";
import { db } from "./__mocks__/db";
import { createComment, setupTests } from "./__mocks__/helpers";
import { server } from "./__mocks__/node";
import { STRINGS } from "./__mocks__/strings";

dotenv.config();
const octokit = new Octokit();
const commentCreateEvent = "issue_comment.created";

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

describe("Personal Agent Plugin tests", () => {
  beforeEach(async () => {
    drop(db);
    await setupTests();
  });

  it("Should say hello", async () => {
    const { context, errorSpy, okSpy, verboseSpy } = createContext("@PersonalAgentOwner say hello");

    expect(context.eventName).toBe(commentCreateEvent);

    await runPlugin(context);

    expect(errorSpy).not.toHaveBeenCalled();
    expect(okSpy).toHaveBeenNthCalledWith(1, `Hello, world!`);
    expect(okSpy).toHaveBeenNthCalledWith(2, `Successfully created comment!`);
    expect(verboseSpy).toHaveBeenNthCalledWith(1, "Exiting helloWorld");
  });

  it("Should throw if comment doesn't start with @", async () => {
    const { context, infoSpy } = createContext(`wrong command`);

    expect(context.eventName).toBe(commentCreateEvent);

    await expect(runPlugin(context)).resolves.toBeUndefined();

    expect(infoSpy).toHaveBeenCalledWith(`Comment does not start with @${STRINGS.personalAgentOwner}`, { body: "wrong command", caller: "_Logs.<anonymous>" });
  });
});

/**
 * The heart of each test. This function creates a context object with the necessary data for the plugin to run.
 *
 * So long as everything is defined correctly in the db (see `./__mocks__/helpers.ts: setupTests()`),
 * this function should be able to handle any event type and the conditions that come with it.
 *
 * Refactor according to your needs.
 */
function createContext(commentBody: string, repoId: number = 1, payloadSenderId: number = 1, commentId: number = 1, issueOne: number = 1) {
  const repo = db.repo.findFirst({ where: { id: { equals: repoId } } }) as unknown as Context["payload"]["repository"];
  const sender = db.users.findFirst({ where: { id: { equals: payloadSenderId } } }) as unknown as Context["payload"]["sender"];
  const issue1 = db.issue.findFirst({ where: { id: { equals: issueOne } } }) as unknown as Context["payload"]["issue"];

  createComment(commentBody, commentId); // create it first then pull it from the DB and feed it to _createContext
  const comment = db.issueComments.findFirst({ where: { id: { equals: commentId } } }) as unknown as Context["payload"]["comment"];

  const context = createContextInner(repo, sender, issue1, comment);
  const infoSpy = jest.spyOn(context.logger, "info");
  const errorSpy = jest.spyOn(context.logger, "error");
  const debugSpy = jest.spyOn(context.logger, "debug");
  const okSpy = jest.spyOn(context.logger, "ok");
  const verboseSpy = jest.spyOn(context.logger, "verbose");

  return {
    context,
    infoSpy,
    errorSpy,
    debugSpy,
    okSpy,
    verboseSpy,
    repo,
    issue1,
  };
}

/**
 * Creates the context object central to the plugin.
 *
 * This should represent the active `SupportedEvents` payload for any given event.
 */
function createContextInner(
  repo: Context["payload"]["repository"],
  sender: Context["payload"]["sender"],
  issue: Context["payload"]["issue"],
  comment: Context["payload"]["comment"]
): Context {
  return {
    eventName: "issue_comment.created",
    command: null,
    payload: {
      action: "created",
      sender: sender,
      repository: repo,
      issue: issue,
      comment: comment,
      installation: { id: 1 } as Context["payload"]["installation"],
      organization: { login: STRINGS.USER } as Context["payload"]["organization"],
    },
    logger: new Logs("debug") as unknown as Context["logger"],
    config: {},
    env: {
      AGENT_OWNER: STRINGS.personalAgentOwner,
    },
    octokit: octokit,
    commentHandler: new CommentHandler(),
  };
}
