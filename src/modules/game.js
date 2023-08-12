const message = document.getElementById('message');
class Game {
  constructor() {
    this.baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    this.gameId = 'mq378K0H27JDKTNeMccp ';
    this.scoreEndpoint = '/scores/';
  }

  newGame = async () => {
    const data = {
      name: "Muluken's New Game",
    };

    await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        const myId = result.result.split(': ')[1];
        message.textContent = `Game created successfully! Game ID:${myId}`;
      })
      .catch((error) => error);
  }

  getScores = async () => {
    const response = await fetch(`${this.baseURL}${this.gameId}${this.scoreEndpoint}`);
    const data = await response.json();
    return data;
  }

  refresh = async () => {
    const scoreList = document.querySelector('.score-list');
    const data = await this.getScores();
    const { result } = data;
    result.sort((a, b) => b.score - a.score);
    scoreList.innerHTML = '';
    result.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${item.user} : ${item.score}`;
      scoreList.appendChild(listItem);
    });
  }

  saveScores = async (user, score) => {
    const data = {
      user,
      score,
    };
    try {
      if (user.trim() === '' || score === '') {
        throw new Error('Please enter a valid name and score');
      }
      await fetch(`${this.baseURL}${this.gameId}${this.scoreEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      return error;
    }
    return null;
  }
}

export default Game;

// const Baseurl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
// const gameId = 'd97sC0VBeWsazMkhFlJJ/scores/';

// const newGame = async () => {
//   const data = {
//     name: "Muluken's New Game",
//   };

//   await fetch(Baseurl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       console.log('Game created successfully! Game ID:', result.result.split(': ')[1]);
//     })
//     .catch((error) => {
//       console.error('Failed to create the game:', error);
//     });
// };

// // Fetches data using API
// const getData = async () => {
//   const res = await fetch(`${Baseurl}${gameId}`);
//   const data = await res.json();
//   return data;
// };

// const refresh = async () => {
//   const scoreContent = document.querySelector('.score-list');
//   const data = await getData();
//   const { result } = data;
//   result.sort((a, b) => b.score - a.score);
//   scoreContent.innerHTML = '';
//   result.forEach((item) => {
//     const listItem = document.createElement('li');
//     listItem.innerHTML = `${item.user} : ${item.score}`;
//     scoreContent.appendChild(listItem);
//   });
// };

// const sendData = async (user, score) => {
//   const data = {
//     user,
//     score,
//   };
//   try {
//     if (user.trim() === '' || score === '') {
//       throw new Error('Please enter a valid name and score');
//     }
//     await fetch(`${Baseurl}${gameId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//   } catch (error) {
//     return error;
//   }
//   return null;
// };

// export { newGame, refresh, sendData };