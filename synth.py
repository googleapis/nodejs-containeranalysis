# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""This script is used to synthesize generated parts of this library."""

import synthtool as s
import synthtool.gcp as gcp
import subprocess
import logging

logging.basicConfig(level=logging.DEBUG)

# Run the gapic generator
gapic = gcp.GAPICMicrogenerator()
versions = ['v1beta1', 'v1']
for version in versions:
    library = gapic.typescript_library(
      'containeranalysis', version,
      generator_args={
            "grpc-service-config": f"google/devtools/containeranalysis/{version}/containeranalysis_grpc_service_config.json",
            "package-name": f"@google-cloud/containeranalysis",
            "main-service": f"containeranalysis"
            },
        proto_path=f'/google/devtools/containeranalysis/{version}',
        extra_proto_files=["google/cloud/common_resources.proto", "grafeas/v1"]
        )
    s.copy(library, excludes=['package.json', 'README.md', 'src/index.ts'])

# Copy common templates
common_templates = gcp.CommonTemplates()
templates = common_templates.node_library(source_location='build/src')
s.copy(templates)

s.replace('src/v1beta1/index.ts', 'export {GrafeasClient} from \'./grafeas_client\';', '')
s.replace('src/v1/index.ts', 'export {GrafeasClient} from \'./grafeas_client\';', '')
s.replace('src/index.ts', 'v1beta1.GrafeasClient', 'v1beta1.GrafeasV1Beta1Client')

# fix the URL of grafeas.io (this is already fixed upstream).
s.replace('src/v1beta1/*.ts',
        'grafeas.io',
        'https://grafeas.io')

s.replace('tslint.json', '"extends": "gts/tslint.json"', '"extends": "gts/tslint.json", "linterOptions": {"exclude": ["src/index.ts"]}')
# perform surgery inserting the Grafeas client. 
s.replace("src/v1/container_analysis_client.ts",
"""import \* as path from \'path\';
""",
"""import * as path from 'path';
const { GrafeasClient } = require('@google-cloud/grafeas');
""")
s.replace("src/v1/container_analysis_client.ts",
"""auth\: gax\.GoogleAuth;
""",
"""auth: gax.GoogleAuth;
opts: ClientOptions;
""")
s.replace("src/v1/container_analysis_client.ts",
"""  \}

  \/\*\*
   \* The DNS address for this API service\.
   \*\/
""",
"""    this.opts = opts;
  }

  /**
   * The DNS address for this API service.
   */
""")
s.replace("src/v1/container_analysis_client.ts",
r"""  matchNoteFromNoteName\(noteName: string\) {
    return this\._pathTemplates\.notePathTemplate\.match\(noteName\)\.note;
  }
""",
r"""  matchNoteFromNoteName(noteName: string) {
    return this._pathTemplates.notePathTemplate.match(noteName).note;
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
    return new GrafeasClient(this.opts);
  }
""")
# Node.js specific cleanup
subprocess.run(['rm', 'src/v1/grafeas_client.ts']) 
subprocess.run(['rm', 'src/v1/grafeas_client_config.json']) 
subprocess.run(['rm', 'src/v1/grafeas_proto_list.json']) 
subprocess.run(['rm', 'src/v1beta1/grafeas_client.ts']) 
subprocess.run(['rm', 'src/v1beta1/grafeas_client_config.json']) 
subprocess.run(['rm', 'src/v1beta1/grafeas_proto_list.json']) 
subprocess.run(['rm', 'test/gapic-grafeas_v1_beta1-v1beta1.ts']) 
subprocess.run(['rm', 'test/gapic-grafeas-v1.ts']) 
subprocess.run(['rm', 'test/gapic-grafeas-v1beta1.ts']) 
subprocess.run(['npm', 'install'])
subprocess.run(['npm', 'run', 'fix'])
subprocess.run(['npx', 'compileProtos', 'src'])
