# On the Implementation of Vocal Extractor

### Initial Version
In my memory, it was still using the Trae Claude model
Originally described as something like backing track removal but it didn't seem to understand my meaning, producing something that wasn't frequency subtraction at all

### Second Version
Actually it's the current 1.0
Very rough, mono, not clean, very simple vibe code

### Fourth Version
Also the current 3.0
Changed to stereo, algorithmic support

### Fifth Version
There's a lot to say about this version hahaha

The specific implementation type is to compare the backing track with the stage, thereby calculating a threshold
Use it to multiply with the backing track to get a backing track version where the reverb volume is close to the stage, then perform cancellation processing on it

This benefit is extremely obvious because it's different from any previous crude processing methods, which results in relatively better outcomes
Previously, stages with very small mic sound or even extremely faint stages can be processed using lossless cancellation algorithms

Of course, there are also weaknesses. Depending on the song, some backing track will remain
Still needs to be conquered but it's the current best solution
