import { Application } from 'express';
import * as _ from 'lodash';

const fetch = require('node-fetch');
const speech = require('@google-cloud/speech');
const language = require('@google-cloud/language');
const admin = require('firebase-admin');

const serviceAccount = require('../../config_files/poddie-37316-firebase-adminsdk-ykrp8-ac1c3b058e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://poddie-37316.firebaseio.com'
});

const database = admin.database();

export default (app: Application) => {
  /**
   * @route GET /
   * @group API
   */
  app.get('/', async (req, res) => {
    // Speech to text
    const speechClient = new speech.SpeechClient();

    const gcsUri = 'gs://poddie/213-Separation-Anxiety_mono-short.flac';
    const audio = {
      uri: gcsUri
    };
    const config = {
      encoding: 'FLAC',
      sampleRate: 16000,
      languageCode: 'en-US',
      enableWordTimeOffsets: true
    };
    const request = {
      audio,
      config
    };

    const [speechResultRequest] = await speechClient.longRunningRecognize(request);
    const [speechResult] = await speechResultRequest.promise();
    const transcriptions = speechResult.results.map(result => result.alternatives[0].transcript);

    // Natural Language Processing
    const languageClient = new language.LanguageServiceClient();

    const text = transcriptions.join('');

    const document = {
      content: text,
      type: 'PLAIN_TEXT'
    };

    const [entitiesResult] = await languageClient.analyzeEntities({ document });

    const categoryResult = await Promise.all(
      transcriptions.map(async transcription => {
        if (transcription.split(' ').length < 20) {
          return { content: transcription };
        }
        const [categoryResult] = await languageClient.classifyText({
          document: {
            content: transcription,
            type: 'PLAIN_TEXT'
          }
        });

        return { ...categoryResult, content: transcription };
      })
    );

    // Response
    const response = {
      transcriptions,
      speechResult,
      entitiesResult,
      categoryResult
    };

    const databaseRef = database.ref('database');
    databaseRef.set(response);

    res.status(200).json(response);
  });

  /**
   * @route GET /wiki
   * @group API
   */
  app.get('/wiki', async (req, res) => {
    const databaseEntitiesRef = database.ref('database/entitiesResult');
    const snapshot = await databaseEntitiesRef.once('value');
    const entities = snapshot.val().entities;

    const entitiesResult = await Promise.all(
      _.map(entities, async entity => {
        const wikipedia_url = _.get(entity, ['metadata', 'wikipedia_url'], null);

        let picture = null;
        let summary = null;

        if (wikipedia_url) {
          // picture
          const pictureRequest = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&titles=${entity.name}&prop=pageimages&format=json&pithumbsize=100`
          );
          const pictureJson = await pictureRequest.json();
          const pages = _.get(pictureJson, ['query', 'pages']);
          const page = _.values(pages)[0];
          picture = _.get(page, ['thumbnail', 'source']);

          // summary
          const summaryRequest = await fetch(
            `https://en.wikipedia.org/w/api.php?action=opensearch&search=${entity.name}&limit=1&format=json&prop=pageimages`
          );
          const summaryJson = await summaryRequest.json();
          summary = _.get(summaryJson, [2, 0]);
        }

        return {
          ...entity,
          wikipedia_url,
          picture,
          summary
        };
      })
    );

    // Response
    const response = {
      entitiesResult
    };

    databaseEntitiesRef.set({ entities: entitiesResult });

    res.status(200).json(response);
  });
};
