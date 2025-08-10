# GHCR Builder Action

Reusable composite + TypeScript action that builds Docker image and pushes to GHCR.

Example usage in workflow:

```yaml
- uses: ./.github/actions/build-push
  with:
    image_name: ${{ github.repository }}
    token: ${{ secrets.GITHUB_TOKEN }}
```
