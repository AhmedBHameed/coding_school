import {ForbiddenError} from 'apollo-server-core';

export type UserPermission = {
  name: string;
  permissions: string[];
};

const isAuthorizedUser = (
  tokenPermission: UserPermission[],
  requiredAction: {modelName: string; permission: string},
  userId?: string,
  ownedById?: string
) => {
  const permissions = tokenPermission.find(
    (actions) => actions.name === requiredAction.modelName
  )?.permissions;
  const requiredPermission = permissions?.find((permission) =>
    permission.includes(requiredAction.permission)
  );

  const isOwn = requiredPermission?.split(':')[1] === 'own';

  if (isOwn) {
    //  You can read only your own data.
    if (userId !== ownedById) throw new ForbiddenError(`Permission denied!`);

    return true;
  }

  if (requiredPermission !== `${requiredAction.permission}:any`)
    throw new ForbiddenError(`Permission denied!`);

  return true;
};

export default isAuthorizedUser;
