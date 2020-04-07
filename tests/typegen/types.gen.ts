/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreatePostInput: {
    // input type
    author: string; // ID!
    geo: Array<Array<number | null>>; // [[Float]!]!
    name: string; // String!
  };
  PostFilters: {
    // input type
    order: NexusGenEnums["OrderEnum"]; // OrderEnum!
    search?: string | null; // String
  };
}

export interface NexusGenEnums {
  OrderEnum: "ASC" | "DESC";
  SomeEnum: "A" | "B";
}

export interface NexusGenRootTypes {
  Mutation: {};
  Post: {};
  Query: {};
  User: {};
  Node: NexusGenRootTypes["Post"] | NexusGenRootTypes["User"];
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  UUID: any;
  ExampleUnion: NexusGenRootTypes["Post"] | NexusGenRootTypes["User"];
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  CreatePostInput: NexusGenInputs["CreatePostInput"];
  PostFilters: NexusGenInputs["PostFilters"];
  OrderEnum: NexusGenEnums["OrderEnum"];
  SomeEnum: NexusGenEnums["SomeEnum"];
}

export interface NexusGenFieldTypes {
  Mutation: {
    // field return type
    createPost: NexusGenRootTypes["Post"]; // Post!
    registerClick: NexusGenRootTypes["Query"]; // Query!
    someList: Array<string | null>; // [String]!
  };
  Post: {
    // field return type
    author: NexusGenRootTypes["User"]; // User!
    geo: number[][]; // [[Float!]!]!
    id: string; // ID!
    messyGeo: Array<number[] | null> | null; // [[Float!]]
    uuid: any; // UUID!
  };
  Query: {
    // field return type
    posts: NexusGenRootTypes["Post"][]; // [Post!]!
    unionField: NexusGenRootTypes["ExampleUnion"]; // ExampleUnion!
    user: NexusGenRootTypes["User"]; // User!
  };
  User: {
    // field return type
    email: string; // String!
    id: string; // ID!
    name: string; // String!
    outEnum: NexusGenEnums["SomeEnum"] | null; // SomeEnum
    phone: string | null; // String
    posts: NexusGenRootTypes["Post"][]; // [Post!]!
  };
  Node: {
    // field return type
    id: string; // ID!
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    createPost: {
      // args
      input: NexusGenInputs["CreatePostInput"]; // CreatePostInput!
    };
    registerClick: {
      // args
      uuid?: any | null; // UUID
    };
    someList: {
      // args
      items: Array<string | null>; // [String]!
    };
  };
  Query: {
    posts: {
      // args
      filters: NexusGenInputs["PostFilters"]; // PostFilters!
    };
  };
  User: {
    name: {
      // args
      prefix?: string | null; // String
    };
    posts: {
      // args
      filters?: NexusGenInputs["PostFilters"] | null; // PostFilters
    };
  };
}

export interface NexusGenAbstractResolveReturnTypes {
  ExampleUnion: "Post" | "User";
  Node: "Post" | "User";
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "Post" | "Query" | "User";

export type NexusGenInputNames = "CreatePostInput" | "PostFilters";

export type NexusGenEnumNames = "OrderEnum" | "SomeEnum";

export type NexusGenInterfaceNames = "Node";

export type NexusGenScalarNames =
  | "Boolean"
  | "Float"
  | "ID"
  | "Int"
  | "String"
  | "UUID";

export type NexusGenUnionNames = "ExampleUnion";

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes["inputNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["scalarNames"];
  allOutputTypes:
    | NexusGenTypes["objectNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["unionNames"]
    | NexusGenTypes["interfaceNames"]
    | NexusGenTypes["scalarNames"];
  allNamedTypes:
    | NexusGenTypes["allInputTypes"]
    | NexusGenTypes["allOutputTypes"];
  abstractTypes: NexusGenTypes["interfaceNames"] | NexusGenTypes["unionNames"];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginSchemaConfig {}
}
