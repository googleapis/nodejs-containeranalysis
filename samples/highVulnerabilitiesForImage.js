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

'use strict';

// sample-metadata:
//   title: Get High Vulnerabilities for Image
//   description: Retrieves all Vulnerability Occurrences of High Severity from Specified Image
//   usage: node highVulnerabilitiesForImage.js "project-id" "image-url"
async function main(
  projectId = 'your-project-id', // Your GCP Project ID
  imageUrl = 'https://gcr.io/my-project/my-image:123' // Image to attach metadata to
  // Use imageURL = 'https://LOCATION-docker.pkg.dev/my-project/my-image:123' when
  // using Artifact Registry
) {
  // [START containeranalysis_filter_vulnerability_occurrences]
  /**
   * TODO(developer): Uncomment these variables before running the sample
   */
  // const projectId = 'your-project-id', // Your GCP Project ID
  // const occurrenceProjectId = 'your-project-id', // GCP Project Id of Occurrence
  // If you are using Google Container Registry
  // const imageUrl = 'https://gcr.io/my-project/my-repo/my-image:123' // Image to attach metadata to
  // If you are using Google Artifact Registry

  // Import the library and create a client
  const {ContainerAnalysisClient} = require('@google-cloud/containeranalysis');
  const client = new ContainerAnalysisClient();

  const formattedParent = client.getGrafeasClient().projectPath(projectId);

  // Retrieve a list of vulnerability occurrences with a severity level of 'HIGH' or greater
  const [occurrences] = await client.getGrafeasClient().listOccurrences({
    parent: formattedParent,
    filter: `kind = "VULNERABILITY" AND resourceUrl = "${imageUrl}"`,
  });

  if (occurrences.length) {
    console.log(`High Severity Vulnerabilities for ${imageUrl}`);
    occurrences.forEach(occurrence => {
      if (
        occurrence.vulnerability.effective_severity === 'HIGH' ||
        occurrence.vulnerability.effective_severity === 'CRITICAL'
      ) {
        console.log(`${occurrence.name}:`);
      }
    });
  } else {
    console.log('No occurrences found.');
  }
  // [END containeranalysis_filter_vulnerability_occurrences]
}

main(...process.argv.slice(2));
