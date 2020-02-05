// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {
  APICallback,
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  PaginationCallback,
  PaginationResponse,
} from 'google-gax';
import * as path from 'path';

import {Transform} from 'stream';
import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './container_analysis_v1_beta1_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Retrieves analysis results of Cloud components such as Docker container
 *  images. The Container Analysis API is an implementation of the
 *  [Grafeas](https://https://https://grafeas.io) API.
 *
 *  Analysis results are stored as a series of occurrences. An `Occurrence`
 *  contains information about a specific analysis instance on a resource. An
 *  occurrence refers to a `Note`. A note contains details describing the
 *  analysis and is generally stored in a separate project, called a `Provider`.
 *  Multiple occurrences can refer to the same note.
 *
 *  For example, an SSL vulnerability could affect multiple images. In this case,
 *  there would be one note for the vulnerability and an occurrence for each
 *  image with the vulnerability referring to that note.
 * @class
 * @memberof v1beta1
 */
export class ContainerAnalysisV1Beta1Client {
  private _descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}};
  private _innerApiCalls: {[name: string]: Function};
  private _pathTemplates: {[name: string]: gax.PathTemplate};
  private _terminated = false;
  auth: gax.GoogleAuth;
  containerAnalysisV1Beta1Stub: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of ContainerAnalysisV1Beta1Client.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {function} [options.promise] - Custom promise module to use instead
   *     of native Promises.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this
      .constructor as typeof ContainerAnalysisV1Beta1Client;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    const gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this
      .constructor as typeof ContainerAnalysisV1Beta1Client).scopes;
    const gaxGrpc = new gaxModule.GrpcClient(opts);

    // Save the auth object to the client, for use by other methods.
    this.auth = gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    const protos = gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      scanConfigPathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/scanConfigs/{scan_config}'
      ),
      occurrencePathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/occurrences/{occurrence}'
      ),
      notePathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/notes/{note}'
      ),
      projectPathTemplate: new gaxModule.PathTemplate('projects/{project}'),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this._descriptors.page = {
      listScanConfigs: new gaxModule.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'scanConfigs'
      ),
    };

    // Put together the default options sent with requests.
    const defaults = gaxGrpc.constructSettings(
      'google.devtools.containeranalysis.v1beta1.ContainerAnalysisV1Beta1',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.devtools.containeranalysis.v1beta1.ContainerAnalysisV1Beta1.
    this.containerAnalysisV1Beta1Stub = gaxGrpc.createStub(
      opts.fallback
        ? (protos as protobuf.Root).lookupService(
            'google.devtools.containeranalysis.v1beta1.ContainerAnalysisV1Beta1'
          )
        : // tslint:disable-next-line no-any
          (protos as any).google.devtools.containeranalysis.v1beta1
            .ContainerAnalysisV1Beta1,
      opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const containerAnalysisV1Beta1StubMethods = [
      'setIamPolicy',
      'getIamPolicy',
      'testIamPermissions',
      'getScanConfig',
      'listScanConfigs',
      'updateScanConfig',
    ];

    for (const methodName of containerAnalysisV1Beta1StubMethods) {
      const innerCallPromise = this.containerAnalysisV1Beta1Stub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          return stub[methodName].apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = gaxModule.createApiCall(
        innerCallPromise,
        defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.stream[methodName] ||
          this._descriptors.longrunning[methodName]
      );

      this._innerApiCalls[methodName] = (
        argument: {},
        callOptions?: CallOptions,
        callback?: APICallback
      ) => {
        return apiCall(argument, callOptions, callback);
      };
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'containeranalysis.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'containeranalysis.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  setIamPolicy(
    request: protosTypes.google.iam.v1.ISetIamPolicyRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.iam.v1.IPolicy,
      protosTypes.google.iam.v1.ISetIamPolicyRequest | undefined,
      {} | undefined
    ]
  >;
  setIamPolicy(
    request: protosTypes.google.iam.v1.ISetIamPolicyRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.iam.v1.IPolicy,
      protosTypes.google.iam.v1.ISetIamPolicyRequest | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Sets the access control policy on the specified note or occurrence.
   * Requires `containeranalysis.notes.setIamPolicy` or
   * `containeranalysis.occurrences.setIamPolicy` permission if the resource is
   * a note or an occurrence, respectively.
   *
   * The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for
   * notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for
   * occurrences.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Policy]{@link google.iam.v1.Policy}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  setIamPolicy(
    request: protosTypes.google.iam.v1.ISetIamPolicyRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.iam.v1.IPolicy,
          protosTypes.google.iam.v1.ISetIamPolicyRequest | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.iam.v1.IPolicy,
      protosTypes.google.iam.v1.ISetIamPolicyRequest | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.iam.v1.IPolicy,
      protosTypes.google.iam.v1.ISetIamPolicyRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      resource: request.resource || '',
    });
    return this._innerApiCalls.setIamPolicy(request, options, callback);
  }
  getIamPolicy(
    request: protosTypes.google.iam.v1.IGetIamPolicyRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.iam.v1.IPolicy,
      protosTypes.google.iam.v1.IGetIamPolicyRequest | undefined,
      {} | undefined
    ]
  >;
  getIamPolicy(
    request: protosTypes.google.iam.v1.IGetIamPolicyRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.iam.v1.IPolicy,
      protosTypes.google.iam.v1.IGetIamPolicyRequest | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Gets the access control policy for a note or an occurrence resource.
   * Requires `containeranalysis.notes.setIamPolicy` or
   * `containeranalysis.occurrences.setIamPolicy` permission if the resource is
   * a note or occurrence, respectively.
   *
   * The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for
   * notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for
   * occurrences.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Policy]{@link google.iam.v1.Policy}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  getIamPolicy(
    request: protosTypes.google.iam.v1.IGetIamPolicyRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.iam.v1.IPolicy,
          protosTypes.google.iam.v1.IGetIamPolicyRequest | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.iam.v1.IPolicy,
      protosTypes.google.iam.v1.IGetIamPolicyRequest | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.iam.v1.IPolicy,
      protosTypes.google.iam.v1.IGetIamPolicyRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      resource: request.resource || '',
    });
    return this._innerApiCalls.getIamPolicy(request, options, callback);
  }
  testIamPermissions(
    request: protosTypes.google.iam.v1.ITestIamPermissionsRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.iam.v1.ITestIamPermissionsResponse,
      protosTypes.google.iam.v1.ITestIamPermissionsRequest | undefined,
      {} | undefined
    ]
  >;
  testIamPermissions(
    request: protosTypes.google.iam.v1.ITestIamPermissionsRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.iam.v1.ITestIamPermissionsResponse,
      protosTypes.google.iam.v1.ITestIamPermissionsRequest | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Returns the permissions that a caller has on the specified note or
   * occurrence. Requires list permission on the project (for example,
   * `containeranalysis.notes.list`).
   *
   * The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for
   * notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for
   * occurrences.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [TestIamPermissionsResponse]{@link google.iam.v1.TestIamPermissionsResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  testIamPermissions(
    request: protosTypes.google.iam.v1.ITestIamPermissionsRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.iam.v1.ITestIamPermissionsResponse,
          protosTypes.google.iam.v1.ITestIamPermissionsRequest | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.iam.v1.ITestIamPermissionsResponse,
      protosTypes.google.iam.v1.ITestIamPermissionsRequest | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.iam.v1.ITestIamPermissionsResponse,
      protosTypes.google.iam.v1.ITestIamPermissionsRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      resource: request.resource || '',
    });
    return this._innerApiCalls.testIamPermissions(request, options, callback);
  }
  getScanConfig(
    request: protosTypes.google.devtools.containeranalysis.v1beta1.IGetScanConfigRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig,
      (
        | protosTypes.google.devtools.containeranalysis.v1beta1.IGetScanConfigRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  getScanConfig(
    request: protosTypes.google.devtools.containeranalysis.v1beta1.IGetScanConfigRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig,
      | protosTypes.google.devtools.containeranalysis.v1beta1.IGetScanConfigRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Gets the specified scan configuration.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the scan configuration in the form of
   *   `projects/[PROJECT_ID]/scanConfigs/[SCAN_CONFIG_ID]`.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ScanConfig]{@link google.devtools.containeranalysis.v1beta1.ScanConfig}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  getScanConfig(
    request: protosTypes.google.devtools.containeranalysis.v1beta1.IGetScanConfigRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig,
          | protosTypes.google.devtools.containeranalysis.v1beta1.IGetScanConfigRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig,
      | protosTypes.google.devtools.containeranalysis.v1beta1.IGetScanConfigRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig,
      (
        | protosTypes.google.devtools.containeranalysis.v1beta1.IGetScanConfigRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    return this._innerApiCalls.getScanConfig(request, options, callback);
  }
  updateScanConfig(
    request: protosTypes.google.devtools.containeranalysis.v1beta1.IUpdateScanConfigRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig,
      (
        | protosTypes.google.devtools.containeranalysis.v1beta1.IUpdateScanConfigRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  updateScanConfig(
    request: protosTypes.google.devtools.containeranalysis.v1beta1.IUpdateScanConfigRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig,
      | protosTypes.google.devtools.containeranalysis.v1beta1.IUpdateScanConfigRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Updates the specified scan configuration.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the scan configuration in the form of
   *   `projects/[PROJECT_ID]/scanConfigs/[SCAN_CONFIG_ID]`.
   * @param {google.devtools.containeranalysis.v1beta1.ScanConfig} request.scanConfig
   *   Required. The updated scan configuration.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ScanConfig]{@link google.devtools.containeranalysis.v1beta1.ScanConfig}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  updateScanConfig(
    request: protosTypes.google.devtools.containeranalysis.v1beta1.IUpdateScanConfigRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig,
          | protosTypes.google.devtools.containeranalysis.v1beta1.IUpdateScanConfigRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig,
      | protosTypes.google.devtools.containeranalysis.v1beta1.IUpdateScanConfigRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig,
      (
        | protosTypes.google.devtools.containeranalysis.v1beta1.IUpdateScanConfigRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    return this._innerApiCalls.updateScanConfig(request, options, callback);
  }

  listScanConfigs(
    request: protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig[],
      protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsRequest | null,
      protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsResponse
    ]
  >;
  listScanConfigs(
    request: protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig[],
      protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsRequest | null,
      protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsResponse
    >
  ): void;
  /**
   * Lists scan configurations for the specified project.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The name of the project to list scan configurations for in the form of
   *   `projects/[PROJECT_ID]`.
   * @param {string} request.filter
   *   Required. The filter expression.
   * @param {number} request.pageSize
   *   The number of scan configs to return in the list.
   * @param {string} request.pageToken
   *   Token to provide to skip to a particular spot in the list.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is Array of [ScanConfig]{@link google.devtools.containeranalysis.v1beta1.ScanConfig}.
   *   The client library support auto-pagination by default: it will call the API as many
   *   times as needed and will merge results from all the pages into this array.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [ScanConfig]{@link google.devtools.containeranalysis.v1beta1.ScanConfig} that corresponds to
   *   the one page received from the API server.
   *   If the second element is not null it contains the request object of type [ListScanConfigsRequest]{@link google.devtools.containeranalysis.v1beta1.ListScanConfigsRequest}
   *   that can be used to obtain the next page of the results.
   *   If it is null, the next page does not exist.
   *   The third element contains the raw response received from the API server. Its type is
   *   [ListScanConfigsResponse]{@link google.devtools.containeranalysis.v1beta1.ListScanConfigsResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  listScanConfigs(
    request: protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig[],
          protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsRequest | null,
          protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsResponse
        >,
    callback?: Callback<
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig[],
      protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsRequest | null,
      protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsResponse
    >
  ): Promise<
    [
      protosTypes.google.devtools.containeranalysis.v1beta1.IScanConfig[],
      protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsRequest | null,
      protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsResponse
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    return this._innerApiCalls.listScanConfigs(request, options, callback);
  }

  /**
   * Equivalent to {@link listScanConfigs}, but returns a NodeJS Stream object.
   *
   * This fetches the paged responses for {@link listScanConfigs} continuously
   * and invokes the callback registered for 'data' event for each element in the
   * responses.
   *
   * The returned object has 'end' method when no more elements are required.
   *
   * autoPaginate option will be ignored.
   *
   * @see {@link https://nodejs.org/api/stream.html}
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The name of the project to list scan configurations for in the form of
   *   `projects/[PROJECT_ID]`.
   * @param {string} request.filter
   *   Required. The filter expression.
   * @param {number} request.pageSize
   *   The number of scan configs to return in the list.
   * @param {string} request.pageToken
   *   Token to provide to skip to a particular spot in the list.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Stream}
   *   An object stream which emits an object representing [ScanConfig]{@link google.devtools.containeranalysis.v1beta1.ScanConfig} on 'data' event.
   */
  listScanConfigsStream(
    request?: protosTypes.google.devtools.containeranalysis.v1beta1.IListScanConfigsRequest,
    options?: gax.CallOptions | {}
  ): Transform {
    request = request || {};
    const callSettings = new gax.CallSettings(options);
    return this._descriptors.page.listScanConfigs.createStream(
      this._innerApiCalls.listScanConfigs as gax.GaxCall,
      request,
      callSettings
    );
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified scanConfig resource name string.
   *
   * @param {string} project
   * @param {string} scan_config
   * @returns {string} Resource name string.
   */
  scanConfigPath(project: string, scanConfig: string) {
    return this._pathTemplates.scanConfigPathTemplate.render({
      project,
      scan_config: scanConfig,
    });
  }

  /**
   * Parse the project from ScanConfig resource.
   *
   * @param {string} scanConfigName
   *   A fully-qualified path representing ScanConfig resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromScanConfigName(scanConfigName: string) {
    return this._pathTemplates.scanConfigPathTemplate.match(scanConfigName)
      .project;
  }

  /**
   * Parse the scan_config from ScanConfig resource.
   *
   * @param {string} scanConfigName
   *   A fully-qualified path representing ScanConfig resource.
   * @returns {string} A string representing the scan_config.
   */
  matchScanConfigFromScanConfigName(scanConfigName: string) {
    return this._pathTemplates.scanConfigPathTemplate.match(scanConfigName)
      .scan_config;
  }

  /**
   * Return a fully-qualified occurrence resource name string.
   *
   * @param {string} project
   * @param {string} occurrence
   * @returns {string} Resource name string.
   */
  occurrencePath(project: string, occurrence: string) {
    return this._pathTemplates.occurrencePathTemplate.render({
      project,
      occurrence,
    });
  }

  /**
   * Parse the project from Occurrence resource.
   *
   * @param {string} occurrenceName
   *   A fully-qualified path representing Occurrence resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromOccurrenceName(occurrenceName: string) {
    return this._pathTemplates.occurrencePathTemplate.match(occurrenceName)
      .project;
  }

  /**
   * Parse the occurrence from Occurrence resource.
   *
   * @param {string} occurrenceName
   *   A fully-qualified path representing Occurrence resource.
   * @returns {string} A string representing the occurrence.
   */
  matchOccurrenceFromOccurrenceName(occurrenceName: string) {
    return this._pathTemplates.occurrencePathTemplate.match(occurrenceName)
      .occurrence;
  }

  /**
   * Return a fully-qualified note resource name string.
   *
   * @param {string} project
   * @param {string} note
   * @returns {string} Resource name string.
   */
  notePath(project: string, note: string) {
    return this._pathTemplates.notePathTemplate.render({
      project,
      note,
    });
  }

  /**
   * Parse the project from Note resource.
   *
   * @param {string} noteName
   *   A fully-qualified path representing Note resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromNoteName(noteName: string) {
    return this._pathTemplates.notePathTemplate.match(noteName).project;
  }

  /**
   * Parse the note from Note resource.
   *
   * @param {string} noteName
   *   A fully-qualified path representing Note resource.
   * @returns {string} A string representing the note.
   */
  matchNoteFromNoteName(noteName: string) {
    return this._pathTemplates.notePathTemplate.match(noteName).note;
  }

  /**
   * Return a fully-qualified project resource name string.
   *
   * @param {string} project
   * @returns {string} Resource name string.
   */
  projectPath(project: string) {
    return this._pathTemplates.projectPathTemplate.render({
      project,
    });
  }

  /**
   * Parse the project from Project resource.
   *
   * @param {string} projectName
   *   A fully-qualified path representing Project resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectName(projectName: string) {
    return this._pathTemplates.projectPathTemplate.match(projectName).project;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    if (!this._terminated) {
      return this.containerAnalysisV1Beta1Stub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
