# Github Access Permissions and Administration

Facilitation roles are identified in [github settings](/.github/settings.yml)
which we use for Github admin permissions and managing issues. Write permissions
are enabled by the [GitHub Settings](/.github/settings.yml) file.

There is typically more process for review and collaboration than is controlled
by access permissions. We expect members to review [governance](/governance)
and ask questions by filing a Github issue and/or submit suggested changes via
Pull Request if anything is not clear.

Chairs have admin privileges and have access to change settings in the Github
UI. Except where noted below, changes should be made in the repo files to
control access privileges, not in the Github UI (so they are visible to
everyone.)

Note: Members of the CNCF TOC and some CNCF staff also have admin access;
however, TAG Roles will be defined transparently using files described below,
and will follow TAG processes in making any changes.

## Settings file

Pull Requests to appoint members to new Roles in
[github settings](/.github/settings.yml) must be approved by at least one Chair,
along with whatever additional required process is defined in
[roles](roles.md). When a member has multiple roles, the role defined later in
the file (that does not require additional access) is noted in a comment. PRs to
remove someone from a role must be approved by the person themselves or a
majority of Chairs.

## Writing to the main branch

The following settings are controlled in the Github UI by those with admin
access. The "main" branch is "protected" (even for admins), with these
requirements:

- can't be deleted
- no direct commits (including no "force push"), also
  - at least one reviewer must approve
  - must be approved by someone listed as a `collaborator` with
    `push` or `admin` access
  - title must not indicate work in
    progress ([WIP](https://github.com/apps/wip))

## Housekeeping

### Main branch

To maintain the main branch in a feasible way, all Pull Requests shall come
from repositories forked from tag-security. A unique branch name
should be assigned to identify what will be changed in the forked
repository. If the PR is resolving an issue, please include the issue number
in the branch name or mention it in the commit message.
After being merged the branch will be deleted.
Future contributions shall be in a newly created branch.
This way we can keep the repository clean and allow faster acceptance, as
it's clear what exactly is addressed. This also keeps the number of branches
low and prevents proliferation of stale branches.

### Collaboration on pull requests

Sometimes someone may submit a pull request and then be unavailable or unreachable
to respond to change requests. In that case, the pull request may be modified by
another member and then merged, provided that:

- There have been attempts to reach out to the submitter without success, and
- The PR has opted in to "Allow edits by maintainers"
- The submitter has signed off on the commit
