# `@ubiquity-os/personal-agent`

The Personal Agent is a [UbiquityOS](https://github.com/apps/ubiquity-os) plugin designed to run actions in user's Github account. It is forked, configured, and hosted by a Github user. Any issue comment beginning with `@username` is forwarded to this plugin for processing. Find below a list features offered by the plugin:

- `@username say hello`
  The plugin should respond with a `Hello, world!`.

More features coming soon...

Communication between [UbiquityOS](https://github.com/apps/ubiquity-os) and the [Personal Agent](https://github.com/ubiquity-os-marketplace/personal-agent) plugin is handled by [Personal Agent Bridge](https://github.com/ubiquity-os-marketplace/personal-agent-bridge).

## How to set up?

- Make sure the Personal Agent Bridge is also configured. You can read its [documentation](https://github.com/ubiquity-os-marketplace/personal-agent-bridge/blob/development/README.md).

- Fork this repository with exactly the same name `personal-agent` under your personal or your organization account.

- Generate a Github clasic Personal Access Token PAT with access to repositories.

- Encrypt your PAT with UbiquityOS's `X25519_PUBLIC_KEY` using [keygen.ubq.fi](https://keygen.ubq.fi/).

- Add the encrypted PAT in your fork's `.github/personal-agent.config.yml` file.

## Usage

Go to any repository issue where UbiquityOS is installed. Comment as below:

```
@username say hello
```

Replace `username` with the username where the plugin has been forked. You should get a reply from the personal-agent of the user.

## Troubleshooting

In most cases you should also receive an error message if there is a problem. If you do not get any response or want to look into the details of an error, check Personal Agent Bridge and Personal Agent fork's actions logs.

## Get started with development

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
