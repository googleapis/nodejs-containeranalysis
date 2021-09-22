// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

function main(parent, noteId, note) {
  // [START containeranalysis_create_note_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  The name of the project in the form of `projects/[PROJECT_ID]`, under which
   *  the note is to be created.
   */
  // const parent = 'abc123'
  /**
   *  The ID to use for this note.
   */
  // const noteId = 'abc123'
  /**
   *  The note to create.
   */
  // const note = ''

  // Imports the Containeranalysis library
  const {GrafeasClient} = require('@google-cloud/containeranalysis').v1;

  // Instantiates a client
  const containeranalysisClient = new GrafeasClient();

  async function createNote() {
    // Construct request
    const request = {
      parent,
      noteId,
      note,
    };

    // Run request
    const response = await containeranalysisClient.createNote(request);
    console.log(response);
  }

  createNote();
  // [END containeranalysis_create_note_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
