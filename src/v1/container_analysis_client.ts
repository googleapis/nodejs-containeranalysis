// Copyright 2020 Google LLC
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
import {Callback, CallOptions, Descriptors, ClientOptions} from 'google-gax';
import * as path from 'path';
import {GrafeasClient} from '@google-cloud/grafeas';

import * as protos from '../../protos/protos';
import * as gapicConfig from './container_analysis_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Retrieves analysis results of Cloud components such as Docker container
 *  images. The Container Analysis API is an implementation of the
 *  [Grafeas](https://grafeas.io) API.
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
 * @memberof v1
 */
export class ContainerAnalysisClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}, batching: {}};
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  containerAnalysisStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of ContainerAnalysisClient.
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
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof ContainerAnalysisClient;
    const servicePath = opts && opts.servicePath ?
        opts.servicePath :
        ((opts && opts.apiEndpoint) ? opts.apiEndpoint :
                                      staticMembers.servicePath);
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = (typeof window !== 'undefined');
    if (isBrowser){
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    this._gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof ContainerAnalysisClient).scopes;
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = (this._gaxGrpc.auth as gax.GoogleAuth);

    // Determine the client header string.
    const clientHeader = [
      `gax/${this._gaxModule.version}`,
      `gapic/${version}`,
    ];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(__dirname, '..', '..', 'protos', 'protos.json');
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback ?
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("../../protos/protos.json") :
        nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      notePathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/notes/{note}'
      ),
      occurrencePathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/occurrences/{occurrence}'
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
        'google.devtools.containeranalysis.v1.ContainerAnalysis', gapicConfig as gax.ClientConfig,
        opts.clientConfig || {}, {'x-goog-api-client': clientHeader.join(' ')});

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.containerAnalysisStub) {
      return this.containerAnalysisStub;
    }

    // Put together the "service stub" for
    // google.devtools.containeranalysis.v1.ContainerAnalysis.
    this.containerAnalysisStub = this._gaxGrpc.createStub(
        this._opts.fallback ?
          (this._protos as protobuf.Root).lookupService('google.devtools.containeranalysis.v1.ContainerAnalysis') :
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.devtools.containeranalysis.v1.ContainerAnalysis,
        this._opts) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const containerAnalysisStubMethods =
        ['setIamPolicy', 'getIamPolicy', 'testIamPermissions'];
    for (const methodName of containerAnalysisStubMethods) {
      const callPromise = this.containerAnalysisStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error|null|undefined) => () => {
          throw err;
        });

      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        this.descriptors.page[methodName] ||
            this.descriptors.stream[methodName] ||
            this.descriptors.longrunning[methodName]
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.containerAnalysisStub;
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
    return [
      'https://www.googleapis.com/auth/cloud-platform'
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(callback?: Callback<string, undefined, undefined>):
      Promise<string>|void {
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
      request: protos.google.iam.v1.ISetIamPolicyRequest,
      options?: gax.CallOptions):
      Promise<[
        protos.google.iam.v1.IPolicy,
        protos.google.iam.v1.ISetIamPolicyRequest|undefined, {}|undefined
      ]>;
  setIamPolicy(
      request: protos.google.iam.v1.ISetIamPolicyRequest,
      options: gax.CallOptions,
      callback: Callback<
          protos.google.iam.v1.IPolicy,
          protos.google.iam.v1.ISetIamPolicyRequest|null|undefined,
          {}|null|undefined>): void;
  setIamPolicy(
      request: protos.google.iam.v1.ISetIamPolicyRequest,
      callback: Callback<
          protos.google.iam.v1.IPolicy,
          protos.google.iam.v1.ISetIamPolicyRequest|null|undefined,
          {}|null|undefined>): void;
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
 * @param {} request.
 * @param {} request.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Policy]{@link google.iam.v1.Policy}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  setIamPolicy(
      request: protos.google.iam.v1.ISetIamPolicyRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          protos.google.iam.v1.IPolicy,
          protos.google.iam.v1.ISetIamPolicyRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.iam.v1.IPolicy,
          protos.google.iam.v1.ISetIamPolicyRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.iam.v1.IPolicy,
        protos.google.iam.v1.ISetIamPolicyRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'resource': request.resource || '',
    });
    this.initialize();
    return this.innerApiCalls.setIamPolicy(request, options, callback);
  }
  getIamPolicy(
      request: protos.google.iam.v1.IGetIamPolicyRequest,
      options?: gax.CallOptions):
      Promise<[
        protos.google.iam.v1.IPolicy,
        protos.google.iam.v1.IGetIamPolicyRequest|undefined, {}|undefined
      ]>;
  getIamPolicy(
      request: protos.google.iam.v1.IGetIamPolicyRequest,
      options: gax.CallOptions,
      callback: Callback<
          protos.google.iam.v1.IPolicy,
          protos.google.iam.v1.IGetIamPolicyRequest|null|undefined,
          {}|null|undefined>): void;
  getIamPolicy(
      request: protos.google.iam.v1.IGetIamPolicyRequest,
      callback: Callback<
          protos.google.iam.v1.IPolicy,
          protos.google.iam.v1.IGetIamPolicyRequest|null|undefined,
          {}|null|undefined>): void;
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
 * @param {} request.
 * @param {} request.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Policy]{@link google.iam.v1.Policy}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  getIamPolicy(
      request: protos.google.iam.v1.IGetIamPolicyRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          protos.google.iam.v1.IPolicy,
          protos.google.iam.v1.IGetIamPolicyRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.iam.v1.IPolicy,
          protos.google.iam.v1.IGetIamPolicyRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.iam.v1.IPolicy,
        protos.google.iam.v1.IGetIamPolicyRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'resource': request.resource || '',
    });
    this.initialize();
    return this.innerApiCalls.getIamPolicy(request, options, callback);
  }
  testIamPermissions(
      request: protos.google.iam.v1.ITestIamPermissionsRequest,
      options?: gax.CallOptions):
      Promise<[
        protos.google.iam.v1.ITestIamPermissionsResponse,
        protos.google.iam.v1.ITestIamPermissionsRequest|undefined, {}|undefined
      ]>;
  testIamPermissions(
      request: protos.google.iam.v1.ITestIamPermissionsRequest,
      options: gax.CallOptions,
      callback: Callback<
          protos.google.iam.v1.ITestIamPermissionsResponse,
          protos.google.iam.v1.ITestIamPermissionsRequest|null|undefined,
          {}|null|undefined>): void;
  testIamPermissions(
      request: protos.google.iam.v1.ITestIamPermissionsRequest,
      callback: Callback<
          protos.google.iam.v1.ITestIamPermissionsResponse,
          protos.google.iam.v1.ITestIamPermissionsRequest|null|undefined,
          {}|null|undefined>): void;
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
 * @param {} request.
 * @param {} request.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [TestIamPermissionsResponse]{@link google.iam.v1.TestIamPermissionsResponse}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  testIamPermissions(
      request: protos.google.iam.v1.ITestIamPermissionsRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          protos.google.iam.v1.ITestIamPermissionsResponse,
          protos.google.iam.v1.ITestIamPermissionsRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.iam.v1.ITestIamPermissionsResponse,
          protos.google.iam.v1.ITestIamPermissionsRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.iam.v1.ITestIamPermissionsResponse,
        protos.google.iam.v1.ITestIamPermissionsRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'resource': request.resource || '',
    });
    this.initialize();
    return this.innerApiCalls.testIamPermissions(request, options, callback);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified note resource name string.
   *
   * @param {string} project
   * @param {string} note
   * @returns {string} Resource name string.
   */
  notePath(project:string,note:string) {
    return this.pathTemplates.notePathTemplate.render({
      project: project,
      note: note,
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
    return this.pathTemplates.notePathTemplate.match(noteName).project;
  }

  /**
   * Parse the note from Note resource.
   *
   * @param {string} noteName
   *   A fully-qualified path representing Note resource.
   * @returns {string} A string representing the note.
   */
  matchNoteFromNoteName(noteName: string) {
    return this.pathTemplates.notePathTemplate.match(noteName).note;
  }

  /**
   * Return a fully-qualified occurrence resource name string.
   *
   * @param {string} project
   * @param {string} occurrence
   * @returns {string} Resource name string.
   */
  occurrencePath(project:string,occurrence:string) {
    return this.pathTemplates.occurrencePathTemplate.render({
      project: project,
      occurrence: occurrence,
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
    return this.pathTemplates.occurrencePathTemplate.match(occurrenceName).project;
  }

  /**
   * Parse the occurrence from Occurrence resource.
   *
   * @param {string} occurrenceName
   *   A fully-qualified path representing Occurrence resource.
   * @returns {string} A string representing the occurrence.
   */
  matchOccurrenceFromOccurrenceName(occurrenceName: string) {
    return this.pathTemplates.occurrencePathTemplate.match(occurrenceName).occurrence;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.containerAnalysisStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }

  /**
   * Returns an instance of a @google-cloud/grafeas client, configured to
   * connect to Google Cloud's Container Analysis API. For documentation
   * on this client, see:
   * <a href="https://googleapis.dev/nodejs/grafeas/latest/index.html">https://googleapis.dev/nodejs/grafeas/latest/index.html</a>
   *
   * @returns {GrafeasClient} - An instance of a Grafeas client.
   *
   */
  getGrafeasClient() {
    return new GrafeasClient(this._opts as {});
  }
}

