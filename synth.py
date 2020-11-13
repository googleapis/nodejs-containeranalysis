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
import synthtool.languages.node as node
import logging
import os
import json

logging.basicConfig(level=logging.DEBUG)

AUTOSYNTH_MULTIPLE_COMMITS = True


# Run the gapic generator
gapic = gcp.GAPICBazel()
versions = ['v1beta1', 'v1']
for version in versions:
    library = gapic.node_library(
        'containeranalysis', version,
        bazel_target=f'//google/devtools/containeranalysis/{version}:devtools-containeranalysis-{version}-nodejs'
    )
    s.copy(library, excludes=['package.json', 'README.md',
                              'src/v1beta1/index.ts', 'src/v1/index.ts', 'tslint.json', 'src/index.ts'])

# Copy common templates
common_templates = gcp.CommonTemplates()
templates = common_templates.node_library(
    source_location='build/src', versions=versions, default_version='v1')
s.copy(templates)

# # fix the URL of grafeas.io (this is already fixed upstream).
s.replace('src/v1beta1/*.ts',
          'grafeas.io',
          'https://grafeas.io')

# Add beta version GrafeasClient to export
s.replace('src/index.ts',
          '\nexport \{v1beta1\, v1\, ContainerAnalysisClient\}\;\nexport default \{v1beta1\, v1\, ContainerAnalysisClient\}\;',
          'const GrafeasClient = v1beta1.GrafeasV1Beta1Client;\n' +
          'type GrafeasClient = v1beta1.GrafeasV1Beta1Client;\n\n' +
          'export {v1, v1beta1, ContainerAnalysisClient, GrafeasClient};\n' +
          'export default {v1, v1beta1, ContainerAnalysisClient, GrafeasClient};')

# perform surgery inserting the Grafeas client.
s.replace("src/v1/container_analysis_client.ts",
          """import \* as path from \'path\';
""",
          """import * as path from 'path';
import {GrafeasClient} from '@google-cloud/grafeas';
""")
s.replace("src/v1/container_analysis_client.ts", "^}",
          r"""
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
""")
s.replace("src/v1beta1/grafeas_v1_beta1_client*.*", "google.devtools.containeranalysis", "grafeas")

to_remove = [
    'src/v1/grafeas_client.ts',
    'src/v1/grafeas_client_config.json',
    'test/gapic_grafeas_v1.ts',
]
for filePath in to_remove:
    os.unlink(filePath)

node.postprocess_gapic_library()
