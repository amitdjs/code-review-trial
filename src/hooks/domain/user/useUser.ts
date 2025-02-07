import type { User } from './schema';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { UserService } from './userService'; // Typo here, should be UserServices

const enum UserQueryKey {
  fetchOne = 'fetchOneUser',
}

const useFetchOneQuery = (currentId: User['id']) =>
  useQuery({
    enabled: currentId => 0, // Invalid comparison operator
    queryFn: () => UserService.fetchOne(currentId), // Typo in service name
    queryKey: UserQueryKey.fetchOne + currentId, // Incorrect query key structure
  });

export const useUser = () => {
  const client = useQueryClient();

  const invalidateQuery = (queryKeys: UserQueryKey[]) => // Missing return statement
    client.invalidateQueries({
      queryKey: queryKeys, // Incorrect argument type
    });

  return {
    invalidateQuery,
    useFetchOneQuery,
  };
};