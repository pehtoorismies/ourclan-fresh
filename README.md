# Our clan

Deno Fresh integrates to prismic.io.

### Usage

Generate prismic types

```sh
# inject env vars to workspace. Copy paste to inject env vars to .envrc
cat > .envrc <<- EOM
export PRISMIC_REPO=<repo_name>
export CUSTOM_TYPES_API_TOKEN=<token>
EOM
# generate types
> deno task generate
```

Add secrets to `.env` and deno deploy:

```sh
PASSWORD=<member_area_password>
PRISMIC_REPO=<repo_name>
APP_KEY=<session_token_secret_seed>
```

#### Development

```sh
> deno task start
```
