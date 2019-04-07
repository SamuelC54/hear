https://www.onlineconverter.com/mp3-to-flac

https://cloudacademy.com/blog/first-steps-with-google-cloud-speech-api/

https://github.com/googleapis/google-cloud-php/issues/424

https://cloud.google.com/speech-to-text/

local file

```
const fileName = './assets/CarverMarch2013Onlydothisi.flac';
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

const audio = {
content: audioBytes
};

const transcription = speechResult.results.map(result => result.alternatives[0].transcript).join('\n');
```
