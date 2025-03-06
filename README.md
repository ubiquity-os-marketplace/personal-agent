# `@ubiquity-os/personal-agent`

The Personal Agent is a [UbiquityOS](https://github.com/apps/ubiquity-os) plugin designed to run actions in user's Github account. It is forked, configured, and hosted by a Github user. Any issue comment beginning with `@username` is forwarded to this plugin for processing. Find below a list features offered by the plugin:

- `@username say hello`
  The plugin should respond with a `Hello, world!`.

More features coming soon...

Communication between [UbiquityOS](https://github.com/apps/ubiquity-os) and the [Personal Agent](https://github.com/ubiquity-os-marketplace/personal-agent) plugin is handled by [Personal Agent Bridge](https://github.com/ubiquity-os-marketplace/personal-agent-bridge).

## How to set up?

- Fork this repository with exactly the same name `personal-agent` under your personal account.

- Generate a GitHub classic Personal Access Token PAT with access to repositories.

- Encrypt your PAT with UbiquityOS's `X25519_PUBLIC_KEY` using [keygen.ubq.fi](https://keygen.ubq.fi/).

- Take your encrypted PAT and convert it to this format: `PAT_TOKEN:OWNER_ID:REPOSITORY_ID` where `OWNER_ID` is your personal GitHub account ID and `REPOSITORY_ID` is the ID of your `personal-agent` repository.

- Add the encrypted PAT in your fork's `.github/personal-agent.config.yml` file in `GITHUB_PAT_ENCRYPTED` property. Make sure to use the default branch.

Example config:

```yaml
GITHUB_PAT_ENCRYPTED: xxxxxx
```

## Usage

Go to any repository issue where UbiquityOS is installed. Comment as below:

```
@username say hello
```

Replace `username` with the username where the plugin has been forked. You should get a reply from the personal-agent of the user.

## Troubleshooting

Check [Personal Agent Bridge](https://github.com/ubiquity-os-marketplace/personal-agent-bridge) and Personal Agent fork's Actions run logs.

## Get started with development

- First, configure your own Personal Agent Bridge. You can read its [documentation](https://github.com/ubiquity-os-marketplace/personal-agent-bridge/blob/development/README.md).

- Install dependencies

```
bun install
```

- Run tests

```
bun run test
```

## More information

The initial discussion about the development of this plugin can be found [here](https://github.com/ubiquity-os/plugins-wishlist/issues/3).
