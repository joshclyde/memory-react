export const content = `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Here is a [link to google](www.google.com)!!!







This is *italics* word. This is **bold** word.
This is ***italics and bold*** word.

This is some \`console.log("YO YO YO")\` yo yo yo
This is some \`console.log("YO YO YO")\` yo yo yo
This is some \`console.log("YO YO YO")\` yo yo yo
This is some \`console.log("YO YO YO")\` yo yo yo
This is some \`console.log("YO YO YO")\` yo yo yo
This is some \`console.log("YO YO YO")\` yo yo yo

\`\`\`
# code block
print '3 backticks or'
print 'indent 4 spaces'
\`\`\`

> This is a blockquote hello This is a blockquote hello This is a blockquote hello This is a blockquote hello This is a blockquote hello

* Item 1
  * blah blah blah
* Item 2
* Item 3
* Item 4

1. Foo
    1. Foo
    1. Foo
    1. Foo
    1. Foo
2. Bar
    1. Foo
3. Baz
    1. Foo
  1. Foo

---

This is a bear. ![Bear](https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/1200px-2010-kodiak-bear-1.jpg)
This is a bear.

`;

export const memoryReact = `# 🧠 Memories

This website allows me to make flashcards! Currently deployed to firebase and using firestore for the database.

Focuses for this project are

- Bias for Action. This is an area of growth that I want to improve. For this, I want to be quick with making decisions to ensure great functionality for myself and really enjoy the experience of making flashcards. I already have the website at a point where I’m using it, so the next focuses will be on improving the experience.
- So far, most of the flashcards are based off documentation for different technologies (e.g. React, JavaScript). In the future, I will probably try to have features with this in mind (e.g. writing flashcards with Markdown)
- Vue. I have never used Vue before this project, so this is a great way for me to explore it.

## 😀 So far, what do I like?

- Creating lots of flashcards is easy.
- Reviewing is easy and simple
- No longer worried about usage and billing becaues of caching solution
- The Memories page is pretty awesome! Very similar to Bear and fixed the following issues.
  - When making a new flashcard, I want to easily view other flashcards to make sure I'm not making a duplicate.
  - Bulk changing flashcards is tedious. Edit flashcards page does not keep state when going to a flashcard and then back to the page, which makes editing multiple flashcards tedious.

## 😡 So far, what do I not like?

- Because the number of flashcards have grown to over 400,
  - Because of the way I am doing tags, it can be hard to review certain flashcards that only fall under a tag that has 100s of flashcards as opposed to putting it within a specific tag with a smaller amount. (The JavaScript and JavaScript Array flashcards make it hard to review flashcards that are only have a JavaScript tag.)
- Most of the flashcards I am making are based off some website's documentation.
  - I am concerned that in the future these flashcards could become stale. What can I do to help these concerns?
  - I am concerned that I might create flashcards for half of a documentation site, and then later want to finish but am unsure what parts of the site I have flashcards for and which parts I don't have flashcards for.

## ✅ Completed

- sorted and compact tags on add/edit flashcard form
- unit tests
- firebase permissions. (make sure only user can access and edit their data)
- backups of data
- caching solution for firestore data
- home page. (should just move the review page to home)
- add more details to the review cards (how many flashcards)
- separation in the drawer
- conditionally display login/logout
- return characters are being removed from flashcards
- edit flashcard data
- change icons to rounded (to match the Varela Round font)
- edit tag name
- url utilities
- add a createdDate and lastUpdatedDate field for flashcards
- be able to view existing flashcards while making new ones (think about how the edit flashcard page will compare to this (currently in medium priority) or perhaps the create and edit flashcard page become the same thing? similar to Bear)
- make edit flashcard page easier to use
  - on desktop, have the list view and form view next to each other instead of separate pages
  - on mobile, have a back button. maybe after editing the flashcard go back to list view
  - persist the filters somehow so that when going back to the page the user is at the same spot

## 📝 Backlog

### Memories Page

What else do I want on this page?

- Sorting of flashcards
  - creation date
  - last updated
  - ? best match
  - ? by tag
- Delete flashcard
  - this could just be an icon on the flashcard
- Add tag
- Edit tag
- Delete tag
- Highlighting results of search and what matched for each flashcard
  - This shouldn't really add anything, just making edits to existing components
- No flashcards found message (easy)
- Don't render all results at the same time
- I could do automatic saving
- Hook up to browser routing

### 🔥 High Priority

- while reviewing flashcards, would like an option to either edit, delete, or mark as need more work done
- delete flashcards
- delete tags (will need to figure out what to do with flashcards with this tag)
- require at least 1 tag
- randomize flashcard order when reviewing (shouldn't be complicated)
- epic: smart flashcards
- testing
  - firebase emulators
- skeletons for data (useLayoutEffect but not because it's Vue)
- max widths
- sorting on ViewMemories
- make header prettier
- CSS linting/consistent class naming convention

### 💧 Medium Priority

- highlight what criteria matched on ViewMemories (e.g. text or tag)
- automatic saving (if I want it)
- hook up view memories page to browser routing
- create tags when creating new flashcard
- learn about firebase realtime database and whether my use case fits well in it
- epic: different kinds of studying
- firebase authentication UI library (https://github.com/firebase/firebaseui-web)
- order list of tags (alphabetize)
- view flashcards with zero tags (currently they are not presented anywhere)
- allow more than plain text for flashcards (markdown)
- status page
  - a page specifically for knowledge about the application
- scheduled backups of data
- types files (e.g. stop repeating the flashcard types everywhere)
- derived tags (e.g. all JavaScript Array tags are also JavaScript tags. so even though a flashcard is not explicitly have a JavaScript tag it still would fall under any JavaScript tag logic)
- should I have an option for collapsing the list of flashcards when creating flashcards? similar to Bear 🐻

### 🧊 Low priority

- some way to connect flashcards with site that i got the content from
- timer when reviewing flashcards
  - this will be useful to try to estimate how long it will take me to review flashcards
  - for each flashcard
  - for full review
  - perhaps in the future I can have something like "15 minute review" that will gather some set of flashcards that should be able to be reviewed around 15 minutes
- change "flashcard" to "memory"
- upload svg for a tag
- keyboard shortcuts
- ios app

### 🎨 Style

Eventually, I will want to do an entire re-design/re-branding of the site. Might even rewrite it in React. But right now my focus is on easy to use functionality for personal use. In addition, I don't want to do any serious re-designing while I'm constantly deciding on new features.

- pick a color pallete
- dark theme
- styles on mobile
- styles in general
- make a favicon
- get rid of header and make design more similar to Bear
- customizable colors/font, similar to Bear

### 🔎 Smart flashcards

I want to save when the user reviews a flashcard as well as whether the user performed good or bad. Using this data, the user can then be presented with different strategies for studying, such as

- Review all flashcards you haven't reviewed for X amount of time
- Review X amount of flashcards that you aren't perfect at or have not done well with recently
- Presenting this data in some useful way

\`\`\`json
{
  "learn": {
    "abcd": {
      "result": "GOOD",
      "createdDate": "..."
    },
    "abcd": {
      "result": "BAD",
      "createdDate": "..."
    }
  }
}
\`\`\`

### 🧠 Different types of studying

\`\`\`ts
interface Term {
  term: string; // useState
  definition: string; // React hook to blah blah
}

interface Question {
  question: string; // What React hook allows blah blah blah?
  answer: string; // useState
}

interface FillInTheBlank {
  sentence: string; // const [state, setState] = useState(initialState);
  blanks: Array<string>; // ["useState"]
}

interface ListOfAnswers {
  question: string; // What are some of the major enhancements of ES2015?
  answers: Array<string>; // [Modules, class declarations, etc.]
}
\`\`\`

- definitions
- questions
- fill in the blank (on mobile could be annoying to have to type answer)
- what does this function return?
  - could just be fill in the blank, but specific to code
- list of answers
- list of questions, for example

  - What is the prefix and postfix operator? ++x and x++
  - What's the difference between them? ...

- a grouping of questions (kinda different from tag?)
  - Define an array's \`.reverse()\` function
  - Does \`.reverse()\` mutate?
- matching (term to definition)
- parts of a function
  - the function (e.g. arr.filter)
  - syntax/arguments of the function
  - definition for what the function does (fill in the blank?)
  - examples of the function
  - given this code, what's the output?
  - write this code (e.g. remove the first element from the array, and then i write code to do that)

### 🐞 Bugs

- the "Home" page in the drawer is always highlighted
- spaces at beginning of sentence not being respected on a flashcard

### 🗺 Flashcard Navigation

I want better ways to navigate all the different flashcards.

Current Way

- single page.
- can choose a tag. multiple selected tags are inclusive
- clicking a flashcard brings you to totally separate page

What I want

- gotta be responsive
- single page (on desktop)
- clicking a flashcard brings up flashcard to allow the flashcard list to persist
  - should clicking a flashcard allow editing of the flashcard? or should that be an additonal button?
- search criteria
  - text
  - tags
- sorting

## 🤔 Thinking of a name and personality

- 🚂 I like the concept of a train of memories, where each memory is a car attached to the train
  - Train Memories
  - Training Memories
  - TrainIng MemorIes
  - Train-Ing Memor-Ies
  - Train ing Memor ies
- 🌱 The word "grow" and "garden" are appealing. It's a cozy word, and you are growing your memory
  - Memory Growing
  - Memories Garden
- 🌈 The word "rainbow" is cozy, and the colors could represent different tags
  - Memories Rainbow

## 💻 Local Development

### Install the dependencies

\`\`\`bash
yarn
\`\`\`

### Start the app in development mode (hot-code reloading, error reporting, etc.)

\`\`\`bash
quasar dev
\`\`\`

### Lint the files

\`\`\`bash
yarn lint
\`\`\`

### Build the app for production

\`\`\`bash
quasar build
\`\`\`

### Deploy to production

\`\`\`bash
firebase deploy --only hosting
\`\`\`

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
`;
