# Argo CD Provenance Implementation & Consumption

_NOTE: The following document is a proof-of-concept, and has not yet been reviewed by the Argo CD maintainers. This line will be removed when that review is complete. This information was retrieved from https://argo-cd.readthedocs.io/en/stable/operator-manual/signed-release-assets/_

## Argo CD Provenance Intent

The Argo CD project has a variety of resources distributed on each release, and provenance artifacts are automatically generated for each.

Within each release, you will find a number of binary files along with a checksums and intoto attestations file that covers all of the binaries. The SBOM is generated at the same time as the release, and is also given a signature using a PEM certificate.

Separate from the following release assets, a container image is also released and signed.

### Release Assets
| Asset                    | Description                   |
|--------------------------|-------------------------------|
| argocd-darwin-amd64      | CLI Binary                    |
| argocd-darwin-arm64      | CLI Binary                    |
| argocd-linux_amd64       | CLI Binary                    |
| argocd-linux_arm64       | CLI Binary                    |
| argocd-linux_ppc64le     | CLI Binary                    |
| argocd-linux_s390x       | CLI Binary                    |
| argocd-windows_amd64     | CLI Binary                    |
| argocd-cli.intoto.jsonl  | Attestation of CLI binaries   |
| cli_checksums.txt        | Checksums of binaries         |
| sbom.tar.gz              | Sbom                          |
| sbom.tar.gz.pem          | Certificate used to sign sbom |
| argocd-sbom.intoto.jsonl | Attestation of SBOM files     |

## Prerequisite Technology

In order to streamline your validation process, we recommend installing the following tools. These can be installed locally or in an automated pipeline.

- cosign `v2.0.0` or higher [installation instructions](https://docs.sigstore.dev/cosign/installation)
- slsa-verifier [installation instructions](https://github.com/slsa-framework/slsa-verifier#installation)
- crane [installation instructions](https://github.com/google/go-containerregistry/blob/main/cmd/crane/README.md) (for container verification only)

## Validation Processes

There are separate validation processes for each of the following artifacts:

- Container Image
- SBOM
- Argo CLI Artifacts
- Argo Kubernetes deployment

### Container Image Validation

A [SLSA](https://slsa.dev/) Level 3 provenance is generated using [slsa-github-generator](https://github.com/slsa-framework/slsa-github-generator).

The following command will verify the signature of an attestation and how it was issued. It will contain the payloadType, payload, and signature.

Run the following command as per the [slsa-verifier documentation](https://github.com/slsa-framework/slsa-verifier/tree/main#containers):

```bash
# Get the immutable container image to prevent TOCTOU attacks https://github.com/slsa-framework/slsa-verifier#toctou-attacks
IMAGE=quay.io/argoproj/argocd:v2.7.0
IMAGE="${IMAGE}@"$(crane digest "${IMAGE}")
# Verify provenance, including the tag to prevent rollback attacks.
slsa-verifier verify-image "$IMAGE" \
    --source-uri github.com/argoproj/argo-cd \
    --source-tag v2.7.0
```

If you only want to verify up to the major or minor verion of the source repository tag (instead of the full tag), use the `--source-versioned-tag` which performs semantic versioning verification:

```shell
slsa-verifier verify-image "$IMAGE" \
    --source-uri github.com/argoproj/argo-cd \
    --source-versioned-tag v2 # Note: May use v2.7 for minor version verification.
```

The attestation payload contains a non-forgeable provenance which is base64 encoded and can be viewed by passing the `--print-provenance` option to the commands above:

```bash
slsa-verifier verify-image "$IMAGE" \
    --source-uri github.com/argoproj/argo-cd \
    --source-tag v2.7.0
    --print-provenance | jq
```

If you prefer using cosign, follow these [instructions](https://github.com/slsa-framework/slsa-github-generator/blob/main/internal/builders/container/README.md#cosign).

> [!NOTE]
> `cosign` or `slsa-verifier` can both be used to verify image attestations.
> Check the documentation of each binary for detailed instructions.


## Verification of CLI artifacts with SLSA attestations

A single attestation (`argocd-cli.intoto.jsonl`) from each release is provided. This can be used with [slsa-verifier](https://github.com/slsa-framework/slsa-verifier#verification-for-github-builders) to verify that a CLI binary was generated using Argo CD workflows on GitHub and ensures it was cryptographically signed.

```bash
slsa-verifier verify-artifact argocd-linux-amd64 \
  --provenance-path argocd-cli.intoto.jsonl \
  --source-uri github.com/argoproj/argo-cd \
  --source-tag v2.7.0
```

If you only want to verify up to the major or minor verion of the source repository tag (instead of the full tag), use the `--source-versioned-tag` which performs semantic versioning verification:

```shell
slsa-verifier verify-artifact argocd-linux-amd64 \
  --provenance-path argocd-cli.intoto.jsonl \
  --source-uri github.com/argoproj/argo-cd \
  --source-versioned-tag v2 # Note: May use v2.7 for minor version verification.
```

The payload is a non-forgeable provenance which is base64 encoded and can be viewed by passing the `--print-provenance` option to the commands above:

```bash
slsa-verifier verify-artifact argocd-linux-amd64 \
  --provenance-path argocd-cli.intoto.jsonl \
  --source-uri github.com/argoproj/argo-cd \
  --source-tag v2.7.0 \
  --print-provenance | jq
```

## Verification of Sbom

A single attestation (`argocd-sbom.intoto.jsonl`) from each release is provided along with the sbom (`sbom.tar.gz`). This can be used with [slsa-verifier](https://github.com/slsa-framework/slsa-verifier#verification-for-github-builders) to verify that the SBOM was generated using Argo CD workflows on GitHub and ensures it was cryptographically signed.

```bash
slsa-verifier verify-artifact sbom.tar.gz \
  --provenance-path argocd-sbom.intoto.jsonl \
  --source-uri github.com/argoproj/argo-cd \
  --source-tag v2.7.0
```

***

## Verification with Kubernetes Policy controllers

> [!NOTE]
> We encourage all users to verify signatures and provenances with your admission/policy controller of choice. Doing so will verify that an image was built by us before it's deployed on your Kubernetes cluster.

Cosign signatures and SLSA provenances are compatible with several types of admission controllers. Please see the [cosign documentation](https://docs.sigstore.dev/cosign/overview/#kubernetes-integrations) and [slsa-github-generator](https://github.com/slsa-framework/slsa-github-generator/blob/main/internal/builders/container/README.md#verification) for supported controllers.