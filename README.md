# Convert Srt content to SSML!
Using AWS Polly requires SSML files for a better optimised text to speech experience with the ability to add pauses in speech and time speech output properly.

## Installation

### [](https://www.npmjs.com/package/srttossml#npm)npm

`npm install srttossml`

### [](https://www.npmjs.com/package/srttossml#yarn)yarn

`yarn add srttossml`

## Usage

This library receives srt file input and converts to AWS Polly compatible ssml :

```
import srttossml from "srttosmsl"

// takes in two parameters
srttossml(srtInputPath, ssmlOutputPath)

// srtInputPath is the file path to the srt file with the contents
// ssmlOutputPath is the file path where generated ssml file will be stored on disc

```
