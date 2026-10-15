import React from "react";

export function BrokenComponent() {
  const undefinedUser: any = undefined;
  return undefinedUser.profile.name;
}
