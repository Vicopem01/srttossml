import fs from "fs";

/**
 * @prop srtFilePath - The file path to the srt file that contains the text
 * @prop ssmlFilePath: The file path for generated SSMl file to be saved to
 *
 * @author Victor Ogunjobi
 */

const convertSrtToSsml = (srtFilePath, ssmlFilePath) => {
  try {
    // read content of srt file in standard utf-8 format
    const srtContent = fs.readFileSync(srtFilePath, "utf-8");

    // split the SRT content into individual subtitle entries
    const subtitleEntries = srtContent.split(`\n\n`);

    // convert each subtitle entry to SSML format compatible with Amazon Polly System
    const ssmlContent = subtitleEntries
      .map((entry) => {
        const lines = entry.split("\n");
        const startTime = lines[1].split(" --> ")[0];
        const endTime = lines[1].split(" --> ")[1];
        const subtitleText = lines.slice(2).join(" ");

        const ssmlWithTiming =
          subtitleText &&
          `<prosody rate="medium">${subtitleText}</prosody><break time="${calculateDuration(
            startTime,
            endTime
          )}s"/>`;

        return ssmlWithTiming;
      })
      .join("\n");

    // write the SSML content to a file
    fs.writeFileSync(ssmlFilePath, `<speak>${ssmlContent}</speak>`, "utf-8");

    return "File generated at " + ssmlFilePath;
  } catch (error) {
    console.error("An error occurred while converting the SRT file:", error);
  }
};

// helper function to calculate the duration between start and end time in seconds
// realised that speech was a bit faster, so we're subtracting 2 seconds
const calculateDuration = (startTime, endTime) => {
  const start = convertTimeToSeconds(startTime);
  const end = convertTimeToSeconds(endTime);
  return Math.abs(end - start - 2).toFixed(2);
};

// helper function to convert time in HH:MM:SS,MS format to seconds
const convertTimeToSeconds = (time) => {
  if (!time) return 0;
  const parts = time.split(":");
  const seconds =
    parseInt(parts[0]) * 3600 +
    parseInt(parts[1]) * 60 +
    parseFloat(parts[2]?.replace(",", "."));
  return seconds;
};

export default convertSrtToSsml;
