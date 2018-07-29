/opt/google/chrome/chrome --flag-switches-begin --flag-switches-end --allow-file-access-from-files

tofix:
- Overflow character when zoom. [Fixed by removing `whitespace: pre` to `whitespace: pre-line` ]
- Writing the definition is not waiting. [Fixed by adding `onEnd()`]
- Artyom recognise its own voice as a command. [Fixed by abort all the commands happen while it is saying]

- Dependencies problem `npm i hoek`