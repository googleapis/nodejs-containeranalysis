const {assert} = require('chai');
const cp = require('child_process');
const uuid = require(`uuid`);

const containerAnalysis = require('@google-cloud/containeranalysis');
const client = new containerAnalysis.v1beta1.GrafeasV1Beta1Client();

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const uuidVal = uuid.v4();
const noteId = `test-note-${uuidVal}`;
const resourceUrl = `gcr.io/test-project/test-image-${uuidVal}`;
const subscriptionId = `occurrence-subscription-${uuidVal}`;
const timeoutSeconds = 5;
const retries = 5;

const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const topicName = 'container-analysis-occurrences-v1beta1';
let topic;

let projectId;
let formattedParent;
let formattedNoteName;

describe('Note tests', () => {
  before(async () => {
    // define projectId and related vars
    projectId = await client.getProjectId();
    formattedParent = `projects/${projectId}`;
    formattedNoteName = `projects/${projectId}/notes/${noteId}`;
  });
  after(async () => {
    const [allOccurrences] = await client.listOccurrences({
      parent: formattedParent,
      filter: `resourceUrl = "${resourceUrl}"`,
    });

    allOccurrences.forEach(async occurrence => {
      await client.deleteOccurrence({name: occurrence.name});
      console.log(`deleted occurrence ${occurrence.name}`);
    });

    const [allNotes] = await client.listNotes({
      parent: formattedParent,
    });

    allNotes.forEach(async note => {
      await client.deleteNote({name: note.name});
      console.log(`deleted note ${note.name}`);
    });
  });
  it('should create a note', () => {
    const output = execSync(`node createNote.js "${projectId}" "${noteId}"`);
    assert.include(output, `Note ${formattedNoteName} created.`);
  });

  it('should get note', () => {
    const output = execSync(`node getNote.js "${projectId}" "${noteId}"`);
    assert.include(output, `Note name: ${formattedNoteName}`);
  });

  it('should create occurrence', () => {
    const output = execSync(
      `node createOccurrence.js "${projectId}" "${noteId}" "${projectId}" "${resourceUrl}"`
    );
    assert.include(output, `Occurrence created`);
  });

  it('should get occurrence', async () => {
    const [occurrences] = await client.listOccurrences({
      parent: formattedParent,
    });
    assert(occurrences.length > 0);

    const occurrence = occurrences[0];
    const occurrenceId = occurrence.name.split('/')[3];
    let output;
    for (let i = 0; i < retries; i++) {
      output = execSync(
        `node getOccurrence.js "${projectId}" "${occurrenceId}"`
      );
      if (output.includes('Occurrence name:')) {
        break;
      }
    }

    assert.include(output, `Occurrence name: ${occurrence.name}`);
  });

  it('should get occurrences for note', () => {
    let output;
    for (let i = 0; i < retries; i++) {
      output = execSync(
        `node occurrencesForNote.js "${projectId}" "${noteId}"`
      );
      if (!output.includes('No occurrences found.')) {
        break;
      }
    }
    assert.include(output, 'Occurrences:');
  });

  it('should get occurrences for image', () => {
    const output = execSync(
      `node occurrencesForImage.js "${projectId}" "${resourceUrl}"`
    );
    assert.include(output, `Occurrences for ${resourceUrl}`);
  });

  it('should get discovery info for image', async () => {
    const discoveryNoteRequest = {
      parent: formattedParent,
      noteId: `${noteId}-discovery`,
      note: {
        discovery: {},
      },
    };

    await client.createNote(discoveryNoteRequest);

    const occurrenceRequest = {
      parent: formattedParent,
      occurrence: {
        noteName: `${formattedNoteName}-discovery`,
        discovered: {
          discovered: {
            analysisStatus: 'FINISHED_SUCCESS',
          },
        },
        resource: {
          uri: resourceUrl,
        },
      },
    };

    await client.createOccurrence(occurrenceRequest);

    const output = execSync(
      `node getDiscoveryInfo "${projectId}" "${resourceUrl}"`
    );
    assert.include(output, `Discovery Occurrences for ${resourceUrl}`);
  });

  it('should get high severity vulnerabilities for image', async () => {
    const criticalNoteReq = {
      parent: formattedParent,
      noteId: `${noteId}-critical`,
      note: {
        vulnerability: {
          severity: 'CRITICAL',
        },
      },
    };

    await client.createNote(criticalNoteReq);

    const criticalOccurrenceReq = {
      parent: formattedParent,
      occurrence: {
        noteName: `${formattedNoteName}-critical`,
        vulnerability: {
          vulnerability: {
            severity: 'CRITICAL',
          },
        },
        resource: {
          uri: resourceUrl,
        },
      },
    };

    await client.createOccurrence(criticalOccurrenceReq);

    const output = execSync(
      `node highVulnerabilitiesForImage "${projectId}" "${resourceUrl}"`
    );

    assert.include(output, `High Severity Vulnerabilities for ${resourceUrl}`);
  });

  it('should get all vulnerabilites for image', () => {
    const output = execSync(
      `node vulnerabilityOccurrencesForImage "${projectId}" "${resourceUrl}"`
    );
    assert.include(output, `All Vulnerabilities for ${resourceUrl}`);
  });

  it('should delete occurrence', async () => {
    const [occurrences] = await client.listOccurrences({
      parent: formattedParent,
    });
    assert(occurrences.length > 0);
    const occurrence = occurrences[0];
    const occurrenceId = occurrence.name.split('/')[3];

    const output = execSync(
      `node deleteOccurrence.js "${projectId}" "${occurrenceId}"`
    );
    assert.include(output, `Occurrence deleted:`);
  });
  it('should delete note', () => {
    const output = execSync(`node deleteNote.js "${projectId}" "${noteId}" `);
    assert.include(output, `Note ${formattedNoteName} deleted.`);
  });
});

describe('polling', () => {
  before(async () => {
    // define project id and related vars
    projectId = await client.getProjectId();
    formattedParent = `projects/${projectId}`;
    formattedNoteName = `projects/${projectId}/notes/${noteId}`;

    const discoveryNoteRequest = {
      parent: formattedParent,
      noteId: `${noteId}-discovery-polling`,
      note: {
        discovery: {},
      },
    };

    await client.createNote(discoveryNoteRequest);

    const occurrenceRequest = {
      parent: formattedParent,
      occurrence: {
        noteName: `${formattedNoteName}-discovery-polling`,
        discovered: {
          discovered: {
            analysisStatus: 3,
          },
        },
        resource: {
          uri: resourceUrl,
        },
      },
    };

    await client.createOccurrence(occurrenceRequest);
  });

  after(async () => {
    const [discoveryOccurrences] = await client.listNoteOccurrences({
      name: `${formattedNoteName}-discovery-polling`,
    });
    discoveryOccurrences.forEach(async occurrence => {
      await client.deleteOccurrence({name: occurrence.name});
    });
    await client.deleteNote({name: `${formattedNoteName}-discovery-polling`});
  });

  it('should successfully poll latest discovery occurrence', () => {
    const output = execSync(
      `node pollDiscoveryOccurrenceFinished.js "${projectId}" "${resourceUrl}" "${timeoutSeconds}"`
    );
    assert.include(output, `Found discovery occurrence`);
  });
});

describe('pubsub', () => {
  before(async () => {
    // define project id and related vars
    projectId = await client.getProjectId();
    formattedParent = `projects/${projectId}`;
    formattedNoteName = `projects/${projectId}/notes/${noteId}`;
    try {
      topic = pubsub.topic(topicName);
    } catch (err) {
      await pubsub.createTopic(topicName);
      topic = pubsub.topic(topicName);
    }
  });

  beforeEach(async () => {
    await topic.createSubscription(subscriptionId);
    const pubSubNoteReq = {
      parent: formattedParent,
      noteId: `${noteId}-pubsub`,
      note: {
        vulnerability: {},
      },
    };
    await client.createNote(pubSubNoteReq);
  });

  afterEach(async () => {
    await client.deleteNote({name: `${formattedNoteName}-pubsub`});
    await pubsub.subscription(subscriptionId).delete();
  });

  it('should get accurate count of occurrences from pubsub topic', async () => {
    const expectedNum = 3;
    const pubSubOccurrenceReq = {
      parent: formattedParent,
      occurrence: {
        noteName: `${formattedNoteName}-pubsub`,
        vulnerability: {
          vulnerability: {},
        },
        resource: {
          uri: resourceUrl,
        },
      },
    };

    // empty subscription
    execSync(
      `node occurrencePubSub.js "${projectId}" "${subscriptionId}" "${timeoutSeconds}"`
    );

    // make sure empty
    const empty = execSync(
      `node occurrencePubSub.js "${projectId}" "${subscriptionId}" "${timeoutSeconds}"`
    );

    assert.include(empty, `Polled 0 occurrences`);
    // create test occurrences
    for (let i = 0; i < expectedNum; i++) {
      const [pubSubOccurrence] = await client.createOccurrence(
        pubSubOccurrenceReq
      );
      await client.deleteOccurrence({name: pubSubOccurrence.name});
    }
    const output = execSync(
      `node occurrencePubSub.js "${projectId}" "${subscriptionId}" "${timeoutSeconds}"`
    );

    // make sure pubsub number matches
    assert.include(output, `Polled ${expectedNum} occurrences`);
  });
});
