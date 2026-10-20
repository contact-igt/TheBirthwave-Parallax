#!/bin/bash
# Vercel "Ignored Build Step". Exit 0 = SKIP this build, exit 1 = build it.
#
# Keeps the two deployments of this repository apart:
#   - the public website project must never build the `registration-form` branch
#   - the check-in project (checkin.thebirthwave.in) must build only that branch
#
# A project counts as the check-in project when CLINIC_APP=checkin is set, or when
# its production domain (a Vercel system variable) is the check-in domain.

CHECKIN_BRANCH="registration-form"
CHECKIN_DOMAIN="checkin.thebirthwave.in"

is_checkin_project=false
if [ "$CLINIC_APP" = "checkin" ] || [ "$VERCEL_PROJECT_PRODUCTION_URL" = "$CHECKIN_DOMAIN" ]; then
  is_checkin_project=true
fi

if [ "$VERCEL_GIT_COMMIT_REF" = "$CHECKIN_BRANCH" ] && [ "$is_checkin_project" = false ]; then
  echo "Skipping: branch $CHECKIN_BRANCH builds only in the check-in project."
  exit 0
fi

if [ "$is_checkin_project" = true ] && [ "$VERCEL_GIT_COMMIT_REF" != "$CHECKIN_BRANCH" ]; then
  echo "Skipping: the check-in project builds only the $CHECKIN_BRANCH branch."
  exit 0
fi

echo "Building."
exit 1
