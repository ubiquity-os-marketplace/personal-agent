import { Context } from "../types";

export async function helloWorld(context: Context) {
  const { logger, payload } = context;

  const sender = payload.comment.user?.login;
  const repo = payload.repository.name;
  const issueNumber = payload.issue.number;
  const owner = payload.repository.owner.login;
  const body = payload.comment.body;
  const agentOwner = context.env.AGENT_OWNER;

  logger.info(`Executing helloWorld:`, { sender, repo, issueNumber, owner, agentOwner });

  if (!body.trim().startsWith(`@${agentOwner}`)) {
    throw logger.error(`Comment does not start with @`, { body });
  }

  await context.commentHandler.postComment(context, logger.ok("Hello, world!"));

  logger.ok(`Successfully created comment!`);
  logger.verbose(`Exiting helloWorld`);
}
