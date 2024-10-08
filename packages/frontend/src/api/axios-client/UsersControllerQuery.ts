//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.20.0.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming
import * as Types from '../axios-client';
import { useQuery, useMutation } from 'react-query';
import type { UseQueryResult, QueryFunctionContext, UseQueryOptions, QueryClient, QueryKey, MutationKey, UseMutationOptions, UseMutationResult, QueryMeta, MutationMeta } from 'react-query';
import { trimArrayEnd, isParameterObject, getBaseUrl, addMetaToOptions } from './helpers';
import type { QueryMetaContextValue } from 'react-query-swagger';
import { QueryMetaContext } from 'react-query-swagger';
import { useContext } from 'react';
import { UsersControllerClient as UsersControllerClientClass } from '../axios-client';
import { createClient, getClientFactory } from './helpers';

export const Client = () => getClientFactory()(UsersControllerClientClass);
import type { AxiosRequestConfig } from 'axios';

export function createUrl(): string {
  let url_ = getBaseUrl() + "/users/create";
  url_ = url_.replace(/[?&]$/, "");
  return url_;
}

export function createMutationKey(): MutationKey {
  return trimArrayEnd([
      'UsersControllerClient',
      'create',
    ]);
}

export function useCreateMutation<TContext>(options?: Omit<UseMutationOptions<Types.User, unknown, Types.CreateUserDto, TContext>, 'mutationKey' | 'mutationFn'>): UseMutationResult<Types.User, unknown, Types.CreateUserDto, TContext> {
  const key = createMutationKey();
  
  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);
  
  return useMutation({
    ...options,
    mutationFn: (body: Types.CreateUserDto) => Client().create(body),
    mutationKey: key,
  });
}