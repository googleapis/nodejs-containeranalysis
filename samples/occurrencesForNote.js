// sample-metadata:
//   title: Occurrences for Note
//   description: Retrieves all Occurrences of a specified Note
//   usage: node occurrencesForNote.js "project-id" "note-id"
async function main(
  projectId = 'your-project-id', // Your GCP Project ID
  noteId = 'my-note-id' // Id of the note
) {
  // [START containeranalysis_occurrences_for_note]
  /**
   * TODO(developer): Uncomment these variables before running the sample
   */
  // const projectId = 'your-project-id', // Your GCP Project ID
  // const noteId = 'my-note-id' // Id of the note

  // Import the library and create a client
  const containerAnalysis = require('@google-cloud/containeranalysis');
  const client = new containerAnalysis.v1beta1.GrafeasV1Beta1Client();

  // Get path to Note
  const formattedNote = client.notePath(projectId, noteId);

  // Retrieves all the Occurrences associated with a specified Note
  const [occurrences] = await client.listNoteOccurrences({
    name: formattedNote,
  });
  if (occurrences.length) {
    console.log('Occurrences:');
    occurrences.forEach(occurrence => {
      console.log(`${occurrence.name}:`);
      console.log(
        `  Created: ${new Date(occurrence.createTime.seconds * 1000)}`
      );
    });
  } else {
    console.log('No occurrences found.');
  }
  // [END containeranalysis_occurrences_for_note]
}

main(...process.argv.slice(2));
