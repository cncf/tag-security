# Fuzzing handbook

Handbook for assisting in fuzzing integrations.

## Building the handbook

The PDF of the handbook is build with each change to the handbook.

In order to build the PDF tou need to pull the pandoc/extra docker image [link](https://hub.docker.com/r/pandoc/extra)

```bash
docker pull pandoc/extra
```

Then, you can run from this folder (may need sudo):

```bash
./build.sh
```

which will update the handbook.
