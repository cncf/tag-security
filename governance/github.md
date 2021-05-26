# Github access permissions and administration

Facilitation roles are identified in [github settings](/.github/settings.yml) 
which we use for Github admin permissions and managing issues.  Write 
permissions are enabled by the [CODEOWNERS](/CODEOWNERS) file.

There is typically more process for review and collaboration than is controlled
by access permissions. We expect members to review [governance](/governance) 
and ask questions by filing a Github issue and/or submit suggested changes via
Pull Request if anything is not clear.

Chairs have admin privileges and have access to change settings in the Github
UI.  Except where noted below, changes should be made in the repo files to
control access privileges, not in the Github UI (so they are visible to
everyone.)  

Note: Members of the CNCF TOC and some CNCF staff also have admin access;
however, STAG Roles will be defined transparently using files described below,
and will follow STAG processes in making any changes. 

## Settings file  
Pull Requests to appoint members to new Roles in
[github settings](/.github/settings.yml) must be approved by at least one
Chair, along with whatever additional required process is defined in
[roles](roles.md). When a member has multiple roles, the role defined later
in the file (that does not require additional access) is noted in a comment.
PRs to remove someone from a role must be approved by the person themselves or a
majority of Chairs.

## Writing to the main branch  
The following settings are controlled in the Github UI by those with admin
access.
The "master" branch is "protected" (even for admins), with these requirements:
- can't be deleted
- no direct commits (including no "force push"), also
  - at least one reviewer must approve
  - must be approved by someone listed in [CODEOWNERS](/CODEOWNERS) file
  - must be up to date with master
  - title must not indicate work in progress ([WIP](https://github.com/apps/wip))




