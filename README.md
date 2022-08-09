# 📜 TLOC (Tomper Lines Of Code)

Find out how many lines of code you have written for your project.

<p align='center'>
<img src='https://user-images.githubusercontent.com/83509023/183300434-cf7dcbe1-a44d-42e8-8ae1-0c35b5ecad3c.png'>
</p>

## 📈 Installation

(_Install the package globally_)

```sh
npm install -g tloc
```

## 🧪 Usage

The `tloc` command can be used to calculate the number of lines of code by providing the location of the file or folder. Some additional options and flags that can be used:

1. `-l` or `--log`: Adding some additional information to the console.

2. `--`: Ignoring files/directories (_This option must be used at the last_)

#### Example: Getting number of lines

```
# path to folder
tloc ./src

# path to file
tloc ./src/index.ts
```

#### Example: Logging additional information

```
tloc ./src -l

# or

tloc ./src --log
```

#### Example: Ignoring files/directories

```
# Remove particular file or directory
tloc ./src -- ./src/dummyData.js ./temp

# Remove all matching occurences
tloc ./src -- dummyData.js temp

# While using other options, use the ignore option at last
tloc ./src -l -- dummyData.js ./temp
```

## ✨ Features

- [x] Calculates the number of lines in each file by recursively moving through the directories.
- [x] Ignore specific files/directories or all matching occurrences.
- [x] Implemented using `Depth First Search (DFS)` algorithm.

## ⚙ Tools and Technologies used

1. [Typescript](https://www.typescriptlang.org/)
1. [Minimist](https://www.npmjs.com/package/minimist)
1. [Chalk](https://www.npmjs.com/package/chalk)

## 🛠 Local Installation and setup

1. Clone the repo to your local machine.
2. Install the required dependency for server using :

   ```javascript
   npm install
   ```

## 🏎 Creating production built

1. Build the package using

   ```javascript
   npm run build
   ```

## 😎 Made with 💙 by

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/83509023?v=4" width="150px" alt="GSSoC'22" />
      <br/>
      Varun Kumar Tiwari
      <br/>
      <a href="https://www.linkedin.com/in/varun-tiwari-454591178/">LinkedIn</a>
      <a href="https://github.com/varunKT001">Github</a>
    </td> 
  </tr>
</table>

## ⚖ License

[GPL-3.0](./LICENSE.md)

<br>
<br>
<br>

<p align='center'>
(If you liked the project, give it star 😃)
</p>
