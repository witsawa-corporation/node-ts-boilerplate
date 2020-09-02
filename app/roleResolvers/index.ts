import { RoleResolverArgs } from 'interface'
export const authentication = async ({ user }: RoleResolverArgs): Promise<boolean> => {
  return !!user
}
