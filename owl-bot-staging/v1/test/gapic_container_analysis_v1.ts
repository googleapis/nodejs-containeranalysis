// Copyright 2021 Google LLC
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

import * as protos from '../protos/protos';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import { describe, it } from 'mocha';
import * as containeranalysisModule from '../src';

import {protobuf} from 'google-gax';

function generateSampleMessage<T extends object>(instance: T) {
    const filledObject = (instance.constructor as typeof protobuf.Message)
        .toObject(instance as protobuf.Message<T>, {defaults: true});
    return (instance.constructor as typeof protobuf.Message).fromObject(filledObject) as T;
}

function stubSimpleCall<ResponseType>(response?: ResponseType, error?: Error) {
    return error ? sinon.stub().rejects(error) : sinon.stub().resolves([response]);
}

function stubSimpleCallWithCallback<ResponseType>(response?: ResponseType, error?: Error) {
    return error ? sinon.stub().callsArgWith(2, error) : sinon.stub().callsArgWith(2, null, response);
}

describe('v1.ContainerAnalysisClient', () => {
    it('has servicePath', () => {
        const servicePath = containeranalysisModule.v1.ContainerAnalysisClient.servicePath;
        assert(servicePath);
    });

    it('has apiEndpoint', () => {
        const apiEndpoint = containeranalysisModule.v1.ContainerAnalysisClient.apiEndpoint;
        assert(apiEndpoint);
    });

    it('has port', () => {
        const port = containeranalysisModule.v1.ContainerAnalysisClient.port;
        assert(port);
        assert(typeof port === 'number');
    });

    it('should create a client with no option', () => {
        const client = new containeranalysisModule.v1.ContainerAnalysisClient();
        assert(client);
    });

    it('should create a client with gRPC fallback', () => {
        const client = new containeranalysisModule.v1.ContainerAnalysisClient({
            fallback: true,
        });
        assert(client);
    });

    it('has initialize method and supports deferred initialization', async () => {
        const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        assert.strictEqual(client.containerAnalysisStub, undefined);
        await client.initialize();
        assert(client.containerAnalysisStub);
    });

    it('has close method', () => {
        const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.close();
    });

    it('has getProjectId method', async () => {
        const fakeProjectId = 'fake-project-id';
        const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.auth.getProjectId = sinon.stub().resolves(fakeProjectId);
        const result = await client.getProjectId();
        assert.strictEqual(result, fakeProjectId);
        assert((client.auth.getProjectId as SinonStub).calledWithExactly());
    });

    it('has getProjectId method with callback', async () => {
        const fakeProjectId = 'fake-project-id';
        const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.auth.getProjectId = sinon.stub().callsArgWith(0, null, fakeProjectId);
        const promise = new Promise((resolve, reject) => {
            client.getProjectId((err?: Error|null, projectId?: string|null) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(projectId);
                }
            });
        });
        const result = await promise;
        assert.strictEqual(result, fakeProjectId);
    });

    describe('setIamPolicy', () => {
        it('invokes setIamPolicy without error', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.iam.v1.SetIamPolicyRequest());
            request.resource = '';
            const expectedHeaderRequestParams = "resource=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.iam.v1.Policy());
            client.innerApiCalls.setIamPolicy = stubSimpleCall(expectedResponse);
            const [response] = await client.setIamPolicy(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.setIamPolicy as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes setIamPolicy without error using callback', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.iam.v1.SetIamPolicyRequest());
            request.resource = '';
            const expectedHeaderRequestParams = "resource=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.iam.v1.Policy());
            client.innerApiCalls.setIamPolicy = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.setIamPolicy(
                    request,
                    (err?: Error|null, result?: protos.google.iam.v1.IPolicy|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.setIamPolicy as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes setIamPolicy with error', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.iam.v1.SetIamPolicyRequest());
            request.resource = '';
            const expectedHeaderRequestParams = "resource=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.setIamPolicy = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.setIamPolicy(request), expectedError);
            assert((client.innerApiCalls.setIamPolicy as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('getIamPolicy', () => {
        it('invokes getIamPolicy without error', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.iam.v1.GetIamPolicyRequest());
            request.resource = '';
            const expectedHeaderRequestParams = "resource=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.iam.v1.Policy());
            client.innerApiCalls.getIamPolicy = stubSimpleCall(expectedResponse);
            const [response] = await client.getIamPolicy(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.getIamPolicy as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes getIamPolicy without error using callback', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.iam.v1.GetIamPolicyRequest());
            request.resource = '';
            const expectedHeaderRequestParams = "resource=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.iam.v1.Policy());
            client.innerApiCalls.getIamPolicy = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.getIamPolicy(
                    request,
                    (err?: Error|null, result?: protos.google.iam.v1.IPolicy|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.getIamPolicy as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes getIamPolicy with error', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.iam.v1.GetIamPolicyRequest());
            request.resource = '';
            const expectedHeaderRequestParams = "resource=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.getIamPolicy = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.getIamPolicy(request), expectedError);
            assert((client.innerApiCalls.getIamPolicy as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('testIamPermissions', () => {
        it('invokes testIamPermissions without error', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.iam.v1.TestIamPermissionsRequest());
            request.resource = '';
            const expectedHeaderRequestParams = "resource=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.iam.v1.TestIamPermissionsResponse());
            client.innerApiCalls.testIamPermissions = stubSimpleCall(expectedResponse);
            const [response] = await client.testIamPermissions(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.testIamPermissions as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes testIamPermissions without error using callback', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.iam.v1.TestIamPermissionsRequest());
            request.resource = '';
            const expectedHeaderRequestParams = "resource=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.iam.v1.TestIamPermissionsResponse());
            client.innerApiCalls.testIamPermissions = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.testIamPermissions(
                    request,
                    (err?: Error|null, result?: protos.google.iam.v1.ITestIamPermissionsResponse|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.testIamPermissions as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes testIamPermissions with error', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.iam.v1.TestIamPermissionsRequest());
            request.resource = '';
            const expectedHeaderRequestParams = "resource=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.testIamPermissions = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.testIamPermissions(request), expectedError);
            assert((client.innerApiCalls.testIamPermissions as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('getVulnerabilityOccurrencesSummary', () => {
        it('invokes getVulnerabilityOccurrencesSummary without error', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.devtools.containeranalysis.v1.GetVulnerabilityOccurrencesSummaryRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.devtools.containeranalysis.v1.VulnerabilityOccurrencesSummary());
            client.innerApiCalls.getVulnerabilityOccurrencesSummary = stubSimpleCall(expectedResponse);
            const [response] = await client.getVulnerabilityOccurrencesSummary(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.getVulnerabilityOccurrencesSummary as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes getVulnerabilityOccurrencesSummary without error using callback', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.devtools.containeranalysis.v1.GetVulnerabilityOccurrencesSummaryRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.devtools.containeranalysis.v1.VulnerabilityOccurrencesSummary());
            client.innerApiCalls.getVulnerabilityOccurrencesSummary = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.getVulnerabilityOccurrencesSummary(
                    request,
                    (err?: Error|null, result?: protos.google.devtools.containeranalysis.v1.IVulnerabilityOccurrencesSummary|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.getVulnerabilityOccurrencesSummary as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes getVulnerabilityOccurrencesSummary with error', async () => {
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.devtools.containeranalysis.v1.GetVulnerabilityOccurrencesSummaryRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.getVulnerabilityOccurrencesSummary = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.getVulnerabilityOccurrencesSummary(request), expectedError);
            assert((client.innerApiCalls.getVulnerabilityOccurrencesSummary as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('Path templates', () => {

        describe('note', () => {
            const fakePath = "/rendered/path/note";
            const expectedParameters = {
                project: "projectValue",
                note: "noteValue",
            };
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.notePathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.notePathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('notePath', () => {
                const result = client.notePath("projectValue", "noteValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.notePathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromNoteName', () => {
                const result = client.matchProjectFromNoteName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.notePathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchNoteFromNoteName', () => {
                const result = client.matchNoteFromNoteName(fakePath);
                assert.strictEqual(result, "noteValue");
                assert((client.pathTemplates.notePathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('occurrence', () => {
            const fakePath = "/rendered/path/occurrence";
            const expectedParameters = {
                project: "projectValue",
                occurrence: "occurrenceValue",
            };
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.occurrencePathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.occurrencePathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('occurrencePath', () => {
                const result = client.occurrencePath("projectValue", "occurrenceValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.occurrencePathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromOccurrenceName', () => {
                const result = client.matchProjectFromOccurrenceName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.occurrencePathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchOccurrenceFromOccurrenceName', () => {
                const result = client.matchOccurrenceFromOccurrenceName(fakePath);
                assert.strictEqual(result, "occurrenceValue");
                assert((client.pathTemplates.occurrencePathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('project', () => {
            const fakePath = "/rendered/path/project";
            const expectedParameters = {
                project: "projectValue",
            };
            const client = new containeranalysisModule.v1.ContainerAnalysisClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.projectPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.projectPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('projectPath', () => {
                const result = client.projectPath("projectValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.projectPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromProjectName', () => {
                const result = client.matchProjectFromProjectName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.projectPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });
    });
});
