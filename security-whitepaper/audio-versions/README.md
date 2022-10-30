# Audio Editing Process Overview:

Process used for creating the audio versions for the White Paper v1.

## Starting with the raw recordings uploaded by speakers

1. Using Audacity, I ran the recordings through a pre-processing script that included (a) a high-pass filter (cutting out extreme low frequency sound, which is almost always noise), (b) a low-pass filter (doing the same for extreme high frequency sound), and (c) "normalizing" the sound so that peaks were around -3dB.
2. (Still in Audacity) Cut out dead time at the beginning and end of each track.
3. (Still in Audacity) Try to isolate any background noise in the track (ie, humming from an AC/fan, buzzing as a result of audio cable issues, etc). Basically, try to find a few seconds of the track with no speaking so that it's just the "noise." Using the Audacity Noise Reduction filter, present that segment as the "sample" to base noise reduction on. Then select the whole track and use the Noise Reduction filter to apply reduction. May need to experiment with the settings and listen to the test output to make sure the noise reduction does not "damage" the actual, desired audio.
4. (Still in Audacity) Play some representative samples of the track. Get a sense for the "normal" audio level. Now use Audacity's compression settings to pull down extreme peaks closer to that normal. Audacity's compression is a bit more coarse than I want for spoken audio, so I really only targeted the extreme highs here, trying to get rid of the worst peaks before moving on.
5. Export the track as a .wav file from Audacity.
6. Import the track to GarageBand.
7. Add the following to the track in GarageBand:
    1. A noise filter about 8-16dB below the lowest level of desired audio. May need to play with this to make sure you aren't cutting out "soft" moments in the desired audio
    2. Another layer of compression. The GarageBand compression is a lot smoother, so I was a bit more aggressive here, trying to get a nice smooth sound level.
    3. Equalizers: At the track level something tuned to the specific voice of the speaker (playing around with the defaults under "vocals" in GB), at the project level I used one of the "mastering" options to give a little polish to the finished track.
    4. If the audio sounds a bit empty, you can add a very light bit of reverb to "fill it in" a bit.
    5. Export from GarageBand as a .wav

## To create the final recordings

1. Create a new GarageBand project
2. Drag and drop the edited recordings in, using separate tracks for each speaker
3. Line them up and do any trimming of beginnings/endings necessary to get the timing right
4. You might want to do some volume adjustment between speakers to get a fairly consistent sound level
5. Apply a project-wide compressor to further smooth out the volume levels. Since all the tracks are pre-compressed, this one doesn't need to be aggressive. It's just designed to catch any remaining peaks.
6. If desired, add some project-wide EQ to add a little bit of polish to the final, final recording.
7. Export as a .wav and a .mp3. Wav is better quality, MP3 much smaller. Worth having both, but we'll probably only publish the MP3.
