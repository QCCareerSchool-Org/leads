
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model LeadsOnCourses
 * 
 */
export type LeadsOnCourses = $Result.DefaultSelection<Prisma.$LeadsOnCoursesPayload>
/**
 * Model MarketingParameterSet
 * 
 */
export type MarketingParameterSet = $Result.DefaultSelection<Prisma.$MarketingParameterSetPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Leads
 * const leads = await prisma.lead.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Leads
   * const leads = await prisma.lead.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leadsOnCourses`: Exposes CRUD operations for the **LeadsOnCourses** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeadsOnCourses
    * const leadsOnCourses = await prisma.leadsOnCourses.findMany()
    * ```
    */
  get leadsOnCourses(): Prisma.LeadsOnCoursesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.marketingParameterSet`: Exposes CRUD operations for the **MarketingParameterSet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MarketingParameterSets
    * const marketingParameterSets = await prisma.marketingParameterSet.findMany()
    * ```
    */
  get marketingParameterSet(): Prisma.MarketingParameterSetDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Lead: 'Lead',
    LeadsOnCourses: 'LeadsOnCourses',
    MarketingParameterSet: 'MarketingParameterSet'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "lead" | "leadsOnCourses" | "marketingParameterSet"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      LeadsOnCourses: {
        payload: Prisma.$LeadsOnCoursesPayload<ExtArgs>
        fields: Prisma.LeadsOnCoursesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadsOnCoursesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadsOnCoursesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadsOnCoursesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadsOnCoursesPayload>
          }
          findFirst: {
            args: Prisma.LeadsOnCoursesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadsOnCoursesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadsOnCoursesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadsOnCoursesPayload>
          }
          findMany: {
            args: Prisma.LeadsOnCoursesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadsOnCoursesPayload>[]
          }
          create: {
            args: Prisma.LeadsOnCoursesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadsOnCoursesPayload>
          }
          createMany: {
            args: Prisma.LeadsOnCoursesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LeadsOnCoursesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadsOnCoursesPayload>
          }
          update: {
            args: Prisma.LeadsOnCoursesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadsOnCoursesPayload>
          }
          deleteMany: {
            args: Prisma.LeadsOnCoursesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadsOnCoursesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeadsOnCoursesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadsOnCoursesPayload>
          }
          aggregate: {
            args: Prisma.LeadsOnCoursesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeadsOnCourses>
          }
          groupBy: {
            args: Prisma.LeadsOnCoursesGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadsOnCoursesGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadsOnCoursesCountArgs<ExtArgs>
            result: $Utils.Optional<LeadsOnCoursesCountAggregateOutputType> | number
          }
        }
      }
      MarketingParameterSet: {
        payload: Prisma.$MarketingParameterSetPayload<ExtArgs>
        fields: Prisma.MarketingParameterSetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarketingParameterSetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketingParameterSetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarketingParameterSetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketingParameterSetPayload>
          }
          findFirst: {
            args: Prisma.MarketingParameterSetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketingParameterSetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarketingParameterSetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketingParameterSetPayload>
          }
          findMany: {
            args: Prisma.MarketingParameterSetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketingParameterSetPayload>[]
          }
          create: {
            args: Prisma.MarketingParameterSetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketingParameterSetPayload>
          }
          createMany: {
            args: Prisma.MarketingParameterSetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MarketingParameterSetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketingParameterSetPayload>
          }
          update: {
            args: Prisma.MarketingParameterSetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketingParameterSetPayload>
          }
          deleteMany: {
            args: Prisma.MarketingParameterSetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarketingParameterSetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MarketingParameterSetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketingParameterSetPayload>
          }
          aggregate: {
            args: Prisma.MarketingParameterSetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarketingParameterSet>
          }
          groupBy: {
            args: Prisma.MarketingParameterSetGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarketingParameterSetGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarketingParameterSetCountArgs<ExtArgs>
            result: $Utils.Optional<MarketingParameterSetCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    lead?: LeadOmit
    leadsOnCourses?: LeadsOnCoursesOmit
    marketingParameterSet?: MarketingParameterSetOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LeadCountOutputType
   */

  export type LeadCountOutputType = {
    courses: number
  }

  export type LeadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | LeadCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes
  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCountOutputType
     */
    select?: LeadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadsOnCoursesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadMinAggregateOutputType = {
    leadId: Bytes | null
    ipAddress: Bytes | null
    schoolName: string | null
    emailAddress: string | null
    firstName: string | null
    lastName: string | null
    telephoneNumber: string | null
    emailOptIn: boolean | null
    smsOptIn: boolean | null
    city: string | null
    provinceCode: string | null
    countryCode: string | null
    referrer: string | null
    browserName: string | null
    browserVersion: string | null
    os: string | null
    mobile: boolean | null
    gclid: string | null
    msclkid: string | null
    created: Date | null
    updated: Date | null
    nonce: Bytes | null
  }

  export type LeadMaxAggregateOutputType = {
    leadId: Bytes | null
    ipAddress: Bytes | null
    schoolName: string | null
    emailAddress: string | null
    firstName: string | null
    lastName: string | null
    telephoneNumber: string | null
    emailOptIn: boolean | null
    smsOptIn: boolean | null
    city: string | null
    provinceCode: string | null
    countryCode: string | null
    referrer: string | null
    browserName: string | null
    browserVersion: string | null
    os: string | null
    mobile: boolean | null
    gclid: string | null
    msclkid: string | null
    created: Date | null
    updated: Date | null
    nonce: Bytes | null
  }

  export type LeadCountAggregateOutputType = {
    leadId: number
    ipAddress: number
    schoolName: number
    emailAddress: number
    firstName: number
    lastName: number
    telephoneNumber: number
    emailOptIn: number
    smsOptIn: number
    city: number
    provinceCode: number
    countryCode: number
    referrer: number
    browserName: number
    browserVersion: number
    os: number
    mobile: number
    gclid: number
    msclkid: number
    created: number
    updated: number
    nonce: number
    fbFields: number
    _all: number
  }


  export type LeadMinAggregateInputType = {
    leadId?: true
    ipAddress?: true
    schoolName?: true
    emailAddress?: true
    firstName?: true
    lastName?: true
    telephoneNumber?: true
    emailOptIn?: true
    smsOptIn?: true
    city?: true
    provinceCode?: true
    countryCode?: true
    referrer?: true
    browserName?: true
    browserVersion?: true
    os?: true
    mobile?: true
    gclid?: true
    msclkid?: true
    created?: true
    updated?: true
    nonce?: true
  }

  export type LeadMaxAggregateInputType = {
    leadId?: true
    ipAddress?: true
    schoolName?: true
    emailAddress?: true
    firstName?: true
    lastName?: true
    telephoneNumber?: true
    emailOptIn?: true
    smsOptIn?: true
    city?: true
    provinceCode?: true
    countryCode?: true
    referrer?: true
    browserName?: true
    browserVersion?: true
    os?: true
    mobile?: true
    gclid?: true
    msclkid?: true
    created?: true
    updated?: true
    nonce?: true
  }

  export type LeadCountAggregateInputType = {
    leadId?: true
    ipAddress?: true
    schoolName?: true
    emailAddress?: true
    firstName?: true
    lastName?: true
    telephoneNumber?: true
    emailOptIn?: true
    smsOptIn?: true
    city?: true
    provinceCode?: true
    countryCode?: true
    referrer?: true
    browserName?: true
    browserVersion?: true
    os?: true
    mobile?: true
    gclid?: true
    msclkid?: true
    created?: true
    updated?: true
    nonce?: true
    fbFields?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    leadId: Bytes
    ipAddress: Bytes | null
    schoolName: string
    emailAddress: string
    firstName: string | null
    lastName: string | null
    telephoneNumber: string | null
    emailOptIn: boolean
    smsOptIn: boolean
    city: string | null
    provinceCode: string | null
    countryCode: string | null
    referrer: string | null
    browserName: string | null
    browserVersion: string | null
    os: string | null
    mobile: boolean | null
    gclid: string | null
    msclkid: string | null
    created: Date
    updated: Date
    nonce: Bytes | null
    fbFields: JsonValue | null
    _count: LeadCountAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    leadId?: boolean
    ipAddress?: boolean
    schoolName?: boolean
    emailAddress?: boolean
    firstName?: boolean
    lastName?: boolean
    telephoneNumber?: boolean
    emailOptIn?: boolean
    smsOptIn?: boolean
    city?: boolean
    provinceCode?: boolean
    countryCode?: boolean
    referrer?: boolean
    browserName?: boolean
    browserVersion?: boolean
    os?: boolean
    mobile?: boolean
    gclid?: boolean
    msclkid?: boolean
    created?: boolean
    updated?: boolean
    nonce?: boolean
    fbFields?: boolean
    marketingParameterSet?: boolean | Lead$marketingParameterSetArgs<ExtArgs>
    courses?: boolean | Lead$coursesArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>



  export type LeadSelectScalar = {
    leadId?: boolean
    ipAddress?: boolean
    schoolName?: boolean
    emailAddress?: boolean
    firstName?: boolean
    lastName?: boolean
    telephoneNumber?: boolean
    emailOptIn?: boolean
    smsOptIn?: boolean
    city?: boolean
    provinceCode?: boolean
    countryCode?: boolean
    referrer?: boolean
    browserName?: boolean
    browserVersion?: boolean
    os?: boolean
    mobile?: boolean
    gclid?: boolean
    msclkid?: boolean
    created?: boolean
    updated?: boolean
    nonce?: boolean
    fbFields?: boolean
  }

  export type LeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"leadId" | "ipAddress" | "schoolName" | "emailAddress" | "firstName" | "lastName" | "telephoneNumber" | "emailOptIn" | "smsOptIn" | "city" | "provinceCode" | "countryCode" | "referrer" | "browserName" | "browserVersion" | "os" | "mobile" | "gclid" | "msclkid" | "created" | "updated" | "nonce" | "fbFields", ExtArgs["result"]["lead"]>
  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    marketingParameterSet?: boolean | Lead$marketingParameterSetArgs<ExtArgs>
    courses?: boolean | Lead$coursesArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      marketingParameterSet: Prisma.$MarketingParameterSetPayload<ExtArgs> | null
      courses: Prisma.$LeadsOnCoursesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      leadId: Prisma.Bytes
      ipAddress: Prisma.Bytes | null
      schoolName: string
      emailAddress: string
      firstName: string | null
      lastName: string | null
      telephoneNumber: string | null
      emailOptIn: boolean
      smsOptIn: boolean
      city: string | null
      provinceCode: string | null
      countryCode: string | null
      referrer: string | null
      browserName: string | null
      browserVersion: string | null
      os: string | null
      mobile: boolean | null
      gclid: string | null
      msclkid: string | null
      created: Date
      updated: Date
      nonce: Prisma.Bytes | null
      fbFields: Prisma.JsonValue | null
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `leadId`
     * const leadWithLeadIdOnly = await prisma.lead.findMany({ select: { leadId: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    marketingParameterSet<T extends Lead$marketingParameterSetArgs<ExtArgs> = {}>(args?: Subset<T, Lead$marketingParameterSetArgs<ExtArgs>>): Prisma__MarketingParameterSetClient<$Result.GetResult<Prisma.$MarketingParameterSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    courses<T extends Lead$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Lead$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadsOnCoursesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */
  interface LeadFieldRefs {
    readonly leadId: FieldRef<"Lead", 'Bytes'>
    readonly ipAddress: FieldRef<"Lead", 'Bytes'>
    readonly schoolName: FieldRef<"Lead", 'String'>
    readonly emailAddress: FieldRef<"Lead", 'String'>
    readonly firstName: FieldRef<"Lead", 'String'>
    readonly lastName: FieldRef<"Lead", 'String'>
    readonly telephoneNumber: FieldRef<"Lead", 'String'>
    readonly emailOptIn: FieldRef<"Lead", 'Boolean'>
    readonly smsOptIn: FieldRef<"Lead", 'Boolean'>
    readonly city: FieldRef<"Lead", 'String'>
    readonly provinceCode: FieldRef<"Lead", 'String'>
    readonly countryCode: FieldRef<"Lead", 'String'>
    readonly referrer: FieldRef<"Lead", 'String'>
    readonly browserName: FieldRef<"Lead", 'String'>
    readonly browserVersion: FieldRef<"Lead", 'String'>
    readonly os: FieldRef<"Lead", 'String'>
    readonly mobile: FieldRef<"Lead", 'Boolean'>
    readonly gclid: FieldRef<"Lead", 'String'>
    readonly msclkid: FieldRef<"Lead", 'String'>
    readonly created: FieldRef<"Lead", 'DateTime'>
    readonly updated: FieldRef<"Lead", 'DateTime'>
    readonly nonce: FieldRef<"Lead", 'Bytes'>
    readonly fbFields: FieldRef<"Lead", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to delete.
     */
    limit?: number
  }

  /**
   * Lead.marketingParameterSet
   */
  export type Lead$marketingParameterSetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketingParameterSet
     */
    select?: MarketingParameterSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketingParameterSet
     */
    omit?: MarketingParameterSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketingParameterSetInclude<ExtArgs> | null
    where?: MarketingParameterSetWhereInput
  }

  /**
   * Lead.courses
   */
  export type Lead$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadsOnCourses
     */
    select?: LeadsOnCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadsOnCourses
     */
    omit?: LeadsOnCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadsOnCoursesInclude<ExtArgs> | null
    where?: LeadsOnCoursesWhereInput
    orderBy?: LeadsOnCoursesOrderByWithRelationInput | LeadsOnCoursesOrderByWithRelationInput[]
    cursor?: LeadsOnCoursesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadsOnCoursesScalarFieldEnum | LeadsOnCoursesScalarFieldEnum[]
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model LeadsOnCourses
   */

  export type AggregateLeadsOnCourses = {
    _count: LeadsOnCoursesCountAggregateOutputType | null
    _min: LeadsOnCoursesMinAggregateOutputType | null
    _max: LeadsOnCoursesMaxAggregateOutputType | null
  }

  export type LeadsOnCoursesMinAggregateOutputType = {
    leadId: Bytes | null
    courseCode: string | null
  }

  export type LeadsOnCoursesMaxAggregateOutputType = {
    leadId: Bytes | null
    courseCode: string | null
  }

  export type LeadsOnCoursesCountAggregateOutputType = {
    leadId: number
    courseCode: number
    _all: number
  }


  export type LeadsOnCoursesMinAggregateInputType = {
    leadId?: true
    courseCode?: true
  }

  export type LeadsOnCoursesMaxAggregateInputType = {
    leadId?: true
    courseCode?: true
  }

  export type LeadsOnCoursesCountAggregateInputType = {
    leadId?: true
    courseCode?: true
    _all?: true
  }

  export type LeadsOnCoursesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadsOnCourses to aggregate.
     */
    where?: LeadsOnCoursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadsOnCourses to fetch.
     */
    orderBy?: LeadsOnCoursesOrderByWithRelationInput | LeadsOnCoursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadsOnCoursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadsOnCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadsOnCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeadsOnCourses
    **/
    _count?: true | LeadsOnCoursesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadsOnCoursesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadsOnCoursesMaxAggregateInputType
  }

  export type GetLeadsOnCoursesAggregateType<T extends LeadsOnCoursesAggregateArgs> = {
        [P in keyof T & keyof AggregateLeadsOnCourses]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeadsOnCourses[P]>
      : GetScalarType<T[P], AggregateLeadsOnCourses[P]>
  }




  export type LeadsOnCoursesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadsOnCoursesWhereInput
    orderBy?: LeadsOnCoursesOrderByWithAggregationInput | LeadsOnCoursesOrderByWithAggregationInput[]
    by: LeadsOnCoursesScalarFieldEnum[] | LeadsOnCoursesScalarFieldEnum
    having?: LeadsOnCoursesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadsOnCoursesCountAggregateInputType | true
    _min?: LeadsOnCoursesMinAggregateInputType
    _max?: LeadsOnCoursesMaxAggregateInputType
  }

  export type LeadsOnCoursesGroupByOutputType = {
    leadId: Bytes
    courseCode: string
    _count: LeadsOnCoursesCountAggregateOutputType | null
    _min: LeadsOnCoursesMinAggregateOutputType | null
    _max: LeadsOnCoursesMaxAggregateOutputType | null
  }

  type GetLeadsOnCoursesGroupByPayload<T extends LeadsOnCoursesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadsOnCoursesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadsOnCoursesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadsOnCoursesGroupByOutputType[P]>
            : GetScalarType<T[P], LeadsOnCoursesGroupByOutputType[P]>
        }
      >
    >


  export type LeadsOnCoursesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    leadId?: boolean
    courseCode?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadsOnCourses"]>



  export type LeadsOnCoursesSelectScalar = {
    leadId?: boolean
    courseCode?: boolean
  }

  export type LeadsOnCoursesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"leadId" | "courseCode", ExtArgs["result"]["leadsOnCourses"]>
  export type LeadsOnCoursesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $LeadsOnCoursesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeadsOnCourses"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      leadId: Prisma.Bytes
      courseCode: string
    }, ExtArgs["result"]["leadsOnCourses"]>
    composites: {}
  }

  type LeadsOnCoursesGetPayload<S extends boolean | null | undefined | LeadsOnCoursesDefaultArgs> = $Result.GetResult<Prisma.$LeadsOnCoursesPayload, S>

  type LeadsOnCoursesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadsOnCoursesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadsOnCoursesCountAggregateInputType | true
    }

  export interface LeadsOnCoursesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeadsOnCourses'], meta: { name: 'LeadsOnCourses' } }
    /**
     * Find zero or one LeadsOnCourses that matches the filter.
     * @param {LeadsOnCoursesFindUniqueArgs} args - Arguments to find a LeadsOnCourses
     * @example
     * // Get one LeadsOnCourses
     * const leadsOnCourses = await prisma.leadsOnCourses.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadsOnCoursesFindUniqueArgs>(args: SelectSubset<T, LeadsOnCoursesFindUniqueArgs<ExtArgs>>): Prisma__LeadsOnCoursesClient<$Result.GetResult<Prisma.$LeadsOnCoursesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeadsOnCourses that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadsOnCoursesFindUniqueOrThrowArgs} args - Arguments to find a LeadsOnCourses
     * @example
     * // Get one LeadsOnCourses
     * const leadsOnCourses = await prisma.leadsOnCourses.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadsOnCoursesFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadsOnCoursesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadsOnCoursesClient<$Result.GetResult<Prisma.$LeadsOnCoursesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadsOnCourses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadsOnCoursesFindFirstArgs} args - Arguments to find a LeadsOnCourses
     * @example
     * // Get one LeadsOnCourses
     * const leadsOnCourses = await prisma.leadsOnCourses.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadsOnCoursesFindFirstArgs>(args?: SelectSubset<T, LeadsOnCoursesFindFirstArgs<ExtArgs>>): Prisma__LeadsOnCoursesClient<$Result.GetResult<Prisma.$LeadsOnCoursesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadsOnCourses that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadsOnCoursesFindFirstOrThrowArgs} args - Arguments to find a LeadsOnCourses
     * @example
     * // Get one LeadsOnCourses
     * const leadsOnCourses = await prisma.leadsOnCourses.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadsOnCoursesFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadsOnCoursesFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadsOnCoursesClient<$Result.GetResult<Prisma.$LeadsOnCoursesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeadsOnCourses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadsOnCoursesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeadsOnCourses
     * const leadsOnCourses = await prisma.leadsOnCourses.findMany()
     * 
     * // Get first 10 LeadsOnCourses
     * const leadsOnCourses = await prisma.leadsOnCourses.findMany({ take: 10 })
     * 
     * // Only select the `leadId`
     * const leadsOnCoursesWithLeadIdOnly = await prisma.leadsOnCourses.findMany({ select: { leadId: true } })
     * 
     */
    findMany<T extends LeadsOnCoursesFindManyArgs>(args?: SelectSubset<T, LeadsOnCoursesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadsOnCoursesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeadsOnCourses.
     * @param {LeadsOnCoursesCreateArgs} args - Arguments to create a LeadsOnCourses.
     * @example
     * // Create one LeadsOnCourses
     * const LeadsOnCourses = await prisma.leadsOnCourses.create({
     *   data: {
     *     // ... data to create a LeadsOnCourses
     *   }
     * })
     * 
     */
    create<T extends LeadsOnCoursesCreateArgs>(args: SelectSubset<T, LeadsOnCoursesCreateArgs<ExtArgs>>): Prisma__LeadsOnCoursesClient<$Result.GetResult<Prisma.$LeadsOnCoursesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeadsOnCourses.
     * @param {LeadsOnCoursesCreateManyArgs} args - Arguments to create many LeadsOnCourses.
     * @example
     * // Create many LeadsOnCourses
     * const leadsOnCourses = await prisma.leadsOnCourses.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadsOnCoursesCreateManyArgs>(args?: SelectSubset<T, LeadsOnCoursesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LeadsOnCourses.
     * @param {LeadsOnCoursesDeleteArgs} args - Arguments to delete one LeadsOnCourses.
     * @example
     * // Delete one LeadsOnCourses
     * const LeadsOnCourses = await prisma.leadsOnCourses.delete({
     *   where: {
     *     // ... filter to delete one LeadsOnCourses
     *   }
     * })
     * 
     */
    delete<T extends LeadsOnCoursesDeleteArgs>(args: SelectSubset<T, LeadsOnCoursesDeleteArgs<ExtArgs>>): Prisma__LeadsOnCoursesClient<$Result.GetResult<Prisma.$LeadsOnCoursesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeadsOnCourses.
     * @param {LeadsOnCoursesUpdateArgs} args - Arguments to update one LeadsOnCourses.
     * @example
     * // Update one LeadsOnCourses
     * const leadsOnCourses = await prisma.leadsOnCourses.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadsOnCoursesUpdateArgs>(args: SelectSubset<T, LeadsOnCoursesUpdateArgs<ExtArgs>>): Prisma__LeadsOnCoursesClient<$Result.GetResult<Prisma.$LeadsOnCoursesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeadsOnCourses.
     * @param {LeadsOnCoursesDeleteManyArgs} args - Arguments to filter LeadsOnCourses to delete.
     * @example
     * // Delete a few LeadsOnCourses
     * const { count } = await prisma.leadsOnCourses.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadsOnCoursesDeleteManyArgs>(args?: SelectSubset<T, LeadsOnCoursesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadsOnCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadsOnCoursesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeadsOnCourses
     * const leadsOnCourses = await prisma.leadsOnCourses.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadsOnCoursesUpdateManyArgs>(args: SelectSubset<T, LeadsOnCoursesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LeadsOnCourses.
     * @param {LeadsOnCoursesUpsertArgs} args - Arguments to update or create a LeadsOnCourses.
     * @example
     * // Update or create a LeadsOnCourses
     * const leadsOnCourses = await prisma.leadsOnCourses.upsert({
     *   create: {
     *     // ... data to create a LeadsOnCourses
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeadsOnCourses we want to update
     *   }
     * })
     */
    upsert<T extends LeadsOnCoursesUpsertArgs>(args: SelectSubset<T, LeadsOnCoursesUpsertArgs<ExtArgs>>): Prisma__LeadsOnCoursesClient<$Result.GetResult<Prisma.$LeadsOnCoursesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeadsOnCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadsOnCoursesCountArgs} args - Arguments to filter LeadsOnCourses to count.
     * @example
     * // Count the number of LeadsOnCourses
     * const count = await prisma.leadsOnCourses.count({
     *   where: {
     *     // ... the filter for the LeadsOnCourses we want to count
     *   }
     * })
    **/
    count<T extends LeadsOnCoursesCountArgs>(
      args?: Subset<T, LeadsOnCoursesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadsOnCoursesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeadsOnCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadsOnCoursesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadsOnCoursesAggregateArgs>(args: Subset<T, LeadsOnCoursesAggregateArgs>): Prisma.PrismaPromise<GetLeadsOnCoursesAggregateType<T>>

    /**
     * Group by LeadsOnCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadsOnCoursesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadsOnCoursesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadsOnCoursesGroupByArgs['orderBy'] }
        : { orderBy?: LeadsOnCoursesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadsOnCoursesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadsOnCoursesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeadsOnCourses model
   */
  readonly fields: LeadsOnCoursesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeadsOnCourses.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadsOnCoursesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeadsOnCourses model
   */
  interface LeadsOnCoursesFieldRefs {
    readonly leadId: FieldRef<"LeadsOnCourses", 'Bytes'>
    readonly courseCode: FieldRef<"LeadsOnCourses", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LeadsOnCourses findUnique
   */
  export type LeadsOnCoursesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadsOnCourses
     */
    select?: LeadsOnCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadsOnCourses
     */
    omit?: LeadsOnCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadsOnCoursesInclude<ExtArgs> | null
    /**
     * Filter, which LeadsOnCourses to fetch.
     */
    where: LeadsOnCoursesWhereUniqueInput
  }

  /**
   * LeadsOnCourses findUniqueOrThrow
   */
  export type LeadsOnCoursesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadsOnCourses
     */
    select?: LeadsOnCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadsOnCourses
     */
    omit?: LeadsOnCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadsOnCoursesInclude<ExtArgs> | null
    /**
     * Filter, which LeadsOnCourses to fetch.
     */
    where: LeadsOnCoursesWhereUniqueInput
  }

  /**
   * LeadsOnCourses findFirst
   */
  export type LeadsOnCoursesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadsOnCourses
     */
    select?: LeadsOnCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadsOnCourses
     */
    omit?: LeadsOnCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadsOnCoursesInclude<ExtArgs> | null
    /**
     * Filter, which LeadsOnCourses to fetch.
     */
    where?: LeadsOnCoursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadsOnCourses to fetch.
     */
    orderBy?: LeadsOnCoursesOrderByWithRelationInput | LeadsOnCoursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadsOnCourses.
     */
    cursor?: LeadsOnCoursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadsOnCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadsOnCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadsOnCourses.
     */
    distinct?: LeadsOnCoursesScalarFieldEnum | LeadsOnCoursesScalarFieldEnum[]
  }

  /**
   * LeadsOnCourses findFirstOrThrow
   */
  export type LeadsOnCoursesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadsOnCourses
     */
    select?: LeadsOnCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadsOnCourses
     */
    omit?: LeadsOnCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadsOnCoursesInclude<ExtArgs> | null
    /**
     * Filter, which LeadsOnCourses to fetch.
     */
    where?: LeadsOnCoursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadsOnCourses to fetch.
     */
    orderBy?: LeadsOnCoursesOrderByWithRelationInput | LeadsOnCoursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadsOnCourses.
     */
    cursor?: LeadsOnCoursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadsOnCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadsOnCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadsOnCourses.
     */
    distinct?: LeadsOnCoursesScalarFieldEnum | LeadsOnCoursesScalarFieldEnum[]
  }

  /**
   * LeadsOnCourses findMany
   */
  export type LeadsOnCoursesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadsOnCourses
     */
    select?: LeadsOnCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadsOnCourses
     */
    omit?: LeadsOnCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadsOnCoursesInclude<ExtArgs> | null
    /**
     * Filter, which LeadsOnCourses to fetch.
     */
    where?: LeadsOnCoursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadsOnCourses to fetch.
     */
    orderBy?: LeadsOnCoursesOrderByWithRelationInput | LeadsOnCoursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeadsOnCourses.
     */
    cursor?: LeadsOnCoursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadsOnCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadsOnCourses.
     */
    skip?: number
    distinct?: LeadsOnCoursesScalarFieldEnum | LeadsOnCoursesScalarFieldEnum[]
  }

  /**
   * LeadsOnCourses create
   */
  export type LeadsOnCoursesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadsOnCourses
     */
    select?: LeadsOnCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadsOnCourses
     */
    omit?: LeadsOnCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadsOnCoursesInclude<ExtArgs> | null
    /**
     * The data needed to create a LeadsOnCourses.
     */
    data: XOR<LeadsOnCoursesCreateInput, LeadsOnCoursesUncheckedCreateInput>
  }

  /**
   * LeadsOnCourses createMany
   */
  export type LeadsOnCoursesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeadsOnCourses.
     */
    data: LeadsOnCoursesCreateManyInput | LeadsOnCoursesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeadsOnCourses update
   */
  export type LeadsOnCoursesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadsOnCourses
     */
    select?: LeadsOnCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadsOnCourses
     */
    omit?: LeadsOnCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadsOnCoursesInclude<ExtArgs> | null
    /**
     * The data needed to update a LeadsOnCourses.
     */
    data: XOR<LeadsOnCoursesUpdateInput, LeadsOnCoursesUncheckedUpdateInput>
    /**
     * Choose, which LeadsOnCourses to update.
     */
    where: LeadsOnCoursesWhereUniqueInput
  }

  /**
   * LeadsOnCourses updateMany
   */
  export type LeadsOnCoursesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeadsOnCourses.
     */
    data: XOR<LeadsOnCoursesUpdateManyMutationInput, LeadsOnCoursesUncheckedUpdateManyInput>
    /**
     * Filter which LeadsOnCourses to update
     */
    where?: LeadsOnCoursesWhereInput
    /**
     * Limit how many LeadsOnCourses to update.
     */
    limit?: number
  }

  /**
   * LeadsOnCourses upsert
   */
  export type LeadsOnCoursesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadsOnCourses
     */
    select?: LeadsOnCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadsOnCourses
     */
    omit?: LeadsOnCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadsOnCoursesInclude<ExtArgs> | null
    /**
     * The filter to search for the LeadsOnCourses to update in case it exists.
     */
    where: LeadsOnCoursesWhereUniqueInput
    /**
     * In case the LeadsOnCourses found by the `where` argument doesn't exist, create a new LeadsOnCourses with this data.
     */
    create: XOR<LeadsOnCoursesCreateInput, LeadsOnCoursesUncheckedCreateInput>
    /**
     * In case the LeadsOnCourses was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadsOnCoursesUpdateInput, LeadsOnCoursesUncheckedUpdateInput>
  }

  /**
   * LeadsOnCourses delete
   */
  export type LeadsOnCoursesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadsOnCourses
     */
    select?: LeadsOnCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadsOnCourses
     */
    omit?: LeadsOnCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadsOnCoursesInclude<ExtArgs> | null
    /**
     * Filter which LeadsOnCourses to delete.
     */
    where: LeadsOnCoursesWhereUniqueInput
  }

  /**
   * LeadsOnCourses deleteMany
   */
  export type LeadsOnCoursesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadsOnCourses to delete
     */
    where?: LeadsOnCoursesWhereInput
    /**
     * Limit how many LeadsOnCourses to delete.
     */
    limit?: number
  }

  /**
   * LeadsOnCourses without action
   */
  export type LeadsOnCoursesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadsOnCourses
     */
    select?: LeadsOnCoursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadsOnCourses
     */
    omit?: LeadsOnCoursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadsOnCoursesInclude<ExtArgs> | null
  }


  /**
   * Model MarketingParameterSet
   */

  export type AggregateMarketingParameterSet = {
    _count: MarketingParameterSetCountAggregateOutputType | null
    _min: MarketingParameterSetMinAggregateOutputType | null
    _max: MarketingParameterSetMaxAggregateOutputType | null
  }

  export type MarketingParameterSetMinAggregateOutputType = {
    leadId: Bytes | null
    source: string | null
    medium: string | null
    campaign: string | null
    content: string | null
    term: string | null
  }

  export type MarketingParameterSetMaxAggregateOutputType = {
    leadId: Bytes | null
    source: string | null
    medium: string | null
    campaign: string | null
    content: string | null
    term: string | null
  }

  export type MarketingParameterSetCountAggregateOutputType = {
    leadId: number
    source: number
    medium: number
    campaign: number
    content: number
    term: number
    _all: number
  }


  export type MarketingParameterSetMinAggregateInputType = {
    leadId?: true
    source?: true
    medium?: true
    campaign?: true
    content?: true
    term?: true
  }

  export type MarketingParameterSetMaxAggregateInputType = {
    leadId?: true
    source?: true
    medium?: true
    campaign?: true
    content?: true
    term?: true
  }

  export type MarketingParameterSetCountAggregateInputType = {
    leadId?: true
    source?: true
    medium?: true
    campaign?: true
    content?: true
    term?: true
    _all?: true
  }

  export type MarketingParameterSetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketingParameterSet to aggregate.
     */
    where?: MarketingParameterSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketingParameterSets to fetch.
     */
    orderBy?: MarketingParameterSetOrderByWithRelationInput | MarketingParameterSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarketingParameterSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketingParameterSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketingParameterSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MarketingParameterSets
    **/
    _count?: true | MarketingParameterSetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketingParameterSetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketingParameterSetMaxAggregateInputType
  }

  export type GetMarketingParameterSetAggregateType<T extends MarketingParameterSetAggregateArgs> = {
        [P in keyof T & keyof AggregateMarketingParameterSet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarketingParameterSet[P]>
      : GetScalarType<T[P], AggregateMarketingParameterSet[P]>
  }




  export type MarketingParameterSetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketingParameterSetWhereInput
    orderBy?: MarketingParameterSetOrderByWithAggregationInput | MarketingParameterSetOrderByWithAggregationInput[]
    by: MarketingParameterSetScalarFieldEnum[] | MarketingParameterSetScalarFieldEnum
    having?: MarketingParameterSetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketingParameterSetCountAggregateInputType | true
    _min?: MarketingParameterSetMinAggregateInputType
    _max?: MarketingParameterSetMaxAggregateInputType
  }

  export type MarketingParameterSetGroupByOutputType = {
    leadId: Bytes
    source: string | null
    medium: string | null
    campaign: string | null
    content: string | null
    term: string | null
    _count: MarketingParameterSetCountAggregateOutputType | null
    _min: MarketingParameterSetMinAggregateOutputType | null
    _max: MarketingParameterSetMaxAggregateOutputType | null
  }

  type GetMarketingParameterSetGroupByPayload<T extends MarketingParameterSetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarketingParameterSetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketingParameterSetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketingParameterSetGroupByOutputType[P]>
            : GetScalarType<T[P], MarketingParameterSetGroupByOutputType[P]>
        }
      >
    >


  export type MarketingParameterSetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    leadId?: boolean
    source?: boolean
    medium?: boolean
    campaign?: boolean
    content?: boolean
    term?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marketingParameterSet"]>



  export type MarketingParameterSetSelectScalar = {
    leadId?: boolean
    source?: boolean
    medium?: boolean
    campaign?: boolean
    content?: boolean
    term?: boolean
  }

  export type MarketingParameterSetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"leadId" | "source" | "medium" | "campaign" | "content" | "term", ExtArgs["result"]["marketingParameterSet"]>
  export type MarketingParameterSetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $MarketingParameterSetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MarketingParameterSet"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      leadId: Prisma.Bytes
      source: string | null
      medium: string | null
      campaign: string | null
      content: string | null
      term: string | null
    }, ExtArgs["result"]["marketingParameterSet"]>
    composites: {}
  }

  type MarketingParameterSetGetPayload<S extends boolean | null | undefined | MarketingParameterSetDefaultArgs> = $Result.GetResult<Prisma.$MarketingParameterSetPayload, S>

  type MarketingParameterSetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarketingParameterSetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarketingParameterSetCountAggregateInputType | true
    }

  export interface MarketingParameterSetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MarketingParameterSet'], meta: { name: 'MarketingParameterSet' } }
    /**
     * Find zero or one MarketingParameterSet that matches the filter.
     * @param {MarketingParameterSetFindUniqueArgs} args - Arguments to find a MarketingParameterSet
     * @example
     * // Get one MarketingParameterSet
     * const marketingParameterSet = await prisma.marketingParameterSet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketingParameterSetFindUniqueArgs>(args: SelectSubset<T, MarketingParameterSetFindUniqueArgs<ExtArgs>>): Prisma__MarketingParameterSetClient<$Result.GetResult<Prisma.$MarketingParameterSetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MarketingParameterSet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketingParameterSetFindUniqueOrThrowArgs} args - Arguments to find a MarketingParameterSet
     * @example
     * // Get one MarketingParameterSet
     * const marketingParameterSet = await prisma.marketingParameterSet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketingParameterSetFindUniqueOrThrowArgs>(args: SelectSubset<T, MarketingParameterSetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarketingParameterSetClient<$Result.GetResult<Prisma.$MarketingParameterSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketingParameterSet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketingParameterSetFindFirstArgs} args - Arguments to find a MarketingParameterSet
     * @example
     * // Get one MarketingParameterSet
     * const marketingParameterSet = await prisma.marketingParameterSet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketingParameterSetFindFirstArgs>(args?: SelectSubset<T, MarketingParameterSetFindFirstArgs<ExtArgs>>): Prisma__MarketingParameterSetClient<$Result.GetResult<Prisma.$MarketingParameterSetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketingParameterSet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketingParameterSetFindFirstOrThrowArgs} args - Arguments to find a MarketingParameterSet
     * @example
     * // Get one MarketingParameterSet
     * const marketingParameterSet = await prisma.marketingParameterSet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketingParameterSetFindFirstOrThrowArgs>(args?: SelectSubset<T, MarketingParameterSetFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarketingParameterSetClient<$Result.GetResult<Prisma.$MarketingParameterSetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MarketingParameterSets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketingParameterSetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MarketingParameterSets
     * const marketingParameterSets = await prisma.marketingParameterSet.findMany()
     * 
     * // Get first 10 MarketingParameterSets
     * const marketingParameterSets = await prisma.marketingParameterSet.findMany({ take: 10 })
     * 
     * // Only select the `leadId`
     * const marketingParameterSetWithLeadIdOnly = await prisma.marketingParameterSet.findMany({ select: { leadId: true } })
     * 
     */
    findMany<T extends MarketingParameterSetFindManyArgs>(args?: SelectSubset<T, MarketingParameterSetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketingParameterSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MarketingParameterSet.
     * @param {MarketingParameterSetCreateArgs} args - Arguments to create a MarketingParameterSet.
     * @example
     * // Create one MarketingParameterSet
     * const MarketingParameterSet = await prisma.marketingParameterSet.create({
     *   data: {
     *     // ... data to create a MarketingParameterSet
     *   }
     * })
     * 
     */
    create<T extends MarketingParameterSetCreateArgs>(args: SelectSubset<T, MarketingParameterSetCreateArgs<ExtArgs>>): Prisma__MarketingParameterSetClient<$Result.GetResult<Prisma.$MarketingParameterSetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MarketingParameterSets.
     * @param {MarketingParameterSetCreateManyArgs} args - Arguments to create many MarketingParameterSets.
     * @example
     * // Create many MarketingParameterSets
     * const marketingParameterSet = await prisma.marketingParameterSet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarketingParameterSetCreateManyArgs>(args?: SelectSubset<T, MarketingParameterSetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MarketingParameterSet.
     * @param {MarketingParameterSetDeleteArgs} args - Arguments to delete one MarketingParameterSet.
     * @example
     * // Delete one MarketingParameterSet
     * const MarketingParameterSet = await prisma.marketingParameterSet.delete({
     *   where: {
     *     // ... filter to delete one MarketingParameterSet
     *   }
     * })
     * 
     */
    delete<T extends MarketingParameterSetDeleteArgs>(args: SelectSubset<T, MarketingParameterSetDeleteArgs<ExtArgs>>): Prisma__MarketingParameterSetClient<$Result.GetResult<Prisma.$MarketingParameterSetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MarketingParameterSet.
     * @param {MarketingParameterSetUpdateArgs} args - Arguments to update one MarketingParameterSet.
     * @example
     * // Update one MarketingParameterSet
     * const marketingParameterSet = await prisma.marketingParameterSet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarketingParameterSetUpdateArgs>(args: SelectSubset<T, MarketingParameterSetUpdateArgs<ExtArgs>>): Prisma__MarketingParameterSetClient<$Result.GetResult<Prisma.$MarketingParameterSetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MarketingParameterSets.
     * @param {MarketingParameterSetDeleteManyArgs} args - Arguments to filter MarketingParameterSets to delete.
     * @example
     * // Delete a few MarketingParameterSets
     * const { count } = await prisma.marketingParameterSet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarketingParameterSetDeleteManyArgs>(args?: SelectSubset<T, MarketingParameterSetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarketingParameterSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketingParameterSetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MarketingParameterSets
     * const marketingParameterSet = await prisma.marketingParameterSet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarketingParameterSetUpdateManyArgs>(args: SelectSubset<T, MarketingParameterSetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MarketingParameterSet.
     * @param {MarketingParameterSetUpsertArgs} args - Arguments to update or create a MarketingParameterSet.
     * @example
     * // Update or create a MarketingParameterSet
     * const marketingParameterSet = await prisma.marketingParameterSet.upsert({
     *   create: {
     *     // ... data to create a MarketingParameterSet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MarketingParameterSet we want to update
     *   }
     * })
     */
    upsert<T extends MarketingParameterSetUpsertArgs>(args: SelectSubset<T, MarketingParameterSetUpsertArgs<ExtArgs>>): Prisma__MarketingParameterSetClient<$Result.GetResult<Prisma.$MarketingParameterSetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MarketingParameterSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketingParameterSetCountArgs} args - Arguments to filter MarketingParameterSets to count.
     * @example
     * // Count the number of MarketingParameterSets
     * const count = await prisma.marketingParameterSet.count({
     *   where: {
     *     // ... the filter for the MarketingParameterSets we want to count
     *   }
     * })
    **/
    count<T extends MarketingParameterSetCountArgs>(
      args?: Subset<T, MarketingParameterSetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketingParameterSetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MarketingParameterSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketingParameterSetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarketingParameterSetAggregateArgs>(args: Subset<T, MarketingParameterSetAggregateArgs>): Prisma.PrismaPromise<GetMarketingParameterSetAggregateType<T>>

    /**
     * Group by MarketingParameterSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketingParameterSetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarketingParameterSetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketingParameterSetGroupByArgs['orderBy'] }
        : { orderBy?: MarketingParameterSetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarketingParameterSetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketingParameterSetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MarketingParameterSet model
   */
  readonly fields: MarketingParameterSetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MarketingParameterSet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarketingParameterSetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MarketingParameterSet model
   */
  interface MarketingParameterSetFieldRefs {
    readonly leadId: FieldRef<"MarketingParameterSet", 'Bytes'>
    readonly source: FieldRef<"MarketingParameterSet", 'String'>
    readonly medium: FieldRef<"MarketingParameterSet", 'String'>
    readonly campaign: FieldRef<"MarketingParameterSet", 'String'>
    readonly content: FieldRef<"MarketingParameterSet", 'String'>
    readonly term: FieldRef<"MarketingParameterSet", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MarketingParameterSet findUnique
   */
  export type MarketingParameterSetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketingParameterSet
     */
    select?: MarketingParameterSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketingParameterSet
     */
    omit?: MarketingParameterSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketingParameterSetInclude<ExtArgs> | null
    /**
     * Filter, which MarketingParameterSet to fetch.
     */
    where: MarketingParameterSetWhereUniqueInput
  }

  /**
   * MarketingParameterSet findUniqueOrThrow
   */
  export type MarketingParameterSetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketingParameterSet
     */
    select?: MarketingParameterSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketingParameterSet
     */
    omit?: MarketingParameterSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketingParameterSetInclude<ExtArgs> | null
    /**
     * Filter, which MarketingParameterSet to fetch.
     */
    where: MarketingParameterSetWhereUniqueInput
  }

  /**
   * MarketingParameterSet findFirst
   */
  export type MarketingParameterSetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketingParameterSet
     */
    select?: MarketingParameterSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketingParameterSet
     */
    omit?: MarketingParameterSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketingParameterSetInclude<ExtArgs> | null
    /**
     * Filter, which MarketingParameterSet to fetch.
     */
    where?: MarketingParameterSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketingParameterSets to fetch.
     */
    orderBy?: MarketingParameterSetOrderByWithRelationInput | MarketingParameterSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketingParameterSets.
     */
    cursor?: MarketingParameterSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketingParameterSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketingParameterSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketingParameterSets.
     */
    distinct?: MarketingParameterSetScalarFieldEnum | MarketingParameterSetScalarFieldEnum[]
  }

  /**
   * MarketingParameterSet findFirstOrThrow
   */
  export type MarketingParameterSetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketingParameterSet
     */
    select?: MarketingParameterSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketingParameterSet
     */
    omit?: MarketingParameterSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketingParameterSetInclude<ExtArgs> | null
    /**
     * Filter, which MarketingParameterSet to fetch.
     */
    where?: MarketingParameterSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketingParameterSets to fetch.
     */
    orderBy?: MarketingParameterSetOrderByWithRelationInput | MarketingParameterSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketingParameterSets.
     */
    cursor?: MarketingParameterSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketingParameterSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketingParameterSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketingParameterSets.
     */
    distinct?: MarketingParameterSetScalarFieldEnum | MarketingParameterSetScalarFieldEnum[]
  }

  /**
   * MarketingParameterSet findMany
   */
  export type MarketingParameterSetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketingParameterSet
     */
    select?: MarketingParameterSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketingParameterSet
     */
    omit?: MarketingParameterSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketingParameterSetInclude<ExtArgs> | null
    /**
     * Filter, which MarketingParameterSets to fetch.
     */
    where?: MarketingParameterSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketingParameterSets to fetch.
     */
    orderBy?: MarketingParameterSetOrderByWithRelationInput | MarketingParameterSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MarketingParameterSets.
     */
    cursor?: MarketingParameterSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketingParameterSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketingParameterSets.
     */
    skip?: number
    distinct?: MarketingParameterSetScalarFieldEnum | MarketingParameterSetScalarFieldEnum[]
  }

  /**
   * MarketingParameterSet create
   */
  export type MarketingParameterSetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketingParameterSet
     */
    select?: MarketingParameterSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketingParameterSet
     */
    omit?: MarketingParameterSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketingParameterSetInclude<ExtArgs> | null
    /**
     * The data needed to create a MarketingParameterSet.
     */
    data: XOR<MarketingParameterSetCreateInput, MarketingParameterSetUncheckedCreateInput>
  }

  /**
   * MarketingParameterSet createMany
   */
  export type MarketingParameterSetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MarketingParameterSets.
     */
    data: MarketingParameterSetCreateManyInput | MarketingParameterSetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MarketingParameterSet update
   */
  export type MarketingParameterSetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketingParameterSet
     */
    select?: MarketingParameterSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketingParameterSet
     */
    omit?: MarketingParameterSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketingParameterSetInclude<ExtArgs> | null
    /**
     * The data needed to update a MarketingParameterSet.
     */
    data: XOR<MarketingParameterSetUpdateInput, MarketingParameterSetUncheckedUpdateInput>
    /**
     * Choose, which MarketingParameterSet to update.
     */
    where: MarketingParameterSetWhereUniqueInput
  }

  /**
   * MarketingParameterSet updateMany
   */
  export type MarketingParameterSetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MarketingParameterSets.
     */
    data: XOR<MarketingParameterSetUpdateManyMutationInput, MarketingParameterSetUncheckedUpdateManyInput>
    /**
     * Filter which MarketingParameterSets to update
     */
    where?: MarketingParameterSetWhereInput
    /**
     * Limit how many MarketingParameterSets to update.
     */
    limit?: number
  }

  /**
   * MarketingParameterSet upsert
   */
  export type MarketingParameterSetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketingParameterSet
     */
    select?: MarketingParameterSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketingParameterSet
     */
    omit?: MarketingParameterSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketingParameterSetInclude<ExtArgs> | null
    /**
     * The filter to search for the MarketingParameterSet to update in case it exists.
     */
    where: MarketingParameterSetWhereUniqueInput
    /**
     * In case the MarketingParameterSet found by the `where` argument doesn't exist, create a new MarketingParameterSet with this data.
     */
    create: XOR<MarketingParameterSetCreateInput, MarketingParameterSetUncheckedCreateInput>
    /**
     * In case the MarketingParameterSet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarketingParameterSetUpdateInput, MarketingParameterSetUncheckedUpdateInput>
  }

  /**
   * MarketingParameterSet delete
   */
  export type MarketingParameterSetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketingParameterSet
     */
    select?: MarketingParameterSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketingParameterSet
     */
    omit?: MarketingParameterSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketingParameterSetInclude<ExtArgs> | null
    /**
     * Filter which MarketingParameterSet to delete.
     */
    where: MarketingParameterSetWhereUniqueInput
  }

  /**
   * MarketingParameterSet deleteMany
   */
  export type MarketingParameterSetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketingParameterSets to delete
     */
    where?: MarketingParameterSetWhereInput
    /**
     * Limit how many MarketingParameterSets to delete.
     */
    limit?: number
  }

  /**
   * MarketingParameterSet without action
   */
  export type MarketingParameterSetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketingParameterSet
     */
    select?: MarketingParameterSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketingParameterSet
     */
    omit?: MarketingParameterSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketingParameterSetInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const LeadScalarFieldEnum: {
    leadId: 'leadId',
    ipAddress: 'ipAddress',
    schoolName: 'schoolName',
    emailAddress: 'emailAddress',
    firstName: 'firstName',
    lastName: 'lastName',
    telephoneNumber: 'telephoneNumber',
    emailOptIn: 'emailOptIn',
    smsOptIn: 'smsOptIn',
    city: 'city',
    provinceCode: 'provinceCode',
    countryCode: 'countryCode',
    referrer: 'referrer',
    browserName: 'browserName',
    browserVersion: 'browserVersion',
    os: 'os',
    mobile: 'mobile',
    gclid: 'gclid',
    msclkid: 'msclkid',
    created: 'created',
    updated: 'updated',
    nonce: 'nonce',
    fbFields: 'fbFields'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const LeadsOnCoursesScalarFieldEnum: {
    leadId: 'leadId',
    courseCode: 'courseCode'
  };

  export type LeadsOnCoursesScalarFieldEnum = (typeof LeadsOnCoursesScalarFieldEnum)[keyof typeof LeadsOnCoursesScalarFieldEnum]


  export const MarketingParameterSetScalarFieldEnum: {
    leadId: 'leadId',
    source: 'source',
    medium: 'medium',
    campaign: 'campaign',
    content: 'content',
    term: 'term'
  };

  export type MarketingParameterSetScalarFieldEnum = (typeof MarketingParameterSetScalarFieldEnum)[keyof typeof MarketingParameterSetScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const LeadOrderByRelevanceFieldEnum: {
    schoolName: 'schoolName',
    emailAddress: 'emailAddress',
    firstName: 'firstName',
    lastName: 'lastName',
    telephoneNumber: 'telephoneNumber',
    city: 'city',
    provinceCode: 'provinceCode',
    countryCode: 'countryCode',
    referrer: 'referrer',
    browserName: 'browserName',
    browserVersion: 'browserVersion',
    os: 'os',
    gclid: 'gclid',
    msclkid: 'msclkid'
  };

  export type LeadOrderByRelevanceFieldEnum = (typeof LeadOrderByRelevanceFieldEnum)[keyof typeof LeadOrderByRelevanceFieldEnum]


  export const LeadsOnCoursesOrderByRelevanceFieldEnum: {
    courseCode: 'courseCode'
  };

  export type LeadsOnCoursesOrderByRelevanceFieldEnum = (typeof LeadsOnCoursesOrderByRelevanceFieldEnum)[keyof typeof LeadsOnCoursesOrderByRelevanceFieldEnum]


  export const MarketingParameterSetOrderByRelevanceFieldEnum: {
    source: 'source',
    medium: 'medium',
    campaign: 'campaign',
    content: 'content',
    term: 'term'
  };

  export type MarketingParameterSetOrderByRelevanceFieldEnum = (typeof MarketingParameterSetOrderByRelevanceFieldEnum)[keyof typeof MarketingParameterSetOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    leadId?: BytesFilter<"Lead"> | Bytes
    ipAddress?: BytesNullableFilter<"Lead"> | Bytes | null
    schoolName?: StringFilter<"Lead"> | string
    emailAddress?: StringFilter<"Lead"> | string
    firstName?: StringNullableFilter<"Lead"> | string | null
    lastName?: StringNullableFilter<"Lead"> | string | null
    telephoneNumber?: StringNullableFilter<"Lead"> | string | null
    emailOptIn?: BoolFilter<"Lead"> | boolean
    smsOptIn?: BoolFilter<"Lead"> | boolean
    city?: StringNullableFilter<"Lead"> | string | null
    provinceCode?: StringNullableFilter<"Lead"> | string | null
    countryCode?: StringNullableFilter<"Lead"> | string | null
    referrer?: StringNullableFilter<"Lead"> | string | null
    browserName?: StringNullableFilter<"Lead"> | string | null
    browserVersion?: StringNullableFilter<"Lead"> | string | null
    os?: StringNullableFilter<"Lead"> | string | null
    mobile?: BoolNullableFilter<"Lead"> | boolean | null
    gclid?: StringNullableFilter<"Lead"> | string | null
    msclkid?: StringNullableFilter<"Lead"> | string | null
    created?: DateTimeFilter<"Lead"> | Date | string
    updated?: DateTimeFilter<"Lead"> | Date | string
    nonce?: BytesNullableFilter<"Lead"> | Bytes | null
    fbFields?: JsonNullableFilter<"Lead">
    marketingParameterSet?: XOR<MarketingParameterSetNullableScalarRelationFilter, MarketingParameterSetWhereInput> | null
    courses?: LeadsOnCoursesListRelationFilter
  }

  export type LeadOrderByWithRelationInput = {
    leadId?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    schoolName?: SortOrder
    emailAddress?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    telephoneNumber?: SortOrderInput | SortOrder
    emailOptIn?: SortOrder
    smsOptIn?: SortOrder
    city?: SortOrderInput | SortOrder
    provinceCode?: SortOrderInput | SortOrder
    countryCode?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    browserName?: SortOrderInput | SortOrder
    browserVersion?: SortOrderInput | SortOrder
    os?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    gclid?: SortOrderInput | SortOrder
    msclkid?: SortOrderInput | SortOrder
    created?: SortOrder
    updated?: SortOrder
    nonce?: SortOrderInput | SortOrder
    fbFields?: SortOrderInput | SortOrder
    marketingParameterSet?: MarketingParameterSetOrderByWithRelationInput
    courses?: LeadsOnCoursesOrderByRelationAggregateInput
    _relevance?: LeadOrderByRelevanceInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    leadId?: Bytes
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    ipAddress?: BytesNullableFilter<"Lead"> | Bytes | null
    schoolName?: StringFilter<"Lead"> | string
    emailAddress?: StringFilter<"Lead"> | string
    firstName?: StringNullableFilter<"Lead"> | string | null
    lastName?: StringNullableFilter<"Lead"> | string | null
    telephoneNumber?: StringNullableFilter<"Lead"> | string | null
    emailOptIn?: BoolFilter<"Lead"> | boolean
    smsOptIn?: BoolFilter<"Lead"> | boolean
    city?: StringNullableFilter<"Lead"> | string | null
    provinceCode?: StringNullableFilter<"Lead"> | string | null
    countryCode?: StringNullableFilter<"Lead"> | string | null
    referrer?: StringNullableFilter<"Lead"> | string | null
    browserName?: StringNullableFilter<"Lead"> | string | null
    browserVersion?: StringNullableFilter<"Lead"> | string | null
    os?: StringNullableFilter<"Lead"> | string | null
    mobile?: BoolNullableFilter<"Lead"> | boolean | null
    gclid?: StringNullableFilter<"Lead"> | string | null
    msclkid?: StringNullableFilter<"Lead"> | string | null
    created?: DateTimeFilter<"Lead"> | Date | string
    updated?: DateTimeFilter<"Lead"> | Date | string
    nonce?: BytesNullableFilter<"Lead"> | Bytes | null
    fbFields?: JsonNullableFilter<"Lead">
    marketingParameterSet?: XOR<MarketingParameterSetNullableScalarRelationFilter, MarketingParameterSetWhereInput> | null
    courses?: LeadsOnCoursesListRelationFilter
  }, "leadId">

  export type LeadOrderByWithAggregationInput = {
    leadId?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    schoolName?: SortOrder
    emailAddress?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    telephoneNumber?: SortOrderInput | SortOrder
    emailOptIn?: SortOrder
    smsOptIn?: SortOrder
    city?: SortOrderInput | SortOrder
    provinceCode?: SortOrderInput | SortOrder
    countryCode?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    browserName?: SortOrderInput | SortOrder
    browserVersion?: SortOrderInput | SortOrder
    os?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    gclid?: SortOrderInput | SortOrder
    msclkid?: SortOrderInput | SortOrder
    created?: SortOrder
    updated?: SortOrder
    nonce?: SortOrderInput | SortOrder
    fbFields?: SortOrderInput | SortOrder
    _count?: LeadCountOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    leadId?: BytesWithAggregatesFilter<"Lead"> | Bytes
    ipAddress?: BytesNullableWithAggregatesFilter<"Lead"> | Bytes | null
    schoolName?: StringWithAggregatesFilter<"Lead"> | string
    emailAddress?: StringWithAggregatesFilter<"Lead"> | string
    firstName?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    telephoneNumber?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    emailOptIn?: BoolWithAggregatesFilter<"Lead"> | boolean
    smsOptIn?: BoolWithAggregatesFilter<"Lead"> | boolean
    city?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    provinceCode?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    countryCode?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    referrer?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    browserName?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    browserVersion?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    os?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    mobile?: BoolNullableWithAggregatesFilter<"Lead"> | boolean | null
    gclid?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    msclkid?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    created?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    updated?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    nonce?: BytesNullableWithAggregatesFilter<"Lead"> | Bytes | null
    fbFields?: JsonNullableWithAggregatesFilter<"Lead">
  }

  export type LeadsOnCoursesWhereInput = {
    AND?: LeadsOnCoursesWhereInput | LeadsOnCoursesWhereInput[]
    OR?: LeadsOnCoursesWhereInput[]
    NOT?: LeadsOnCoursesWhereInput | LeadsOnCoursesWhereInput[]
    leadId?: BytesFilter<"LeadsOnCourses"> | Bytes
    courseCode?: StringFilter<"LeadsOnCourses"> | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }

  export type LeadsOnCoursesOrderByWithRelationInput = {
    leadId?: SortOrder
    courseCode?: SortOrder
    lead?: LeadOrderByWithRelationInput
    _relevance?: LeadsOnCoursesOrderByRelevanceInput
  }

  export type LeadsOnCoursesWhereUniqueInput = Prisma.AtLeast<{
    leadId_courseCode?: LeadsOnCoursesLeadIdCourseCodeCompoundUniqueInput
    AND?: LeadsOnCoursesWhereInput | LeadsOnCoursesWhereInput[]
    OR?: LeadsOnCoursesWhereInput[]
    NOT?: LeadsOnCoursesWhereInput | LeadsOnCoursesWhereInput[]
    leadId?: BytesFilter<"LeadsOnCourses"> | Bytes
    courseCode?: StringFilter<"LeadsOnCourses"> | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }, "leadId_courseCode">

  export type LeadsOnCoursesOrderByWithAggregationInput = {
    leadId?: SortOrder
    courseCode?: SortOrder
    _count?: LeadsOnCoursesCountOrderByAggregateInput
    _max?: LeadsOnCoursesMaxOrderByAggregateInput
    _min?: LeadsOnCoursesMinOrderByAggregateInput
  }

  export type LeadsOnCoursesScalarWhereWithAggregatesInput = {
    AND?: LeadsOnCoursesScalarWhereWithAggregatesInput | LeadsOnCoursesScalarWhereWithAggregatesInput[]
    OR?: LeadsOnCoursesScalarWhereWithAggregatesInput[]
    NOT?: LeadsOnCoursesScalarWhereWithAggregatesInput | LeadsOnCoursesScalarWhereWithAggregatesInput[]
    leadId?: BytesWithAggregatesFilter<"LeadsOnCourses"> | Bytes
    courseCode?: StringWithAggregatesFilter<"LeadsOnCourses"> | string
  }

  export type MarketingParameterSetWhereInput = {
    AND?: MarketingParameterSetWhereInput | MarketingParameterSetWhereInput[]
    OR?: MarketingParameterSetWhereInput[]
    NOT?: MarketingParameterSetWhereInput | MarketingParameterSetWhereInput[]
    leadId?: BytesFilter<"MarketingParameterSet"> | Bytes
    source?: StringNullableFilter<"MarketingParameterSet"> | string | null
    medium?: StringNullableFilter<"MarketingParameterSet"> | string | null
    campaign?: StringNullableFilter<"MarketingParameterSet"> | string | null
    content?: StringNullableFilter<"MarketingParameterSet"> | string | null
    term?: StringNullableFilter<"MarketingParameterSet"> | string | null
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }

  export type MarketingParameterSetOrderByWithRelationInput = {
    leadId?: SortOrder
    source?: SortOrderInput | SortOrder
    medium?: SortOrderInput | SortOrder
    campaign?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    term?: SortOrderInput | SortOrder
    lead?: LeadOrderByWithRelationInput
    _relevance?: MarketingParameterSetOrderByRelevanceInput
  }

  export type MarketingParameterSetWhereUniqueInput = Prisma.AtLeast<{
    leadId?: Bytes
    AND?: MarketingParameterSetWhereInput | MarketingParameterSetWhereInput[]
    OR?: MarketingParameterSetWhereInput[]
    NOT?: MarketingParameterSetWhereInput | MarketingParameterSetWhereInput[]
    source?: StringNullableFilter<"MarketingParameterSet"> | string | null
    medium?: StringNullableFilter<"MarketingParameterSet"> | string | null
    campaign?: StringNullableFilter<"MarketingParameterSet"> | string | null
    content?: StringNullableFilter<"MarketingParameterSet"> | string | null
    term?: StringNullableFilter<"MarketingParameterSet"> | string | null
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }, "leadId">

  export type MarketingParameterSetOrderByWithAggregationInput = {
    leadId?: SortOrder
    source?: SortOrderInput | SortOrder
    medium?: SortOrderInput | SortOrder
    campaign?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    term?: SortOrderInput | SortOrder
    _count?: MarketingParameterSetCountOrderByAggregateInput
    _max?: MarketingParameterSetMaxOrderByAggregateInput
    _min?: MarketingParameterSetMinOrderByAggregateInput
  }

  export type MarketingParameterSetScalarWhereWithAggregatesInput = {
    AND?: MarketingParameterSetScalarWhereWithAggregatesInput | MarketingParameterSetScalarWhereWithAggregatesInput[]
    OR?: MarketingParameterSetScalarWhereWithAggregatesInput[]
    NOT?: MarketingParameterSetScalarWhereWithAggregatesInput | MarketingParameterSetScalarWhereWithAggregatesInput[]
    leadId?: BytesWithAggregatesFilter<"MarketingParameterSet"> | Bytes
    source?: StringNullableWithAggregatesFilter<"MarketingParameterSet"> | string | null
    medium?: StringNullableWithAggregatesFilter<"MarketingParameterSet"> | string | null
    campaign?: StringNullableWithAggregatesFilter<"MarketingParameterSet"> | string | null
    content?: StringNullableWithAggregatesFilter<"MarketingParameterSet"> | string | null
    term?: StringNullableWithAggregatesFilter<"MarketingParameterSet"> | string | null
  }

  export type LeadCreateInput = {
    leadId: Bytes
    ipAddress?: Bytes | null
    schoolName: string
    emailAddress: string
    firstName?: string | null
    lastName?: string | null
    telephoneNumber?: string | null
    emailOptIn?: boolean
    smsOptIn?: boolean
    city?: string | null
    provinceCode?: string | null
    countryCode?: string | null
    referrer?: string | null
    browserName?: string | null
    browserVersion?: string | null
    os?: string | null
    mobile?: boolean | null
    gclid?: string | null
    msclkid?: string | null
    created?: Date | string
    updated?: Date | string
    nonce?: Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    marketingParameterSet?: MarketingParameterSetCreateNestedOneWithoutLeadInput
    courses?: LeadsOnCoursesCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateInput = {
    leadId: Bytes
    ipAddress?: Bytes | null
    schoolName: string
    emailAddress: string
    firstName?: string | null
    lastName?: string | null
    telephoneNumber?: string | null
    emailOptIn?: boolean
    smsOptIn?: boolean
    city?: string | null
    provinceCode?: string | null
    countryCode?: string | null
    referrer?: string | null
    browserName?: string | null
    browserVersion?: string | null
    os?: string | null
    mobile?: boolean | null
    gclid?: string | null
    msclkid?: string | null
    created?: Date | string
    updated?: Date | string
    nonce?: Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    marketingParameterSet?: MarketingParameterSetUncheckedCreateNestedOneWithoutLeadInput
    courses?: LeadsOnCoursesUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadUpdateInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    ipAddress?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    schoolName?: StringFieldUpdateOperationsInput | string
    emailAddress?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    telephoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    smsOptIn?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    provinceCode?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    browserName?: NullableStringFieldUpdateOperationsInput | string | null
    browserVersion?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    msclkid?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: DateTimeFieldUpdateOperationsInput | Date | string
    nonce?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    marketingParameterSet?: MarketingParameterSetUpdateOneWithoutLeadNestedInput
    courses?: LeadsOnCoursesUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    ipAddress?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    schoolName?: StringFieldUpdateOperationsInput | string
    emailAddress?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    telephoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    smsOptIn?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    provinceCode?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    browserName?: NullableStringFieldUpdateOperationsInput | string | null
    browserVersion?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    msclkid?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: DateTimeFieldUpdateOperationsInput | Date | string
    nonce?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    marketingParameterSet?: MarketingParameterSetUncheckedUpdateOneWithoutLeadNestedInput
    courses?: LeadsOnCoursesUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateManyInput = {
    leadId: Bytes
    ipAddress?: Bytes | null
    schoolName: string
    emailAddress: string
    firstName?: string | null
    lastName?: string | null
    telephoneNumber?: string | null
    emailOptIn?: boolean
    smsOptIn?: boolean
    city?: string | null
    provinceCode?: string | null
    countryCode?: string | null
    referrer?: string | null
    browserName?: string | null
    browserVersion?: string | null
    os?: string | null
    mobile?: boolean | null
    gclid?: string | null
    msclkid?: string | null
    created?: Date | string
    updated?: Date | string
    nonce?: Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LeadUpdateManyMutationInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    ipAddress?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    schoolName?: StringFieldUpdateOperationsInput | string
    emailAddress?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    telephoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    smsOptIn?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    provinceCode?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    browserName?: NullableStringFieldUpdateOperationsInput | string | null
    browserVersion?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    msclkid?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: DateTimeFieldUpdateOperationsInput | Date | string
    nonce?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LeadUncheckedUpdateManyInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    ipAddress?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    schoolName?: StringFieldUpdateOperationsInput | string
    emailAddress?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    telephoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    smsOptIn?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    provinceCode?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    browserName?: NullableStringFieldUpdateOperationsInput | string | null
    browserVersion?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    msclkid?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: DateTimeFieldUpdateOperationsInput | Date | string
    nonce?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LeadsOnCoursesCreateInput = {
    courseCode: string
    lead: LeadCreateNestedOneWithoutCoursesInput
  }

  export type LeadsOnCoursesUncheckedCreateInput = {
    leadId: Bytes
    courseCode: string
  }

  export type LeadsOnCoursesUpdateInput = {
    courseCode?: StringFieldUpdateOperationsInput | string
    lead?: LeadUpdateOneRequiredWithoutCoursesNestedInput
  }

  export type LeadsOnCoursesUncheckedUpdateInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    courseCode?: StringFieldUpdateOperationsInput | string
  }

  export type LeadsOnCoursesCreateManyInput = {
    leadId: Bytes
    courseCode: string
  }

  export type LeadsOnCoursesUpdateManyMutationInput = {
    courseCode?: StringFieldUpdateOperationsInput | string
  }

  export type LeadsOnCoursesUncheckedUpdateManyInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    courseCode?: StringFieldUpdateOperationsInput | string
  }

  export type MarketingParameterSetCreateInput = {
    source?: string | null
    medium?: string | null
    campaign?: string | null
    content?: string | null
    term?: string | null
    lead: LeadCreateNestedOneWithoutMarketingParameterSetInput
  }

  export type MarketingParameterSetUncheckedCreateInput = {
    leadId: Bytes
    source?: string | null
    medium?: string | null
    campaign?: string | null
    content?: string | null
    term?: string | null
  }

  export type MarketingParameterSetUpdateInput = {
    source?: NullableStringFieldUpdateOperationsInput | string | null
    medium?: NullableStringFieldUpdateOperationsInput | string | null
    campaign?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
    lead?: LeadUpdateOneRequiredWithoutMarketingParameterSetNestedInput
  }

  export type MarketingParameterSetUncheckedUpdateInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    source?: NullableStringFieldUpdateOperationsInput | string | null
    medium?: NullableStringFieldUpdateOperationsInput | string | null
    campaign?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarketingParameterSetCreateManyInput = {
    leadId: Bytes
    source?: string | null
    medium?: string | null
    campaign?: string | null
    content?: string | null
    term?: string | null
  }

  export type MarketingParameterSetUpdateManyMutationInput = {
    source?: NullableStringFieldUpdateOperationsInput | string | null
    medium?: NullableStringFieldUpdateOperationsInput | string | null
    campaign?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarketingParameterSetUncheckedUpdateManyInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    source?: NullableStringFieldUpdateOperationsInput | string | null
    medium?: NullableStringFieldUpdateOperationsInput | string | null
    campaign?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BytesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[]
    notIn?: Bytes[]
    not?: NestedBytesFilter<$PrismaModel> | Bytes
  }

  export type BytesNullableFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | null
    notIn?: Bytes[] | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Bytes | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MarketingParameterSetNullableScalarRelationFilter = {
    is?: MarketingParameterSetWhereInput | null
    isNot?: MarketingParameterSetWhereInput | null
  }

  export type LeadsOnCoursesListRelationFilter = {
    every?: LeadsOnCoursesWhereInput
    some?: LeadsOnCoursesWhereInput
    none?: LeadsOnCoursesWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LeadsOnCoursesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadOrderByRelevanceInput = {
    fields: LeadOrderByRelevanceFieldEnum | LeadOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type LeadCountOrderByAggregateInput = {
    leadId?: SortOrder
    ipAddress?: SortOrder
    schoolName?: SortOrder
    emailAddress?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    telephoneNumber?: SortOrder
    emailOptIn?: SortOrder
    smsOptIn?: SortOrder
    city?: SortOrder
    provinceCode?: SortOrder
    countryCode?: SortOrder
    referrer?: SortOrder
    browserName?: SortOrder
    browserVersion?: SortOrder
    os?: SortOrder
    mobile?: SortOrder
    gclid?: SortOrder
    msclkid?: SortOrder
    created?: SortOrder
    updated?: SortOrder
    nonce?: SortOrder
    fbFields?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    leadId?: SortOrder
    ipAddress?: SortOrder
    schoolName?: SortOrder
    emailAddress?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    telephoneNumber?: SortOrder
    emailOptIn?: SortOrder
    smsOptIn?: SortOrder
    city?: SortOrder
    provinceCode?: SortOrder
    countryCode?: SortOrder
    referrer?: SortOrder
    browserName?: SortOrder
    browserVersion?: SortOrder
    os?: SortOrder
    mobile?: SortOrder
    gclid?: SortOrder
    msclkid?: SortOrder
    created?: SortOrder
    updated?: SortOrder
    nonce?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    leadId?: SortOrder
    ipAddress?: SortOrder
    schoolName?: SortOrder
    emailAddress?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    telephoneNumber?: SortOrder
    emailOptIn?: SortOrder
    smsOptIn?: SortOrder
    city?: SortOrder
    provinceCode?: SortOrder
    countryCode?: SortOrder
    referrer?: SortOrder
    browserName?: SortOrder
    browserVersion?: SortOrder
    os?: SortOrder
    mobile?: SortOrder
    gclid?: SortOrder
    msclkid?: SortOrder
    created?: SortOrder
    updated?: SortOrder
    nonce?: SortOrder
  }

  export type BytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[]
    notIn?: Bytes[]
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Bytes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type BytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | null
    notIn?: Bytes[] | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Bytes | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type LeadScalarRelationFilter = {
    is?: LeadWhereInput
    isNot?: LeadWhereInput
  }

  export type LeadsOnCoursesOrderByRelevanceInput = {
    fields: LeadsOnCoursesOrderByRelevanceFieldEnum | LeadsOnCoursesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type LeadsOnCoursesLeadIdCourseCodeCompoundUniqueInput = {
    leadId: Bytes
    courseCode: string
  }

  export type LeadsOnCoursesCountOrderByAggregateInput = {
    leadId?: SortOrder
    courseCode?: SortOrder
  }

  export type LeadsOnCoursesMaxOrderByAggregateInput = {
    leadId?: SortOrder
    courseCode?: SortOrder
  }

  export type LeadsOnCoursesMinOrderByAggregateInput = {
    leadId?: SortOrder
    courseCode?: SortOrder
  }

  export type MarketingParameterSetOrderByRelevanceInput = {
    fields: MarketingParameterSetOrderByRelevanceFieldEnum | MarketingParameterSetOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MarketingParameterSetCountOrderByAggregateInput = {
    leadId?: SortOrder
    source?: SortOrder
    medium?: SortOrder
    campaign?: SortOrder
    content?: SortOrder
    term?: SortOrder
  }

  export type MarketingParameterSetMaxOrderByAggregateInput = {
    leadId?: SortOrder
    source?: SortOrder
    medium?: SortOrder
    campaign?: SortOrder
    content?: SortOrder
    term?: SortOrder
  }

  export type MarketingParameterSetMinOrderByAggregateInput = {
    leadId?: SortOrder
    source?: SortOrder
    medium?: SortOrder
    campaign?: SortOrder
    content?: SortOrder
    term?: SortOrder
  }

  export type MarketingParameterSetCreateNestedOneWithoutLeadInput = {
    create?: XOR<MarketingParameterSetCreateWithoutLeadInput, MarketingParameterSetUncheckedCreateWithoutLeadInput>
    connectOrCreate?: MarketingParameterSetCreateOrConnectWithoutLeadInput
    connect?: MarketingParameterSetWhereUniqueInput
  }

  export type LeadsOnCoursesCreateNestedManyWithoutLeadInput = {
    create?: XOR<LeadsOnCoursesCreateWithoutLeadInput, LeadsOnCoursesUncheckedCreateWithoutLeadInput> | LeadsOnCoursesCreateWithoutLeadInput[] | LeadsOnCoursesUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadsOnCoursesCreateOrConnectWithoutLeadInput | LeadsOnCoursesCreateOrConnectWithoutLeadInput[]
    createMany?: LeadsOnCoursesCreateManyLeadInputEnvelope
    connect?: LeadsOnCoursesWhereUniqueInput | LeadsOnCoursesWhereUniqueInput[]
  }

  export type MarketingParameterSetUncheckedCreateNestedOneWithoutLeadInput = {
    create?: XOR<MarketingParameterSetCreateWithoutLeadInput, MarketingParameterSetUncheckedCreateWithoutLeadInput>
    connectOrCreate?: MarketingParameterSetCreateOrConnectWithoutLeadInput
    connect?: MarketingParameterSetWhereUniqueInput
  }

  export type LeadsOnCoursesUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<LeadsOnCoursesCreateWithoutLeadInput, LeadsOnCoursesUncheckedCreateWithoutLeadInput> | LeadsOnCoursesCreateWithoutLeadInput[] | LeadsOnCoursesUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadsOnCoursesCreateOrConnectWithoutLeadInput | LeadsOnCoursesCreateOrConnectWithoutLeadInput[]
    createMany?: LeadsOnCoursesCreateManyLeadInputEnvelope
    connect?: LeadsOnCoursesWhereUniqueInput | LeadsOnCoursesWhereUniqueInput[]
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Bytes
  }

  export type NullableBytesFieldUpdateOperationsInput = {
    set?: Bytes | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MarketingParameterSetUpdateOneWithoutLeadNestedInput = {
    create?: XOR<MarketingParameterSetCreateWithoutLeadInput, MarketingParameterSetUncheckedCreateWithoutLeadInput>
    connectOrCreate?: MarketingParameterSetCreateOrConnectWithoutLeadInput
    upsert?: MarketingParameterSetUpsertWithoutLeadInput
    disconnect?: MarketingParameterSetWhereInput | boolean
    delete?: MarketingParameterSetWhereInput | boolean
    connect?: MarketingParameterSetWhereUniqueInput
    update?: XOR<XOR<MarketingParameterSetUpdateToOneWithWhereWithoutLeadInput, MarketingParameterSetUpdateWithoutLeadInput>, MarketingParameterSetUncheckedUpdateWithoutLeadInput>
  }

  export type LeadsOnCoursesUpdateManyWithoutLeadNestedInput = {
    create?: XOR<LeadsOnCoursesCreateWithoutLeadInput, LeadsOnCoursesUncheckedCreateWithoutLeadInput> | LeadsOnCoursesCreateWithoutLeadInput[] | LeadsOnCoursesUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadsOnCoursesCreateOrConnectWithoutLeadInput | LeadsOnCoursesCreateOrConnectWithoutLeadInput[]
    upsert?: LeadsOnCoursesUpsertWithWhereUniqueWithoutLeadInput | LeadsOnCoursesUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: LeadsOnCoursesCreateManyLeadInputEnvelope
    set?: LeadsOnCoursesWhereUniqueInput | LeadsOnCoursesWhereUniqueInput[]
    disconnect?: LeadsOnCoursesWhereUniqueInput | LeadsOnCoursesWhereUniqueInput[]
    delete?: LeadsOnCoursesWhereUniqueInput | LeadsOnCoursesWhereUniqueInput[]
    connect?: LeadsOnCoursesWhereUniqueInput | LeadsOnCoursesWhereUniqueInput[]
    update?: LeadsOnCoursesUpdateWithWhereUniqueWithoutLeadInput | LeadsOnCoursesUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: LeadsOnCoursesUpdateManyWithWhereWithoutLeadInput | LeadsOnCoursesUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: LeadsOnCoursesScalarWhereInput | LeadsOnCoursesScalarWhereInput[]
  }

  export type MarketingParameterSetUncheckedUpdateOneWithoutLeadNestedInput = {
    create?: XOR<MarketingParameterSetCreateWithoutLeadInput, MarketingParameterSetUncheckedCreateWithoutLeadInput>
    connectOrCreate?: MarketingParameterSetCreateOrConnectWithoutLeadInput
    upsert?: MarketingParameterSetUpsertWithoutLeadInput
    disconnect?: MarketingParameterSetWhereInput | boolean
    delete?: MarketingParameterSetWhereInput | boolean
    connect?: MarketingParameterSetWhereUniqueInput
    update?: XOR<XOR<MarketingParameterSetUpdateToOneWithWhereWithoutLeadInput, MarketingParameterSetUpdateWithoutLeadInput>, MarketingParameterSetUncheckedUpdateWithoutLeadInput>
  }

  export type LeadsOnCoursesUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<LeadsOnCoursesCreateWithoutLeadInput, LeadsOnCoursesUncheckedCreateWithoutLeadInput> | LeadsOnCoursesCreateWithoutLeadInput[] | LeadsOnCoursesUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadsOnCoursesCreateOrConnectWithoutLeadInput | LeadsOnCoursesCreateOrConnectWithoutLeadInput[]
    upsert?: LeadsOnCoursesUpsertWithWhereUniqueWithoutLeadInput | LeadsOnCoursesUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: LeadsOnCoursesCreateManyLeadInputEnvelope
    set?: LeadsOnCoursesWhereUniqueInput | LeadsOnCoursesWhereUniqueInput[]
    disconnect?: LeadsOnCoursesWhereUniqueInput | LeadsOnCoursesWhereUniqueInput[]
    delete?: LeadsOnCoursesWhereUniqueInput | LeadsOnCoursesWhereUniqueInput[]
    connect?: LeadsOnCoursesWhereUniqueInput | LeadsOnCoursesWhereUniqueInput[]
    update?: LeadsOnCoursesUpdateWithWhereUniqueWithoutLeadInput | LeadsOnCoursesUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: LeadsOnCoursesUpdateManyWithWhereWithoutLeadInput | LeadsOnCoursesUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: LeadsOnCoursesScalarWhereInput | LeadsOnCoursesScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutCoursesInput = {
    create?: XOR<LeadCreateWithoutCoursesInput, LeadUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutCoursesInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutCoursesNestedInput = {
    create?: XOR<LeadCreateWithoutCoursesInput, LeadUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutCoursesInput
    upsert?: LeadUpsertWithoutCoursesInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutCoursesInput, LeadUpdateWithoutCoursesInput>, LeadUncheckedUpdateWithoutCoursesInput>
  }

  export type LeadCreateNestedOneWithoutMarketingParameterSetInput = {
    create?: XOR<LeadCreateWithoutMarketingParameterSetInput, LeadUncheckedCreateWithoutMarketingParameterSetInput>
    connectOrCreate?: LeadCreateOrConnectWithoutMarketingParameterSetInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutMarketingParameterSetNestedInput = {
    create?: XOR<LeadCreateWithoutMarketingParameterSetInput, LeadUncheckedCreateWithoutMarketingParameterSetInput>
    connectOrCreate?: LeadCreateOrConnectWithoutMarketingParameterSetInput
    upsert?: LeadUpsertWithoutMarketingParameterSetInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutMarketingParameterSetInput, LeadUpdateWithoutMarketingParameterSetInput>, LeadUncheckedUpdateWithoutMarketingParameterSetInput>
  }

  export type NestedBytesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[]
    notIn?: Bytes[]
    not?: NestedBytesFilter<$PrismaModel> | Bytes
  }

  export type NestedBytesNullableFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | null
    notIn?: Bytes[] | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Bytes | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[]
    notIn?: Bytes[]
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Bytes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | null
    notIn?: Bytes[] | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Bytes | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MarketingParameterSetCreateWithoutLeadInput = {
    source?: string | null
    medium?: string | null
    campaign?: string | null
    content?: string | null
    term?: string | null
  }

  export type MarketingParameterSetUncheckedCreateWithoutLeadInput = {
    source?: string | null
    medium?: string | null
    campaign?: string | null
    content?: string | null
    term?: string | null
  }

  export type MarketingParameterSetCreateOrConnectWithoutLeadInput = {
    where: MarketingParameterSetWhereUniqueInput
    create: XOR<MarketingParameterSetCreateWithoutLeadInput, MarketingParameterSetUncheckedCreateWithoutLeadInput>
  }

  export type LeadsOnCoursesCreateWithoutLeadInput = {
    courseCode: string
  }

  export type LeadsOnCoursesUncheckedCreateWithoutLeadInput = {
    courseCode: string
  }

  export type LeadsOnCoursesCreateOrConnectWithoutLeadInput = {
    where: LeadsOnCoursesWhereUniqueInput
    create: XOR<LeadsOnCoursesCreateWithoutLeadInput, LeadsOnCoursesUncheckedCreateWithoutLeadInput>
  }

  export type LeadsOnCoursesCreateManyLeadInputEnvelope = {
    data: LeadsOnCoursesCreateManyLeadInput | LeadsOnCoursesCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type MarketingParameterSetUpsertWithoutLeadInput = {
    update: XOR<MarketingParameterSetUpdateWithoutLeadInput, MarketingParameterSetUncheckedUpdateWithoutLeadInput>
    create: XOR<MarketingParameterSetCreateWithoutLeadInput, MarketingParameterSetUncheckedCreateWithoutLeadInput>
    where?: MarketingParameterSetWhereInput
  }

  export type MarketingParameterSetUpdateToOneWithWhereWithoutLeadInput = {
    where?: MarketingParameterSetWhereInput
    data: XOR<MarketingParameterSetUpdateWithoutLeadInput, MarketingParameterSetUncheckedUpdateWithoutLeadInput>
  }

  export type MarketingParameterSetUpdateWithoutLeadInput = {
    source?: NullableStringFieldUpdateOperationsInput | string | null
    medium?: NullableStringFieldUpdateOperationsInput | string | null
    campaign?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarketingParameterSetUncheckedUpdateWithoutLeadInput = {
    source?: NullableStringFieldUpdateOperationsInput | string | null
    medium?: NullableStringFieldUpdateOperationsInput | string | null
    campaign?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    term?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadsOnCoursesUpsertWithWhereUniqueWithoutLeadInput = {
    where: LeadsOnCoursesWhereUniqueInput
    update: XOR<LeadsOnCoursesUpdateWithoutLeadInput, LeadsOnCoursesUncheckedUpdateWithoutLeadInput>
    create: XOR<LeadsOnCoursesCreateWithoutLeadInput, LeadsOnCoursesUncheckedCreateWithoutLeadInput>
  }

  export type LeadsOnCoursesUpdateWithWhereUniqueWithoutLeadInput = {
    where: LeadsOnCoursesWhereUniqueInput
    data: XOR<LeadsOnCoursesUpdateWithoutLeadInput, LeadsOnCoursesUncheckedUpdateWithoutLeadInput>
  }

  export type LeadsOnCoursesUpdateManyWithWhereWithoutLeadInput = {
    where: LeadsOnCoursesScalarWhereInput
    data: XOR<LeadsOnCoursesUpdateManyMutationInput, LeadsOnCoursesUncheckedUpdateManyWithoutLeadInput>
  }

  export type LeadsOnCoursesScalarWhereInput = {
    AND?: LeadsOnCoursesScalarWhereInput | LeadsOnCoursesScalarWhereInput[]
    OR?: LeadsOnCoursesScalarWhereInput[]
    NOT?: LeadsOnCoursesScalarWhereInput | LeadsOnCoursesScalarWhereInput[]
    leadId?: BytesFilter<"LeadsOnCourses"> | Bytes
    courseCode?: StringFilter<"LeadsOnCourses"> | string
  }

  export type LeadCreateWithoutCoursesInput = {
    leadId: Bytes
    ipAddress?: Bytes | null
    schoolName: string
    emailAddress: string
    firstName?: string | null
    lastName?: string | null
    telephoneNumber?: string | null
    emailOptIn?: boolean
    smsOptIn?: boolean
    city?: string | null
    provinceCode?: string | null
    countryCode?: string | null
    referrer?: string | null
    browserName?: string | null
    browserVersion?: string | null
    os?: string | null
    mobile?: boolean | null
    gclid?: string | null
    msclkid?: string | null
    created?: Date | string
    updated?: Date | string
    nonce?: Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    marketingParameterSet?: MarketingParameterSetCreateNestedOneWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutCoursesInput = {
    leadId: Bytes
    ipAddress?: Bytes | null
    schoolName: string
    emailAddress: string
    firstName?: string | null
    lastName?: string | null
    telephoneNumber?: string | null
    emailOptIn?: boolean
    smsOptIn?: boolean
    city?: string | null
    provinceCode?: string | null
    countryCode?: string | null
    referrer?: string | null
    browserName?: string | null
    browserVersion?: string | null
    os?: string | null
    mobile?: boolean | null
    gclid?: string | null
    msclkid?: string | null
    created?: Date | string
    updated?: Date | string
    nonce?: Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    marketingParameterSet?: MarketingParameterSetUncheckedCreateNestedOneWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutCoursesInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutCoursesInput, LeadUncheckedCreateWithoutCoursesInput>
  }

  export type LeadUpsertWithoutCoursesInput = {
    update: XOR<LeadUpdateWithoutCoursesInput, LeadUncheckedUpdateWithoutCoursesInput>
    create: XOR<LeadCreateWithoutCoursesInput, LeadUncheckedCreateWithoutCoursesInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutCoursesInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutCoursesInput, LeadUncheckedUpdateWithoutCoursesInput>
  }

  export type LeadUpdateWithoutCoursesInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    ipAddress?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    schoolName?: StringFieldUpdateOperationsInput | string
    emailAddress?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    telephoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    smsOptIn?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    provinceCode?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    browserName?: NullableStringFieldUpdateOperationsInput | string | null
    browserVersion?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    msclkid?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: DateTimeFieldUpdateOperationsInput | Date | string
    nonce?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    marketingParameterSet?: MarketingParameterSetUpdateOneWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutCoursesInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    ipAddress?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    schoolName?: StringFieldUpdateOperationsInput | string
    emailAddress?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    telephoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    smsOptIn?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    provinceCode?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    browserName?: NullableStringFieldUpdateOperationsInput | string | null
    browserVersion?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    msclkid?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: DateTimeFieldUpdateOperationsInput | Date | string
    nonce?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    marketingParameterSet?: MarketingParameterSetUncheckedUpdateOneWithoutLeadNestedInput
  }

  export type LeadCreateWithoutMarketingParameterSetInput = {
    leadId: Bytes
    ipAddress?: Bytes | null
    schoolName: string
    emailAddress: string
    firstName?: string | null
    lastName?: string | null
    telephoneNumber?: string | null
    emailOptIn?: boolean
    smsOptIn?: boolean
    city?: string | null
    provinceCode?: string | null
    countryCode?: string | null
    referrer?: string | null
    browserName?: string | null
    browserVersion?: string | null
    os?: string | null
    mobile?: boolean | null
    gclid?: string | null
    msclkid?: string | null
    created?: Date | string
    updated?: Date | string
    nonce?: Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    courses?: LeadsOnCoursesCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutMarketingParameterSetInput = {
    leadId: Bytes
    ipAddress?: Bytes | null
    schoolName: string
    emailAddress: string
    firstName?: string | null
    lastName?: string | null
    telephoneNumber?: string | null
    emailOptIn?: boolean
    smsOptIn?: boolean
    city?: string | null
    provinceCode?: string | null
    countryCode?: string | null
    referrer?: string | null
    browserName?: string | null
    browserVersion?: string | null
    os?: string | null
    mobile?: boolean | null
    gclid?: string | null
    msclkid?: string | null
    created?: Date | string
    updated?: Date | string
    nonce?: Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    courses?: LeadsOnCoursesUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutMarketingParameterSetInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutMarketingParameterSetInput, LeadUncheckedCreateWithoutMarketingParameterSetInput>
  }

  export type LeadUpsertWithoutMarketingParameterSetInput = {
    update: XOR<LeadUpdateWithoutMarketingParameterSetInput, LeadUncheckedUpdateWithoutMarketingParameterSetInput>
    create: XOR<LeadCreateWithoutMarketingParameterSetInput, LeadUncheckedCreateWithoutMarketingParameterSetInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutMarketingParameterSetInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutMarketingParameterSetInput, LeadUncheckedUpdateWithoutMarketingParameterSetInput>
  }

  export type LeadUpdateWithoutMarketingParameterSetInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    ipAddress?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    schoolName?: StringFieldUpdateOperationsInput | string
    emailAddress?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    telephoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    smsOptIn?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    provinceCode?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    browserName?: NullableStringFieldUpdateOperationsInput | string | null
    browserVersion?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    msclkid?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: DateTimeFieldUpdateOperationsInput | Date | string
    nonce?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    courses?: LeadsOnCoursesUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutMarketingParameterSetInput = {
    leadId?: BytesFieldUpdateOperationsInput | Bytes
    ipAddress?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    schoolName?: StringFieldUpdateOperationsInput | string
    emailAddress?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    telephoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    smsOptIn?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    provinceCode?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    browserName?: NullableStringFieldUpdateOperationsInput | string | null
    browserVersion?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    msclkid?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: DateTimeFieldUpdateOperationsInput | Date | string
    nonce?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    fbFields?: NullableJsonNullValueInput | InputJsonValue
    courses?: LeadsOnCoursesUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadsOnCoursesCreateManyLeadInput = {
    courseCode: string
  }

  export type LeadsOnCoursesUpdateWithoutLeadInput = {
    courseCode?: StringFieldUpdateOperationsInput | string
  }

  export type LeadsOnCoursesUncheckedUpdateWithoutLeadInput = {
    courseCode?: StringFieldUpdateOperationsInput | string
  }

  export type LeadsOnCoursesUncheckedUpdateManyWithoutLeadInput = {
    courseCode?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}