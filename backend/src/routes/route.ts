import { Application } from 'express';
const speech = require('@google-cloud/speech');
const language = require('@google-cloud/language');
const admin = require('firebase-admin');

const serviceAccount = require('../../config_files/poddie-37316-firebase-adminsdk-ykrp8-ac1c3b058e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://poddie-37316.firebaseio.com'
});

export default (app: Application) => {
  /**
   * @route GET /
   * @group Home
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

    const database = admin.database();
    const databaseRef = database.ref('database');

    databaseRef.set(response);

    res.status(200).json(response);
  });
};
