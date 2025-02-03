import { postComment } from "@ubiquity-os/plugin-sdk";
import { Context } from "../types";

export async function helloWorld(context: Context) {
  const { logger, payload } = context;

  const sender = payload.comment.user?.login;
  const repo = payload.repository.name;
  const issueNumber = payload.issue.number;
  const owner = payload.repository.owner.login;
  const body = payload.comment.body;

  if (!body.trim().startsWith("@")) {
    throw logger.error(`Comment does not start with @`, { body });
  }

  logger.debug(`Executing helloWorld:`, { sender, repo, issueNumber, owner });

  await postComment(context, logger.ok("Hello, world!"));

  logger.ok(`Successfully created comment!`);
  logger.verbose(`Exiting helloWorld`);
}
