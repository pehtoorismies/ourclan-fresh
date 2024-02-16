# Our clan

Deno Fresh integrates to [prismic.io](https://prismic.io).

### Add following env vars

- PRISMIC_REPO - repo_name
- PRISMIC_ACCESS_TOKEN - access_token_to_prismic_repo
- PRISMIC_CUSTOM_TYPES_API_TOKEN - access_token_to_types_api
- PASSWORD - password to members area
- APP_KEY - session cookie secret

Preferably use `.envrc`

```sh
# inject env vars to workspace. Copy paste to inject env vars to .envrc
cat > .envrc <<- EOM
export PRISMIC_REPO=******
export PRISMIC_ACCESS_TOKEN=******
export PRISMIC_CUSTOM_TYPES_API_TOKEN=******
export PASSWORD=******
export APP_KEY=******
EOM
```

```sh
# generate types
> deno task generate
```

#### Development

```sh
> deno task start
```
