/** This file was generated by Nexus Schema Do not make changes to this file directly */

import { core, connectionPluginCore } from '../../../src'
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /** No-Op scalar for testing purposes only */
    myCustomScalar<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void // "MyCustomScalar";
    title(...args: any): void
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /** No-Op scalar for testing purposes only */
    myCustomScalar<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void // "MyCustomScalar";
    /** Title of the page, optionally escaped */
    title(options: { escape: boolean }): void
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName> & {
        totalCount: connectionPluginCore.ConnectionFieldResolver<TypeName, FieldName, 'totalCount'>
        edgeFields: { delta: connectionPluginCore.EdgeFieldResolver<TypeName, FieldName, 'delta'> }
      }
    ): void
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    /** Adds a body (weirdly, as a getter) */
    body: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PostSearchInput: {
    // input type
    body?: string | null // String
    title?: string | null // String
  }
  Something: {
    // input type
    id: number // Int!
  }
}

export interface NexusGenEnums {
  UserStatus: 'active' | 'pending'
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  MyCustomScalar: any
}

export interface NexusGenObjects {
  Mutation: {}
  OfI: {
    // root type
    hello?: string | null // String
  }
  OfI2: {
    // root type
    hello?: string | null // String
  }
  PageInfo: {
    // root type
    endCursor?: string | null // String
    hasNextPage: boolean // Boolean!
    hasPreviousPage: boolean // Boolean!
    startCursor?: string | null // String
  }
  Post: {
    // root type
    body?: string | null // String
    title?: string | null // String
  }
  PostConnection: {
    // root type
    edges?: Array<NexusGenRootTypes['PostEdge'] | null> | null // [PostEdge]
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
  }
  PostEdge: {
    // root type
    cursor: string // String!
    node?: NexusGenRootTypes['Post'] | null // Post
  }
  Query: {}
  Subscription: {}
  User: { firstName: string; lastName: string }
}

export interface NexusGenInterfaces {
  I: NexusGenRootTypes['OfI'] | NexusGenRootTypes['OfI2']
}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Mutation: {
    // field return type
    createUser: NexusGenRootTypes['User'] | null // User
  }
  OfI: {
    // field return type
    hello: string | null // String
  }
  OfI2: {
    // field return type
    hello: string | null // String
  }
  PageInfo: {
    // field return type
    endCursor: string | null // String
    hasNextPage: boolean // Boolean!
    hasPreviousPage: boolean // Boolean!
    startCursor: string | null // String
  }
  Post: {
    // field return type
    body: string | null // String
    title: string | null // String
  }
  PostConnection: {
    // field return type
    edges: Array<NexusGenRootTypes['PostEdge'] | null> | null // [PostEdge]
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
    totalCount: number // Int!
  }
  PostEdge: {
    // field return type
    cursor: string // String!
    delta: string | null // String
    node: NexusGenRootTypes['Post'] | null // Post
  }
  Query: {
    // field return type
    customScalar: NexusGenScalars['MyCustomScalar'] | null // MyCustomScalar
    foo: string | null // String
    searchPosts: Array<NexusGenRootTypes['Post'] | null> | null // [Post]
    user: NexusGenRootTypes['User'] | null // User
  }
  Subscription: {
    // field return type
    someBoolean: boolean | null // Boolean
    someBooleanFromExtendType: boolean | null // Boolean
    someBooleanFromSubscriptionField: boolean | null // Boolean
    someField: number | null // Int
    someFields: Array<number | null> | null // [Int]
    someFloat: number | null // Float
    someID: string | null // ID
    someInt: number | null // Int
    someInts: Array<number | null> | null // [Int]
    someString: string | null // String
  }
  User: {
    // field return type
    firstName: string | null // String
    lastName: string | null // String
    posts: NexusGenRootTypes['PostConnection'] | null // PostConnection
  }
  I: {
    // field return type
    hello: string | null // String
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: {
    // field return type name
    createUser: 'User'
  }
  OfI: {
    // field return type name
    hello: 'String'
  }
  OfI2: {
    // field return type name
    hello: 'String'
  }
  PageInfo: {
    // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Post: {
    // field return type name
    body: 'String'
    title: 'String'
  }
  PostConnection: {
    // field return type name
    edges: 'PostEdge'
    pageInfo: 'PageInfo'
    totalCount: 'Int'
  }
  PostEdge: {
    // field return type name
    cursor: 'String'
    delta: 'String'
    node: 'Post'
  }
  Query: {
    // field return type name
    customScalar: 'MyCustomScalar'
    foo: 'String'
    searchPosts: 'Post'
    user: 'User'
  }
  Subscription: {
    // field return type name
    someBoolean: 'Boolean'
    someBooleanFromExtendType: 'Boolean'
    someBooleanFromSubscriptionField: 'Boolean'
    someField: 'Int'
    someFields: 'Int'
    someFloat: 'Float'
    someID: 'ID'
    someInt: 'Int'
    someInts: 'Int'
    someString: 'String'
  }
  User: {
    // field return type name
    firstName: 'String'
    lastName: 'String'
    posts: 'PostConnection'
  }
  I: {
    // field return type name
    hello: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: {
      // args
      firstName?: string | null // String
      lastName?: string | null // String
    }
  }
  PostEdge: {
    delta: {
      // args
      format?: string | null // String
    }
  }
  Query: {
    searchPosts: {
      // args
      input?: NexusGenInputs['PostSearchInput'] | null // PostSearchInput
    }
    user: {
      // args
      id?: string | null // ID
      status: NexusGenEnums['UserStatus'] | null // UserStatus
    }
  }
  User: {
    posts: {
      // args
      after?: string | null // String
      before?: string | null // String
      first?: number | null // Int
      last?: number | null // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  I: 'OfI' | 'OfI2'
}

export interface NexusGenTypeInterfaces {
  OfI: 'I'
  OfI2: 'I'
}

export type NexusGenObjectNames = keyof NexusGenObjects

export type NexusGenInputNames = keyof NexusGenInputs

export type NexusGenEnumNames = keyof NexusGenEnums

export type NexusGenInterfaceNames = keyof NexusGenInterfaces

export type NexusGenScalarNames = keyof NexusGenScalars

export type NexusGenUnionNames = never

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never

export type NexusGenAbstractsUsingStrategyResolveType = 'I'

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    resolveType: true
    __typename: false
    isTypeOf: false
  }
}

export interface NexusGenTypes {
  context: any
  inputTypes: NexusGenInputs
  rootTypes: NexusGenRootTypes
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars
  argTypes: NexusGenArgTypes
  fieldTypes: NexusGenFieldTypes
  fieldTypeNames: NexusGenFieldTypeNames
  allTypes: NexusGenAllTypes
  typeInterfaces: NexusGenTypeInterfaces
  objectNames: NexusGenObjectNames
  inputNames: NexusGenInputNames
  enumNames: NexusGenEnumNames
  interfaceNames: NexusGenInterfaceNames
  scalarNames: NexusGenScalarNames
  unionNames: NexusGenUnionNames
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames']
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames']
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames']
  abstractTypeMembers: NexusGenAbstractTypeMembers
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType
  features: NexusGenFeaturesConfig
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {}
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
